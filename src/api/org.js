import request from '@/utils/request'

const realApiUrl = {
  orgTree: 'base/org/tree',
  orgAdd: '/base/org',
  menuDelete: '/base/org'
}

const url = realApiUrl

export function orgTree() {
  return request({
    url: url.orgTree,
    method: 'post'
  })
}

export function orgAdd(org) {
  return request({
    url: url.orgAdd,
    method: 'post',
    data: org
  })
}

export function orgDelete(id) {
  const urlWithID = url.menuDelete + '/' + id
  return request({
    url: urlWithID,
    method: 'delete'
  })
}
