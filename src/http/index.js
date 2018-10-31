//该文件用于发送请求
//封装ajax请求


import axios from '@/http/axios'
import {time} from '@/util/index'

//用户管理
let user={ 
	...time,
	//查询用户信息
	searchUser(name){
		axios.get('/manager/user/findUserByUsername?username='+name)
		.then(({data:res})=>{
			this.$notify.success({
				title:'成功',
				message:'查询成功！'
			});
			this.users=[];
			this.users.push(res.data);
			this.confrimUser(this.users);
		})
		.catch(()=>{
			this.$notify.warning({
				title:'错误',
				message:'没有查找到该用户信息!'
			});
		})
	},
	//删除用户
	deleteUserById(id){
		this.$confirm('此操作将永久删除该数据, 是否继续?', '提示',{
		confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
		}).then(()=>{
			axios.get('/manager/user/deleteUserById?id='+id)
				.then(()=>{
					this.$notify.success({
						title:'成功',
						message:'删除成功！'
					});
					this.loadAllUsers();
				}).catch(()=>{
					this.$notify.success({
						title:'错误',
						message:'删除失败!'
					});
				})
		}).catch(()=>{
			this.$message({
	            type: 'info',
	            message: '已取消删除'
	        });   
		})
	},
	//更改用户状态
	changeStatusUser(user){
		axios.post('/manager/user/changeStatus',{id:user.id,status:user.enabled})
		.then(({})=>{
			this.$notify.success({
				title:'成功',
				message:'修改成功！'
			});
		})
		.catch(()=>{
			this.$notify.error({
				title:'错误',
				message:'修改失败!'
			});
		})
	},
	//保存或更新数据
	saveOrUpdateUser(formName,user){
		
		axios.post('/manager/user/saveOrUpdateUser',user)
		.then(()=>{
			this.$notify.success({
				title:'成功',
				message:'提交成功！'
			});
			this.loadAllUsers();
		})
		.catch(()=>{
			this.$notify.error({
				title:'错误',
				message:'提交失败!'
			});
		})
	},
	//获取用户信息
	loadAllUsers(){
		this.loading=true;
		axios.get('manager/user/findAllUser')
		.then(({data:res})=>{	
			this.users=this.confrimUser(res.data);
		})
		.catch(()=>{
			this.$notify.error({
	          title: '错误',
	          message: '网络异常'
	        });
		})
		.finally(()=>{
			this.loading=false;
		})
	},
	// 数据格式化
	confrimUser(users){
	   return users.map((item)=>{
	  		item.nickname=item.nickname?item.nickname:'-';
			item.username=item.username?item.username:'-';
			item.regTime=item.regTime?(item.regTime+''):item.regTime;
			item.regTime=this.getFormatTime(item.regTime);
			return item;
		});
	},
}
// 栏目管理
let category={
	//保存或更新栏目信息
	saveOrUpdateCategory(category){
		axios.post('/manager/category/saveOrUpdateCategory',category)
		.then(()=>{
			this.$notify.success({
				title:'成功',
				message:'提交成功！'
			});
			this.loadAllCategory();
		})
		.catch(()=>{
			this.$notify.error({
				title:'错误',
				message:'提交失败!'
			});
		})
	},
	//批量删除栏目
	batchDeleteCategory(ids){
		this.$confirm('此操作将永久删除该数据, 是否继续?', '提示',{
		confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
		}).then(()=>{
			axios.post('/manager/category/batchDeleteCategory',{ids})
				.then(()=>{
					this.$notify.success({
						title:'成功',
						message:'删除成功！'
					});
					this.loadAllCategory();
				}).catch(()=>{
					this.$notify.error({
						title:'错误',
						message:'删除失败!'
					});
				})
		}).catch(()=>{
			this.$message({
	            type: 'info',
	            message: '已取消删除'
	        });   
		})
	},
	//删除栏目
	deleteCategoryById(id){
		this.$confirm('此操作将永久删除该数据, 是否继续?', '提示',{
		confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
		}).then(()=>{
			axios.get('/manager/category/deleteCategoryById?id='+id)
				.then(()=>{
					this.$notify.success({
						title:'成功',
						message:'删除成功！'
					});
					this.loadAllCategory();
				}).catch(()=>{
					this.$notify.error({
						title:'错误',
						message:'删除失败!'
					});
				})
		}).catch(()=>{
			this.$message({
	            type: 'info',
	            message: '已取消删除'
	        });   
		})
	},
	//加载所有栏目
	loadAllCategory(){
		//获取用户信息
		this.loading=true;
		axios.get('/manager/category/findAllCategory')
		.then(({data:res})=>{	
			
			this.categories=this.confrimCetgory(res.data);
		})
		.catch(()=>{
			this.$notify.error({
	          title: '错误',
	          message: '网络异常'
	        });
		})
		.finally(()=>{
			this.loading=false;
		})
	},
	confrimCetgory(categories){
		return categories.map( function(item, index) {
			// statements
			item.name=item.name?item.name:'--';
			item.parent=item.parent?item.parent:'--';
			item.comment=item.comment?item.comment:'还没有描述哦！';
			return item;		
		});
	}
}
//文章管理
let article={
	/*提交或者保存信息*/
	saveOrUpdateArticle(){
			//将富文本编辑器的内容上传到source中
			this.aDialog.form.source=this.$refs.md.d_render;
			console.log(this.aDialog.form);
		axios.post('/manager/article/saveOrUpdateArticle',this.aDialog.form)
		.then(({data:result})=>{
			if(result.status==200){
				//1.关闭模态框
				this.closeADialog();
				//2. 提示成功
				this.$notify.success({
					title: '成功',
					message:result.message
				});
				//3 刷新
				this.findArticle();
			}else{
				this.$notify.success({
					title: '错误',
					message:result.message
				});
			}
		})
		.catch((error)=>{
			this.$notify.error({
				title: '错误',
				message: '网络异常'
			});
		});
	},
	/*批量删除*/
	batchDeleteArticle(){
		this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
		.then(()=>{
			let ids = this.multipleSelection.map((item)=>{
				return item.id;
			});
			axios.post('/manager/article/batchDeleteArticle ',{ids})
			.then(()=>{
				this.$notify.success({
					title: '成功',
					message: '删除成功！'
				});
				this.findArticle();
			})
			.catch(()=>{
				this.$notify.error({
					title: '错误',
					message: '删除失败！'
				});
			});
		})
	},
	/*通过id 删除*/
	deleteArticle(id){
	
		this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(()=>{
			axios.get('/manager/article/deleteArticleById?id='+id)
				.then(()=>{
					this.$notify.success({
						title: '成功',
						message: '删除成功！'
					});
					//加载当前栏目
					this.findArticle();
				})
				.catch(()=>{
					this.$notify.error({
						title: '错误',
						message: '删除失败！'
					});
				});
		}).catch(()=>{
			this.$message({
	            type: 'info',
	            message: '已取消删除'
	        });   
		})
	},
	// 获取栏目
	findAllCategory(){
		this.loadingCategory=true;
		axios.get('/manager/category/findAllCategory')
		.then(({data:result})=>{
			this.categories=result.data;
			this.loadingCategory=false;

		})
		.catch(()=>{
			this.$notify.error({
	          title: '错误',
	          message: '网络异常'
	        });
		})
		.finally(()=>{
			this.loadingCategory=false;
		})
	},
	// 查找文章
	findArticle(){
		this.loading=true;
		
		axios.get('/manager/article/findArticle',{
			params:this.params
		})
		.then(({data:res})=>{
			this.total=res.data.total;
			this.articles=res.data.list; 
			this.loading=false;                  
		})
		.catch((error)=>{	
			this.$notify.error({
	          title: '错误',
	          message: '网络异常'
	        });
		})
		.finally(()=>{
			this.loading=false;                  
		})
	},
}
export{user,category,article}