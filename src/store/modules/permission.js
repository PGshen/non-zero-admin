import { asyncRouterMap, constantRouterMap } from '@/router'
import {routerTree} from "@/api/menu";
import {hasPerm} from "@/api/permission";

const _import = require('../../router/_import_' + process.env.NODE_ENV)

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function revise(menuList) {
  if (menuList === undefined || menuList === null || menuList === '') {
    return ;
  }
  let menu;
  for (menu in menuList) {
    menuList[menu].component = _import(menuList[menu].component);
    menuList[menu].meta = { url : menuList[menu].url , btn : menuList[menu].btn };

    if (menuList[menu].alwaysShow === '1'){
      menuList[menu].alwaysShow = true;
    }else{
      menuList[menu].alwaysShow = false;
    }
    if (menuList[menu].hidden === '1'){
      menuList[menu].hidden = true;
    }else{
      menuList[menu].hidden = false;
    }
    if (menuList[menu].children !== undefined && menuList[menu].children !== null && menuList[menu].children !== ""){
      revise(menuList[menu].children);
    }else {
      menuList[menu].children = [];
    }
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },

    RouterTree({ commit }) {
      return new Promise((resolve, reject) => {
        routerTree().then(response => {
          const data = response.data;
          revise(data.data);
          const notfound = { path: '*', redirect: '/404', hidden: true };
          data.data.push(notfound);
          console.log(data.data);
          if (data.status) {
            commit('SET_ROUTERS', data.data);
          }
          resolve(data.status);
        }).catch(error => {
          reject(error);
        });
      })
    },

    hasPerm({commit}, data){
      return new Promise((resolve, reject) => {
        const { url } = data;
        hasPerm(url).then(response => {
          const data = response.data;
          resolve(data.status);
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}

export default permission
