import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  /**
   *   首页
   */
  // 用户首页
  {
    path: '/home',
    hidden: true,
    name: 'BLUE 拍照平台',
    component: () => import('@/views/home/index'),
    meta: { title: 'BLUE 拍照平台' }
  },

  // {
  //   path: '/homes',
  //   hidden: true,
  //   name: 'BLUE 拍照平台',
  //   component: () => import('@/views/home/index2'),
  //   meta: { title: 'BLUE 拍照平台' }
  // },

  {
    path:  '/shopping',
    hidden: true,
    name: '拍照平台购物车',
    component: () => import('@/views/home/shopping'),
    meta: { title: '拍照平台购物车' }
  },

  // 注册
  {
    path: '/phone/my',
    hidden: true,
    name: '拍照平台个人中心',
    component: () => import('@/views/home/person'),
    meta: { title: '拍照平台个人中心' }
  },

  // login
  {
    path: '/pass/login',
    hidden: true,
    name: '拍照平台登录',
    component: () => import('@/views/home/userLogin'),
    meta: { title: '拍照平台登录' }
  },


  // 详情
  {
    path: '/show/:id',
    hidden: true,
    name: '详情',
    component: () => import('@/views/home/sceneryInfo'),
    meta: { title: '详情' }
  },

  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'admin',
        name: '员工列表',
        component: () => import('@/views/admin/index'),
        meta: { title: '员工列表', icon: 'el-icon-s-claim' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'user',
        name: '用户列表',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'table' }
      }
    ]
  },

  /**
   * 照片管理
   */
  {
    path: '/phone',
    component: Layout,
    redirect: '/show',
    name: '照片管理',
    meta: { title: '照片管理', icon: 'el-icon-s-cooperation' },
    children: [
      {
        path: 'show',
        name: '照片列表',
        component: () => import('@/views/scenery/list'),
        meta: { title: '照片列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '照片添加',
        component: () => import('@/views/scenery/add'),
        meta: { title: '照片添加', icon: 'table' }
      },
      {
        path: 'category',
        name: '门店管理',
        component: () => import('@/views/scenery/category'),
        meta: { title: '门店管理', icon: 'table' }
      }
    ]
  },



  /**
   *   系统管理
   */
  // 个人中心
  {
    path: '/admin',
    redirect: '/info',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'info',
        name: '个人中心',
        component: () => import('@/views/admin/info'),
        meta: { title: '个人中心' }

      }
    ]
  },


  // {
  //   path: '/one',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'four',
  //       name: '首页管理',
  //       component: () => import('@/views/scenery/four'),
  //       meta: { title: '首页管理', icon: 'el-icon-s-claim' }
  //     }
  //   ]
  // },




  /**
   *  评论
   */
  {
    path: '/comment',
    component: Layout,
    name: '评论管理',
    meta: { title: '评论管理', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'commentWait',
        name: '评论审核',
        component: () => import('@/views/comment/commentList2'),
        meta: { title: '评论审核', icon: 'el-icon-s-comment' }
      },
      {
        path: 'commentList',
        name: '评论列表',
        component: () => import('@/views/comment/commentList'),
        meta: { title: '评论列表', icon: 'el-icon-s-comment' }
      }
    ]
  },


  {
    path: '/order',
    component: Layout,
    name: '订单管理',
    meta: { title: '订单管理', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'waitOrders',
        name: '等待支付',
        component: () => import('@/views/comment/orders2'),
        meta: { title: '等待支付', icon: 'el-icon-s-comment' }
      },
      {
        path: 'orders',
        name: '订单列表',
        component: () => import('@/views/comment/orders'),
        meta: { title: '订单列表', icon: 'el-icon-s-comment' }
      }
    ]
  },
  /**
   *  统计
   */
  {
    path: '/chart',
    component: Layout,
    redirect: '/chart/cate',
    name: '数据统计',
    meta: { title: '数据统计', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'cate',
        name: '销售统计',
        component: () => import('@/views/chart/user'),
        meta: { title: '销售统计', icon: 'table' }
      }
      , {
        path: 'order',
        name: '订单统计',
        component: () => import('@/views/chart/chart'),
        meta: { title: '订单统计', icon: 'table' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
