/* eslint-disable semi */
import request from '@/utils/request'

const realApiUrl = {
  routerTree: '/sys/role/menu/tree',
  menuTree: '/sys/menu/tree',
  menuAdd: '/sys/menu',
  menuUpdate: '/sys/menu',
  menuDelete: '/sys/menu'
};

const url = realApiUrl;

export function menuTree() {
  return request({
    url: url.menuTree,
    method: 'post'
  })
}
export function routerTree() {
  return request({
    url: url.routerTree,
    method: 'post'
  })
}

export function menuAdd(menu) {
  return request({
    url: url.menuAdd,
    method: 'post',
    data: menu
  })
}

export function menuUpdate(menu) {
  return request({
    url: url.menuUpdate,
    method: 'put',
    data: menu
  })
}

export function menuDelete(id) {
  const urlWithID = url.menuDelete + '/' + id;
  return request({
    url: urlWithID,
    method: 'delete'
  })
}
