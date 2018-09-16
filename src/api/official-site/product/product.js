import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official-site/product/list',
    method: 'get',
    params: query
  })
}

export function fetchProduct(id) {
  return request({
    url: '/official-site/product/detail',
    method: 'get',
    params: { id }
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

export function productSearch(name) {
  return request({
    url: '/search/product',
    method: 'get',
    params: { name }
  })
}
