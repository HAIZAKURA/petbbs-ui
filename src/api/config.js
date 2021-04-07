import request from '@/utils/request'

// 获取网站信息
export function getSiteInfo() {
  return request({
    url: '/api/info',
    method: 'get'
  })
}

// 获取设置
export function getConfig() {
  return request({
    url: '/api/config',
    method: 'get'
  })
}

// 修改设置
export function updateConfig(configs) {
  return request({
    url: '/api/config',
    method: 'put',
    data: configs
  })
}

// email测试
export function mailTest(mailto) {
  return request({
    url: '/api/mail_test',
    method: 'get',
    params: {
      mailto: mailto
    }
  })
}

// 获取七牛配置
export function getQiniuConfig() {
  return request({
    url: '/api/admin/qiniu',
    method: 'get'
  })
}

// 修改七牛配置
export function updateQiniuConfig(QiniuDTO) {
  return request({
    url: '/api/admin/qiniu',
    method: 'put',
    data: QiniuDTO
  })
}

// 获取敏感词列表
export function getSensitiveWord() {
  return request({
    url: '/api/admin/word',
    method: 'get'
  })
}

// 添加敏感词
export function addSensitiveWord(words) {
  return request({
    url: '/api/admin/word',
    method: 'post',
    data: words
  })
}

// 删除敏感词
export function delSensitiveWord(id) {
  return request({
    url: '/api/admin/word',
    method: 'delete',
    params: {
      id: id
    }
  })
}

// 获取总览数据
export function getSummary() {
  return request({
    url: '/api/summary',
    method: 'get'
  })
}
