import Vue from 'vue'
import Router from 'vue-router'
import User from '@/page/user'
import Category from '@/page/Category'
import Article from '@/page/Article'
import Home from '@/page/Home'
import EditArticle from '@/components/EditArticle'

Vue.use(Router)

export default new Router({
  routes: [
   {
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
    },
    {
      path:'/editArticle',
      name: 'EditArticle',
      component:EditArticle
    },
     {
      path: '*',
      component: Home
    }
  ]
})
