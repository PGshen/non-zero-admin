import { menuTree, menuAdd, menuUpdate, menuDelete } from '@/api/menu'
import { generateTitle } from '@/utils/i18n'

function revise(menuList) {
  if (menuList === undefined || menuList === null || menuList === '') {
    return ;
  }
  let menu;
  for (menu in menuList) {
    //无法获取this
    menuList[menu].title = generateTitle(menuList[menu].title) ;
    if (menuList[menu].children !== undefined && menuList[menu].children !== null){
      revise(menuList[menu].children);
    }
  }
}

const menu = {
  state: {
    menuTree: null,
    menuList: null
  },

  mutations: {
    SET_MENU_LIST: (state, menuList) => {
      state.menuList = menuList;
      if (menuList.children !== undefined || menuList.children !== null) {
        state.menuTree = menuList.children;
      }
    }
  },

  actions: {
    GetMenuList({ commit }) {
      return new Promise((resolve, reject) => {
        menuTree().then(response => {
          const data = response.data;
          console.log(data.data);
          if (data.status) {
            // revise(data.data.children);
            commit('SET_MENU_LIST', data.data);
          }
          resolve(data.status);
        }).catch(error => {
          reject(error);
        });
      })
    },
    AddMenu({ commit }, menu) {
      return new Promise((resolve, reject) => {
        menuAdd(menu).then(response => {
          resolve(response.data.status);
        }).catch(error => {
          reject(error);
        })
      });
    },
    UpdateMenu({ commit }, menu) {
      return new Promise((resolve, reject) => {
        menuUpdate(menu).then(response => {
          resolve(response.data.status);
        }).catch(error => {
          reject(error);
        })
      });
    },
    DeleteMenu({ commit }, id) {
      return new Promise((resolve, reject) => {
        menuDelete(id).then(response => {
          resolve(response.data.status);
        }).catch(error => {
          reject(error);
        })
      });
    }
  },
  methods: {
    generateTitle
  }
}

export default menu;
