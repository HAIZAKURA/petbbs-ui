import request from '@/utils/request'

// 激活
export function activeUser(activeDTO) {
  return request({
    url: '/api/active',
    method: 'post',
    data: activeDTO
  })
}

// 重新激活
export function reActiveUser(username, email) {
  return request({
    url: '/api/reactive',
    method: 'get',
    params: {
      name: username,
      email: email
    }
  })
}

// 获取当前用户信息
export function getUserInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

// 获取指定用户信息
export function getUserInfoByUsernameOrId(usernameXid) {
  return request({
    url: '/api/user/info/' + usernameXid,
    method: 'get'
  })
}

// 获取当前用户主页
export function getUser(pageNum, pageSize) {
  return request({
    url: '/api/user',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

// 获取指定用户主页
export function getUserByNameOrId(usernameXid, pageNum, pageSize) {
  return request({
    url: '/api/user/' + usernameXid,
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

// 更新当前用户信息
export function updateUser(user) {
  return request({
    url: '/api/user',
    method: 'put',
    data: user
  })
}

// 管理员更新指定用户信息
export function updateUserByAdmin(user) {
  return request({
    url: '/api/admin/user',
    method: 'put',
    data: user
  })
}

// 管理员获取所有用户
export function getUsersByAdmin() {
  return request({
    url: '/api/admin/user',
    method: 'get'
  })
}

// 修改密码
export function updatePass(oldPass, newPass) {
  return request({
    url: '/api/password',
    method: 'put',
    params: {
      old: oldPass,
      new: newPass
    }
  })
}

