import request from '@/utils/request'

export function hasPerm(url) {
  return request({
    url: url,
    method: 'get',
  })
}
