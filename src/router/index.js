import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Forum',
        component: () => import('../views/Forum'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register')
      },
      {
        path: '/reactive',
        name: 'ReActive',
        component: () => import('../views/ReActive')
      }
    ]
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: () => import('../views/admin/Home.vue'),
    children: [
      {
        path: '/admin',
        name: 'Dash',
        component: () => import('../views/admin/Dash.vue')
      }
    ]
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
