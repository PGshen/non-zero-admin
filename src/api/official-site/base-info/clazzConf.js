import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official/website/class/mate/list',
    method: 'post',
    data: query
  })
}

export function createClazzMate(data) {
  return request({
    url: '/official/website/class/mate',
    method: 'post',
    data: data
  })
}

export function updateClazzMate(data) {
  return request({
    url: '/official/website/class/mate',
    method: 'put',
    data: data
  })
}

export function deleteClazzMate(id) {
  return request({
    url: '/official/website/class/mate/' + id,
    method: 'delete'
  })
}

export function checkoutStatusClazzMate(id) {
  return request({
    url: '/official/website/class/mate/checkout/' + id,
    method: 'post'
  })
}

export function fetchClazzList(data) {
  return request({
    url: '/official/website/class/mate/clazzlist',
    method: 'post',
    data: data
  })
}
