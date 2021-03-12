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

// 获取指定话题
export function getPost(id) {
  return request({
    url: '/api/post/' + id,
    method: 'get'
  })
}

// 创建话题
export function addPost(CreatePostDTO) {
  return request({
    url: '/api/post',
    method: 'post',
    data: CreatePostDTO
  })
}

// 删除话题
export function delPost(id) {
  return request({
    url: '/api/post/' + id,
    method: 'delete'
  })
}

// 管理删除话题
export function delPostByAdmin(id) {
  return request({
    url: '/api/admin/post/' + id,
    method: 'delete'
  })
}

// 修改话题
export function updatePost(Post) {
  return request({
    url: '/api/post',
    method: 'put',
    data: Post
  })
}

// 管理修改话题
export function updatePostByAdmin(Post) {
  return request({
    url: '/api/admin/post',
    method: 'put',
    data: Post
  })
}

// 获取推荐列表
export function getRecommendPostList(id) {
  return request({
    url: '/api/post/recommend',
    method: 'get',
    params: {
      postId: id
    }
  })
}

