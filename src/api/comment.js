import request from '@/utils/request'

// 获取评论列表
export function getCommentList(postId, pageNum, pageSize) {
  return request({
    url: '/api/comment',
    method: 'get',
    params: {
      postId: postId,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

// 创建评论
export function addComment(CommentDTO) {
  return request({
    url: '/api/comment',
    method: 'post',
    data: CommentDTO
  })
}

export function addCommentPhoto(CommentDTO) {
  return request({
    url: '/api/comment/photo',
    method: 'post',
    data: CommentDTO
  })
}

// 删除评论
export function delComment(id) {
  return request({
    url: '/api/comment/' + id,
    method: 'delete'
  })
}

// 管理删除评论
export function delCommentByAdmin(id) {
  return request({
    url: '/api/admin/comment/' + id,
    method: 'delete'
  })
}
