import request from '@/utils/request'

export function fetchCustomerCase(query) {
  return request({
    url: '/official-site/customer-case/list',
    method: 'get',
    params: query
  })
}

export function createCustomerCase(data) {
  return request({
    url: '/official-site/customer-case/create',
    method: 'post',
    data
  })
}

export function eidtCustomerCase(data) {
  return request({
    url: '/official-site/customer-case/edit',
    method: 'post',
    data
  })
}
