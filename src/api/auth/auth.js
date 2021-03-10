import request from '@/utils/request'

// 用户注册
export function userRegister(RegisterDTO) {
  return request({
    url: '/api/register',
    method: 'post',
    data: RegisterDTO
  })
}

// 用户登录
export function userLogin(LoginDTO) {
  return request({
    url: '/api/login',
    method: 'post',
    data: LoginDTO
  })
}

// 用户注销
export function userLogout() {
  return request({
    url: '/api/logout',
    method: 'get'
  })
}
