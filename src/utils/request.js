import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'

// 创建axios实例
const service = axios.create({
  // 公共接口 url = base url + request url
  baseURL: process.env.VUE_APP_SERVER_URL,
  // baseURL: 'https://api.example.com',

  // 超时时间 ms
  timeout: 30 * 1000
})

// 设置cross跨域 并设置访问权限
// 跨域携带cookie信息 使用JWT关闭
service.defaults.withCredentials = false

// 请求拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 发请求前处理 数据转化 配置请求头 设置token 设置loading
    // 使用token 本地localStorage
    if (store.getters.token) {
      // bearer w3c规范
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 接收到响应数据后处理
  response => {
    const res = response.data
    // 如果代码不是200 报错
    if (res.code !== 200) {
      // 50008 非法Token
      // 50012 异地登录
      // 50014 Token失效
      if (res.code === 401 || res.code === 50012 || res.code === 50014) {
        this.$store.dispatch('user/logout')
        // 重新登录
        MessageBox.confirm('会话已失效，您可以留在当前页面，或重新登录', '权限不足', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          window.location.href = '#/login'
        })
      }
      else {
        // 其他异常直接提示
        Message({
          showClose: true,
          message: res.message || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
        // window.alert(res.message);
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // 接收到异常响应处理开
    // console.log('err' + error)
    Message({
      showClose: true,
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
