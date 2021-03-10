import request from '@/utils/request'

export function getSiteInfo() {
  return request({
    url: '/api/info',
    method: 'get'
  })
}
