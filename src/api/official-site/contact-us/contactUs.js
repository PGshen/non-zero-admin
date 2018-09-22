import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official-site/contact-us/list',
    method: 'get',
    params: query
  })
}

export function createContactUs(data) {
  return request({
    url: '/official-site/contact-us/create',
    method: 'post',
    data
  })
}

export function updateContactUs(data) {
  return request({
    url: '/official-site/contact-us/update',
    method: 'post',
    data
  })
}
