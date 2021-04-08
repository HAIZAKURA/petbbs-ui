import request from '@/utils/request'

// 获取有效专栏列表
export function getSectionList(pageNum, pageSize) {
  return request({
    url: '/api/section',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

// 获取所有专栏列表
export function getSectionListByAdmin(pageNum, pageSize) {
  return request({
    url: '/api/admin/section',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

// 获取当前用户专栏列表
export function getUserSectionList() {
  return request({
    url: '/api/my/section',
    method: 'get'
  })
}

// 获取专栏信息
export function getSection(id) {
  return request({
    url: '/api/section/' + id,
    method: 'get',
  })
}

// 申请专栏
export function addSection(dto) {
  return request({
    url: '/api/section',
    method: 'post',
    data: dto
  })
}

// 管理员修改专栏
export function updateSectionByAdmin(section) {
  return request({
    url: '/api/admin/section',
    method: 'put',
    data: section
  })
}
