import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official/website/first/screen/list',
    method: 'post',
    data: query
  })
}

export function createFirstScreen(data) {
  return request({
    url: '/official/website/first/screen',
    method: 'post',
    data: data
  })
}

export function updateFirstScreen(data) {
  return request({
    url: '/official/website/first/screen',
    method: 'put',
    data: data
  })
}

export function deleteFirstScreen(id) {
  return request({
    url: '/official/website/first/screen/' + id,
    method: 'delete'
  })
}

export function checkoutStatusFirstScreen(id) {
  return request({
    url: '/official/website/first/screen/checkout/' + id,
    method: 'post'
  })
}
