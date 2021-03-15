import request from '@/utils/request'

// 上传
export function uploadUtil(form) {
  return request({
    url: '/api/upload',
    method: 'post',
    data: form
  })
}
