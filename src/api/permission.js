/* eslint-disable semi */
import request from '@/utils/request'

const realApiUrl = {
  permList: '/sys/role/menu/getPerms'
};

const url = realApiUrl;

export function hasPerm(url) {
  return request({
    url: url,
    method: 'get'
  });
}

export function permList() {
  return request({
    url: url.permList,
    method: 'get'
  })
}
