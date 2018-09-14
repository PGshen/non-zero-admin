import request from '@/utils/request'

export function fetchSolution(query) {
  return request({
    url: '/official-site/solution/list',
    method: 'get',
    params: query
  })
}

export function createSolution(data) {
  return request({
    url: '/official-site/solution/create',
    method: 'post',
    data
  })
}

export function eidtSolution(data) {
  return request({
    url: '/official-site/solution/edit',
    method: 'post',
    data
  })
}
