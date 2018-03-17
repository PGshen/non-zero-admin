/**
 * Created by kennyliu on 8/23/17.
 */
import { orgTree, orgAdd, orgDelete, orgUpdate } from '@/api/org'

const org = {
  state: {
    orgTree: null
  },

  mutations: {
    SET_ORG_TREE: (state, orgTree) => {
      state.orgTree = orgTree;
    }
  },

  actions: {
    GetOrgTree({ commit }) {
      return new Promise((resolve, reject) => {
        orgTree().then(response => {
          const data = response.data;
          if (data.status) {
            commit('SET_ORG_TREE', data.data);
          }
          resolve(data.status);
        }).catch(error => {
          reject(error);
        })
      })
    },
    AddOrg({ commit }, org) {
      return new Promise((resolve, reject) => {
        orgAdd(org).then(response => {
          const data = response.data;
          resolve(data.status);
        }).catch(error => {
          reject(error);
        })
      })
    },
    UpdateOrg({ commit }, org) {
      return new Promise((resolve, reject) => {
        orgUpdate(org).then(response => {
          const data = response.data;
          resolve(data.status);
        }).catch(error => {
          reject(error);
        })
      })
    },
    DeleteOrg({ commit }, id) {
      return new Promise((resolve, reject) => {
        orgDelete(id).then(response => {
          resolve(response.data.status);
        }).catch(error => {
          reject(error);
        })
      });
    }
  }
}

export default org;
