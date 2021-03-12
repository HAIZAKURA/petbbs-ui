import request from '@/utils/request'

// 获取未读通知
export function getNewNotify() {
  return request({
    url: '/api/notify/new',
    method: 'get'
  })
}

// 获取所有通知
export function getAllNotify() {
  return request({
    url: '/api/notify',
    method: 'get'
  })
}

// 已读通知
export function setReadNotify(id) {
  return request({
    url: '/api/notify/' + id,
    method: 'put'
  })
}
