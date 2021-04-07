import request from '@/utils/request'

// 获取标签列表
export function getTagList() {
  return request({
    url: '/api/tag',
    method: 'get'
  })
}

// 管理员修改标签
export function editTagByAdmin(tag) {
  return request({
    url: '/api/admin/tag',
    method: 'put',
    data: tag
  })
}

// 管理员删除标签
export function deleteTagByAdmin(id) {
  return request({
    url: '/api/admin/tag/' + id,
    method: 'delete'
  })
}

// 管理员添加标签
export function addTagByAdmin(tagList) {
  return request({
    url: '/api/admin/tag',
    method: 'post',
    data: tagList
  })
}
