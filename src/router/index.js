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
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
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
    path: '/active',
    name: 'Active',
    component: () => import('../views/Active')
  },
  {
    path: '/reactive',
    name: 'ReActive',
    component: () => import('../views/ReActive')
  }
]

const router = new VueRouter({
  routes
})

export default router
