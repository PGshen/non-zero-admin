/* eslint-disable semi */
import request from '@/utils/request'

const realApiUrl = {
  roleList: '/sys/role/list',
  roleAdd: '/sys/role',
  roleUpdate: '/sys/role',
  roleDelete: '/sys/role',
  roleAuth: '/sys/role/auth',
  roleAuthList: '/sys/role/authlist',
  roleListForUserAuth: '/sys/role/rolelist'
};

const url = realApiUrl;

export function roleList(params) {
  return request({
    url: url.roleList,
    method: 'post',
    data: params
  });
}

export function roleAdd(role) {
  return request({
    url: url.roleAdd,
    method: 'post',
    data: role
  });
}

export function roleUpdate(role) {
  return request({
    url: url.roleUpdate,
    method: 'put',
    data: role
  });
}

export function roleDel(id) {
  const delUrl = process.env.USE_CRAP_API ? url.roleDelete : url.roleDelete + '/' + id;
  return request({
    url: delUrl,
    method: 'delete'
  });
}

export function roleAuth(auth) {
  return request({
    url: url.roleAuth,
    method: 'post',
    data: auth
  });
}

export function roleAuthList(roleId) {
  return request({
    url: url.roleAuthList,
    method: 'post',
    data: roleId
  });
}

export function roleListForUserAuth() {
  return request({
    url: url.roleListForUserAuth,
    method: 'post'
  });
}
