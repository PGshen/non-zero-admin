/* eslint-disable semi */
import request from '@/utils/request'

const realApiUrl = {
  userList: '/sys/user/list',
  userAdd: '/sys/user',
  userUpdate: '/sys/user',
  userDelete: '/sys/user',
  userRole: '/sys/user/userrolelist'
};

const url = realApiUrl;

export function userList(listQuery) {
  return request({
    url: url.userList,
    method: 'post',
    data: listQuery
  })
}

export function userAdd(user) {
  return request({
    url: url.userAdd,
    method: 'post',
    data: user
  });
}

export function userRole(userRole) {
  return request({
    url: url.userRole,
    method: 'post',
    data: userRole
  });
}

export function userUpdate(user) {
  return request({
    url: url.userUpdate,
    method: 'put',
    data: user
  });
}

export function userDel(id) {
  const delUrl = process.env.USE_CRAP_API ? url.userDelete : url.userDelete + '/' + id;
  return request({
    url: delUrl,
    method: 'delete'
  });
}
