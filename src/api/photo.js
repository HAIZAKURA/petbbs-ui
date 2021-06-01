import request from '@/utils/request'

// 获取照片列表
export function getList(pageNum, pageSize) {
  return request({
    url: '/api/photo',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

// 获取照片
export function getPhoto(id) {
  return request({
    url: '/api/photo/' + id,
    method: 'get'
  })
}

export function getPhotoListByUser(userId, pageNum, pageSize) {
  return request({
    url: '/api/user/photo',
    method: 'get',
    params: {
      userId: userId,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

// 创建照片
export function createPhoto(CreatePhotoDTO) {
  return request({
    url: '/api/photo',
    method: 'post',
    data: CreatePhotoDTO
  })
}

export function delPhoto(id) {
  return request({
    url: '/api/photo/' + id,
    method: 'delete'
  })
}

export function delPhotoByAdmin(id) {
  return request({
    url: '/api/admin/photo/' + id,
    method: 'delete'
  })
}

export function goodPhoto(id) {
  return request({
    url: '/api/photo/' + id,
    method: 'put'
  })
}
