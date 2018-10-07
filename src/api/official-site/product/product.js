import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official/website/product/list',
    method: 'post',
    data: query
  })
}

export function fetchProduct(id) {
  return request({
    url: '/official/website/product/' + id,
    method: 'get'
  })
}

export function createProduct(data) {
  return request({
    url: '/official/website/product',
    method: 'post',
    data: data
  })
}

export function updateProduct(data) {
  return request({
    url: '/official/website/product',
    method: 'put',
    data: data
  })
}

export function deleteProduct(id) {
  return request({
    url: '/official/website/product/' + id,
    method: 'delete'
  })
}

export function checkoutStatus(id) {
  return request({
    url: '/official/website/product/checkout/' + id,
    method: 'post'
  })
}
