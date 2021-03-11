import request from '@/utils/request'

// 获取有效友链
export function getFriends() {
  return request({
    url: '/api/friends',
    method: 'get'
  })
}

// 获取所有友链
export function getAllFriends() {
  return request({
    url: '/api/admin/friends',
    method: 'get'
  })
}

// 添加友链
export function addFriend(FriendLinkDTO) {
  return request({
    url: '/api/admin/friends',
    method: 'post',
    data: FriendLinkDTO
  })
}

// 修改友链
export function updateFriend(FriendLink) {
  return request(({
    url: '/api/admin/friends',
    method: 'put',
    data: FriendLink
  }))
}
