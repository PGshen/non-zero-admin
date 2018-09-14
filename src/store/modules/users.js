/* eslint-disable semi */
import { userList, userAdd, userUpdate, userDel, userRole } from '@/api/user'

const users = {
  state: {
    users: []
  },

  mutations: {
    SET_USER_LIST: (state, users) => {
      state.users = users;
    },
    ADD_USER: (state, user) => {
      state.users.splice(0, 0, user);
    },
    UPDATE_USER: (state, index, user) => {
      state.users.splice(index, 1, user);
    },
    DELETE_USER: (state, index) => {
      delete state.users[index];
    }
  },

  actions: {
    GetUserList({ commit }, listQuery) {
      return new Promise((resolve, reject) => {
        userList(listQuery).then(response => {
          const data = response.data;
          if (data.status) {
            commit('SET_USER_LIST', data.data.list);
          }
          resolve(data.status);
        }).catch(error => {
          reject(error);
        })
      })
    },
    AddUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        userAdd(user).then(response => {
          const data = response.data;
          if (data.status) {
            // commit('ADD_USER', role);
            resolve(data.status);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    UpdateUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        userUpdate(user).then(response => {
          const data = response.data;
          if (data.status) {
            // commit('UPDATE_USER', index, role);
            resolve(data.status);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    DeleteUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        userDel(id).then(response => {
          const data = response.data;
          if (data.status) {
            // commit('DELETE_USER', index);
            resolve(data.status);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    UserRoleListForAuth({ commit }, params) {
      return new Promise((resolve, reject) => {
        userRole(params).then(response => {
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

export default users;
