import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/official-site/solution/list',
    method: 'get',
    params: query
  })
}

export function fetchSolution(id) {
  return request({
    url: '/official-site/solution/detail',
    method: 'get',
    params: { id }
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

export function solutionSearch(name) {
  return request({
    url: '/search/solution',
    method: 'get',
    params: { name }
  })
}
