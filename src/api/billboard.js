import request from '@/utils/request'

// 获取有效公告
export function getBillboard() {
  return request({
    url: '/api/billboard',
    method: 'get'
  })
}

// 获取所有公告
export function getAllBillboard() {
  return request({
    url: '/api/admin/billboard',
    method: 'get'
  })
}

// 添加公告
export function addBillboard(BillboardDTO) {
  return request({
    url: '/api/admin/billboard',
    method: 'post',
    data: BillboardDTO
  })
}

// 修改公告
export function updateBillboard(Billboard) {
  return request({
    url: '/api/admin/billboard',
    method: 'put',
    data: Billboard
  })
}
