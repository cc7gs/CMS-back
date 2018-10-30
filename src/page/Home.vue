<template>
	<div class="home">
		<div class="menuCount">
			<div v-for="(val,key) in statistics">
				<el-col :span="6" :offset="1">
				    <el-card shadow="hover">
					      <span v-if="key==='category'">
							<i style="color:#409EFF" class="el-icon-menu"></i>
					      	栏目总数
					      </span>
					      <span v-else-if="key ==='user'">
							<i style="color:#67C23A" class="el-icon-setting"></i>
					      		用户总数
					      </span>
					      <span v-else="key ==='article'">
					      	<i style="color:#E6A23C" class="el-icon-document"></i>
					      		文章总数
					      </span>
						<div class="umber">{{val}}</div>	
					</el-card>
			  	</el-col>
		  </div>
		</div>
		<div class="content animated fadeInLeft slower delay-1s">
		  		欢迎登陆一点资讯后台管理系统
		</div>
	</div>
</template>
<script>
	import axios from '@/http/axios'
	export default{
		data(){
			return{
				loading:false,
				statistics:{},
			}
		},
		methods:{
			//得到统计结果
			getCount(){
				this.loading=true;
				axios.get('/manager/statistics/getCount')
				.then(({data:res})=>{
						this.statistics=res.data;
						this.loading=false;
				})
				.catch(()=>{
					this.$notify.warning({
						title:'错误',
						message:'统计结果有误!'
					});
				})
				.finally(()=>{
					this.loading=false;
				})
			}
		},
		beforeMount(){
			this.getCount();
		}
	}
</script>
<style scoped>
	i{
		font-size: 20px;
		margin-right: 20px;
	}
	.menuCount{
		padding-top:2em;
	}
	.umber{
		display: inline-block;
		font-size: 20px;
		font-weight:500;
		padding-left:20px;
		margin-left: 20px;
	}
	.content{
		width: 500px;
		height:200px;
		position: absolute;
		top:30%;
		left: 50%;
		margin-left: -250px;
		letter-spacing:.5em;
		line-height: 200px;
		font-size: 20px;
	}
</style>