import request from '@/utils/request'

export function fetchInfo() {
  return request({
    url: '/official/website/base/info',
    method: 'get'
  })
}

export function updateInfo(info) {
  return request({
    url: '/official/website/base/info',
    method: 'put',
    data: info
  })
}
