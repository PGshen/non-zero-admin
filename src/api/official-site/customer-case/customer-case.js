import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official/website/customer/case/list',
    method: 'post',
    data: query
  })
}

export function fetchCustomerCase(id) {
  return request({
    url: '/official/website/customer/case/' + id,
    method: 'get'
  })
}

export function createCustomerCase(data) {
  return request({
    url: '/official/website/customer/case',
    method: 'post',
    data: data
  })
}

export function updateCustomerCase(data) {
  return request({
    url: '/official/website/customer/case',
    method: 'put',
    data: data
  })
}

export function deleteCustomerCase(id) {
  return request({
    url: '/official/website/customer/case/' + id,
    method: 'delete'
  })
}

export function checkoutStatus(id) {
  return request({
    url: '/official/website/customer/case/checkout/' + id,
    method: 'post'
  })
}
