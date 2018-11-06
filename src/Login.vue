<template>
	<div class="login">
		<h2 class="title">一点资讯后台管理系统</h2>
		<el-form :model="form" :rules="rules" :model="form" label-position="left" >
			<el-form-item label="用户名">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input  v-model="form.password" type="password"></el-input>
			</el-form-item>
		</el-form>
		<div class="btns">
			<el-button @click="login">登录</el-button>
		</div>	
	</div>
</template>
<script>
import axios from '@/http/axios'
	export default{
		data(){
			return {
				form:{},
				rules:{
					username:[{
						required:true,
						message:'请输入用户名',
						trigger:'blur'
					}],
					password:[{
						required:true,
						message:'请输入密码',
						trigger:'blur'
					}]
				}
			}
		},
		methods:{
			login(){
				axios.post('/login',this.form)
				.then(({data:res})=>{
						console.log('login',res);
					if(res.status=='200' && res.message=="登录成功"){
						//1.页面跳转
						window.vm.currentComponent='App'
						//2. 用户信息的保存
						localStorage.setItem('user',JSON.stringify(res.data));
					}else{

					}
				})
				.catch((error)=>{
					this.$notify.error({
						title:'错误',
						message:'网络异常'
					})
				})
			}
		}
	}
</script>
<style >
	.login{
		width: 400px;
		margin:0 auto;
	}
	.login .title{
		margin-top:120px;
		text-align: center;
	}
	.login .btns{
		text-align: right;
	}
</style>