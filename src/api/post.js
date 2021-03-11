import request from '@/utils/request'

// 获取话题列表
export function getPostList(sid, tid, tab, pageNum, pageSize) {
  return request({
    url: '/api/post',
    method: 'get',
    params: {
      sid: sid,
      tid: tid,
      tab: tab,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

