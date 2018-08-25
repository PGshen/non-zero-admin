import request from '@/utils/request'

export function hasPerm(url) {
  //如果URL为空或/则不向后台进行鉴权
  if (url === '' || url === '/'){
    return true;
  } else {
    return request({
      url: url,
      method: 'get',
    })
  }
}
