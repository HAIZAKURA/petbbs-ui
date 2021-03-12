import request from '@/utils/request'

// 获取专栏列表
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

export function getSection(id) {
  return request({
    url: '/api/section/' + id,
    method: 'get',
  })
}
