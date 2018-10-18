import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official/website/about/us/list',
    method: 'post',
    data: query
  })
}

export function createAboutUs(data) {
  return request({
    url: '/official/website/about/us',
    method: 'post',
    data
  })
}

export function updateAboutUs(data) {
  return request({
    url: '/official/website/about/us',
    method: 'put',
    data: data
  })
}

export function deleteAboutUs(id) {
  return request({
    url: '/official/website/about/us/' + id,
    method: 'delete'
  })
}

export function checkoutStatusAboutUs(id) {
  return request({
    url: '/official/website/about/us/checkout/' + id,
    method: 'post'
  })
}
