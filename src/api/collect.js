import request from '@/utils/request'

// 获取收藏列表
export function getCollectList(pageNum, pageSize) {
  return request({
    url: '/api/collect',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

// 收藏
export function putCollect(postId) {
  return request({
    url: '/api/collect/' + postId,
    method: 'put'
  })
}

// 取消收藏
export function delCollect(podtId) {
  return request({
    url: '/api/collect/' + podtId,
    method: 'delete'
  })
}
