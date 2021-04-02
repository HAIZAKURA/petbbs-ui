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
      },
      {
        path: '/post/:id',
        name: 'Post',
        component: () => import('../views/Post')
      },
      {
        path: '/new/post',
        name: 'CreatePost',
        component: () => import('../views/CreatePost')
      },
      {
        path: '/tags',
        name: 'Tags',
        component: () => import('../views/Tags')
      },
      {
        path: '/tags/:id',
        name: 'TagPostList',
        component: () => import('../views/TagPost')
      },
      {
        path: '/sections',
        name: 'Sections',
        component: () => import('../views/Sections')
      },
      {
        path: '/sections/:id',
        name: 'SectionPostList',
        component: () => import('../views/SectionPost')
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search')
      },
      {
        path: '/random',
        name: 'Random',
        component: () => import('../views/Random')
      },
      {
        path: '/notify',
        name: 'Notify',
        component: () => import('../views/Notify')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../views/My')
      },
      {
        path: '/user/:id',
        name: 'User',
        component: () => import('../views/User')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile')
      },
      {
        path: '/photos',
        name: 'PhotoStream',
        component: () => import('../views/PhotoStream')
      },
      {
        path: '/photos/:id',
        name: 'Photo',
        component: () => import('../views/Photo')
      },
      {
        path: '/new/photo',
        name: 'CreatePhoto',
        component: () => import('../views/CreatePhoto')
      },
      {
        path: '/edit/:id',
        name: 'EditPost',
        component: () => import('../views/Edit')
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
        name: 'AdminDash',
        component: () => import('../views/admin/Dash.vue')
      },
      {
        path: '/admin/user',
        name: 'AdminUser',
        component: () => import('../views/admin/User.vue')
      },
      {
        path: '/admin/post',
        name: 'AdminPost',
        component: () => import('../views/admin/Post.vue')
      },
      {
        path: '/admin/photo',
        name: 'AdminPhoto',
        component: () => import('../views/admin/Photo.vue')
      },
      {
        path: '/admin/config/site',
        name: 'AdminSiteConfig',
        component: () => import('../views/admin/SiteConfig.vue')
      },
      {
        path: '/admin/config/qiniu',
        name: 'AdminQiniuConfig',
        component: () => import('../views/admin/QiniuConfig.vue')
      },
      {
        path: '/admin/config/word',
        name: 'AdminWordConfig',
        component: () => import('../views/admin/WordConfig.vue')
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
