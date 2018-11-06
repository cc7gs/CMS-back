// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login from './Login'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入富文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI,{size:'small'});


Vue.use(mavonEditor)
/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  data:{
  	currentComponent:'Login'
  },
  created(){
  	//当用户刷新页面的时候，先查看本地存储是否保存用户信息，
  	//如果保存了用户信息则认为用户登录过否则跳转到登录
  	let user=JSON.parse(localStorage.getItem('user'));
  	if(user && user.id){
  		this.currentComponent='App'
  	}else{
  		this.currentComponent='Login'
  	}
  },
  components: { App,Login },
  template: `<component v-bind:is="currentComponent"></component>`
})
window.vm=vm;
