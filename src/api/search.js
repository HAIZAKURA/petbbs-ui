import request from '@/utils/request'

// 搜索
export function searchPost(keyword, pageNum, pageSize) {
  return request({
    url: '/api/search',
    method: 'get',
    params: {
      keyword: keyword,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

// 随机
export function randomPost() {
  return request({
    url: '/api/random',
    method: 'get'
  })
}
