import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official/website/news/list',
    method: 'post',
    data: query
  })
}

export function fetchNews(id) {
  return request({
    url: '/official/website/news/' + id,
    method: 'get'
  })
}

export function createNews(data) {
  return request({
    url: '/official/website/news',
    method: 'post',
    data: data
  })
}

export function updateNews(data) {
  return request({
    url: '/official/website/news',
    method: 'put',
    data: data
  })
}

export function deleteNews(id) {
  return request({
    url: '/official/website/news/' + id,
    method: 'delete'
  })
}

export function checkoutStatus(id) {
  return request({
    url: '/official/website/news/checkout/' + id,
    method: 'post'
  })
}
