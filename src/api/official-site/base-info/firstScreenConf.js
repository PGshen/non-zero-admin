import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/base-info/first-screen/list',
    method: 'get',
    params: query
  })
}

export function createFirstScreen(data) {
  return request({
    url: '/base-info/first-screen/create',
    method: 'post',
    data
  })
}

export function updateFirstScreen(data) {
  return request({
    url: '/base-info/first-screen/update',
    method: 'post',
    data
  })
}
