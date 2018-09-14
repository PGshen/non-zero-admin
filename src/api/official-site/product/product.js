import request from '@/utils/request'

export function fetchProduct(query) {
  return request({
    url: '/official-site/product/list',
    method: 'get',
    params: query
  })
}

export function createProduct(data) {
  return request({
    url: '/official-site/product/create',
    method: 'post',
    data
  })
}

export function eidtProduct(data) {
  return request({
    url: '/official-site/product/edit',
    method: 'post',
    data
  })
}
