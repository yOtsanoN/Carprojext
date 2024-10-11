import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/index' 

import BlogIndex from '@/components/Blogs/index'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogShow from '@/components/Blogs/ShowBlog'
import BlogEdit from '@/components/Blogs/EditBlog'

import Upload from '@/components/Util/Upload'

// Import car components
import CarIndex from '@/components/Car/index'
import CarCreate from '@/components/Car/CreateCar'
import CarShow from '@/components/Car/ShowCar'
import CarEdit from '@/components/Car/EditCar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blog-create',
      component: BlogCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },

    // Car routes
    {
      path: '/cars',
      name: 'cars',
      component: CarIndex
    },
    {
      path: '/car/create',
      name: 'car-create',
      component: CarCreate
    },
    {
      path: '/car/edit/:carId',
      name: 'car-edit',
      component: CarEdit
    },
    {
      path: '/car/:carId',
      name: 'car',
      component: CarShow
    },
    
  ]
})
