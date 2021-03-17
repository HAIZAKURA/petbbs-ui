import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueClipboard from 'vue-clipboard2'

import './permission'

import './assets/app.css'
// import './assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/plugins/fontawesome-free-5.15.2-web/css/all.min.css'

import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'

import router from './router'
import store from './store'

// import { getSiteInfo } from '@/api/config'

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.use(Buefy)

Vue.use(ElementUI)

Vue.use(VueClipboard)

const dayjs = require('dayjs')

require('dayjs/locale/zh-cn')

dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.locale('zh-cn')
dayjs().locale('zh-cn').format()

Vue.prototype.dayjs = dayjs

new Vue({
  data: () => {
    return {
      site_info: {}
    }
  },
  // created() {
  //   getSiteInfo().then(data => {
  //     this.site_info = data.data
  //   })
  // },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
