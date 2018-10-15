/* eslint-disable semi */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/authredirect', '/website']; // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          store.dispatch('RouterTree').then(() => { // 根据roles权限生成可访问的路由表
            store.dispatch('GetPerms').then(() => { // 获取当前用户的权限列表
              router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('Verification failed, please login again')
            next({ path: '/login' })
          })
        })
      } else {
        // 路由前先进行鉴权,路由至401/404不需要鉴权
        if (to.path === '/401' || to.path === '/404') {
          next();
        } else {
          if (to.meta.url !== '' && to.meta.url !== '/' && to.meta.url !== undefined) {
            store.dispatch('hasPerm', to.meta).then(() => {
              next();
            }).catch(() => {
              next({ path: '/401', replace: true, query: { noGoBack: true }});
            })
          } else {
            next();
          }
        }
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next()//
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else if (startWith(whiteList, to.path)) {
      next()
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done() // finish progress bar
});

// 白名单匹配
function startWith(whiteList, path) {
  for (var i = 0; i < whiteList.length; i++) {
    if (path.startsWith(whiteList[i])) {
      return true
    }
  }
  return false
}
