import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official/website/contact/us/list',
    method: 'post',
    data: query
  })
}

export function createContactUs(data) {
  return request({
    url: '/official/website/contact/us',
    method: 'post',
    data
  })
}

export function updateContactUs(data) {
  return request({
    url: '/official/website/contact/us',
    method: 'put',
    data: data
  })
}

export function deleteContactUs(id) {
  return request({
    url: '/official/website/contact/us/' + id,
    method: 'delete'
  })
}

export function checkoutStatusContactUs(id) {
  return request({
    url: '/official/website/contact/us/checkout/' + id,
    method: 'post'
  })
}
