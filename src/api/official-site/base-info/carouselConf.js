import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/base-info/carousel/list',
    method: 'get',
    params: query
  })
}

export function createCarousel(data) {
  return request({
    url: '/base-info/carousel/create',
    method: 'post',
    data
  })
}

export function updateCarousel(data) {
  return request({
    url: '/base-info/carousel/update',
    method: 'post',
    data
  })
}
