import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official/website/carousel/list',
    method: 'post',
    data: query
  })
}

export function createCarousel(data) {
  return request({
    url: '/official/website/carousel',
    method: 'post',
    data
  })
}

export function updateCarousel(data) {
  return request({
    url: '/official/website/carousel',
    method: 'put',
    data: data
  })
}

export function deleteCarousel(id) {
  return request({
    url: '/official/website/carousel/' + id,
    method: 'delete'
  })
}

export function checkoutStatusCarousel(id) {
  return request({
    url: '/official/website/carousel/checkout/' + id,
    method: 'post'
  })
}
