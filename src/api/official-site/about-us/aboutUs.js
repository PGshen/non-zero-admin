import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official-site/about-us/list',
    method: 'get',
    params: query
  })
}

export function createAboutUs(data) {
  return request({
    url: '/official-site/about-us/create',
    method: 'post',
    data
  })
}

export function updateAboutUs(data) {
  return request({
    url: '/official-site/about-us/update',
    method: 'post',
    data
  })
}
