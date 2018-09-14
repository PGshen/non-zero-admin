/* eslint-disable semi */
import { roleList, roleAdd, roleUpdate, roleDel, roleAuth, roleAuthList, roleListForUserAuth } from '@/api/role'

const role = {
  state: {
    roles: []
  },

  mutations: {
    SET_ROLE_LIST: (state, roles) => {
      state.roles = roles;
    },
    ADD_ROLE: (state, role) => {
      state.roles.splice(0, 0, role);
    },
    UPDATE_ROLE: (state, index, role) => {
      state.roles.splice(index, 1, role);
    },
    DELETE_ROLE: (state, index) => {
      delete state.roles[index];
    }
  },

  actions: {
    GetRoleList({ commit }, params) {
      return new Promise((resolve, reject) => {
        roleList(params).then(response => {
          const data = response.data;
          if (data.status) {
            commit('SET_ROLE_LIST', data.data.list);
          }
          resolve(data.status);
        }).catch(error => {
          reject(error);
        })
      })
    },
    AddRole({ commit }, role) {
      return new Promise((resolve, reject) => {
        roleAdd(role).then(response => {
          const data = response.data;
          if (data.status) {
            // commit('ADD_ROLE', role);
            resolve(data.status);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    UpdateRole({ commit }, role) {
      return new Promise((resolve, reject) => {
        roleUpdate(role).then(response => {
          const data = response.data;
          if (data.status) {
            // commit('UPDATE_ROLE', index, role);
            resolve(data.status);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    DeleteRole({ commit }, id) {
      return new Promise((resolve, reject) => {
        roleDel(id).then(response => {
          const data = response.data;
          if (data.status) {
            // commit('DELETE_ROLE', index);
            resolve(data.status);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    AuthRole({ commit }, auth) {
      return new Promise((resolve, reject) => {
        roleAuth(auth).then(response => {
          const data = response.data;
          if (data.status) {
            resolve(data.status);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    AuthListRole({ commit }, roleId) {
      return new Promise((resolve, reject) => {
        roleAuthList(roleId).then(response => {
          const data = response.data;
          if (data.status) {
            resolve(data);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    RoleListForUserAuth({ commit }) {
      return new Promise((resolve, reject) => {
        roleListForUserAuth().then(response => {
          const data = response.data;
          if (data.status) {
            resolve(data);
          }
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
};

export default role;
