import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official-site/customer-case/list',
    method: 'get',
    params: query
  })
}

export function fetchCustomerCase(id) {
  return request({
    url: '/official-site/customer-case/detail',
    method: 'get',
    params: { id }
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

export function customerCaseSearch(name) {
  return request({
    url: '/search/customer-case',
    method: 'get',
    params: { name }
  })
}
