import Vue from 'vue'
import Router from 'vue-router'
import User from '@/page/user'
import Category from '@/page/Category'
import Article from '@/page/Article'
import Index from '@/page/Index'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/user',
      name: 'User',
      component: User
    },{
      path: '/category',
      name: 'Category',
      component: Category
    },{
      path: '/article',
      name: 'Article',
      component: Article
    }
  ]
})
