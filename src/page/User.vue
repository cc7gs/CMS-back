<template>
	<div class="user" >
		<!-- 按钮区域 -->
		<div class="btns">
			<el-button   title="新增" icon="el-icon-plus" size="mini" circle 
					@click="toAddUser"></el-button>
		</div>
		<div class="inputDiv">
			<el-input
			    placeholder="请输入要查找的用户名"
			    prefix-icon="el-icon-search"
			    width='6em'
			    v-model="searchName"
			    clearable
			    @clear="clearSeach"
			    @keyup.enter.native="searchUserName"
			    >

			 </el-input>
		</div>
		<!-- 按钮区域结束 -->
		<!-- 用户管理表格 -->
		  	<el-table
			    :data="users"
			    border
			    stripe
			    align="center"
			    style="width: 100%"
			    v-loading="loading"
			    @selection-change="handleSelectionChange"
			    >
			    <el-table-column
			    	align="center"
			      type="selection"
			      width="50">
			    </el-table-column>
			    <el-table-column
			    	align="center"
			      prop="username"
			      label="用户名"
			      width="120">
			    </el-table-column>
			    <el-table-column
			    	align="center"
			      prop="nickname"
			      label="姓名"
			      width="140">
			    </el-table-column>
			    <el-table-column
			     align="center"
			      prop="regTime"
			      label="注册时间">
			    </el-table-column>
			     <el-table-column
			    	 align="center"
			      prop="email"
			      label="邮箱">
			    </el-table-column>
			     <el-table-column
			     prop="enabled"
			      align="center"
			      label="是否有效">
					<template slot-scope="{row}">
						<el-switch
							@change="swatchChange(row)"
					 		 v-model="row.enabled"
							 active-color="#13ce66"
							 inactive-color="#ff4949">
						</el-switch>
					</template>
			    </el-table-column>

			     <el-table-column
			     	align="center"
				      label="操作"
				      width="140">
				      <template slot-scope="{row}">
				          <el-button type="primary" size="mini" icon="el-icon-edit" circle
							@click="toUpdateUser(row)"
				          ></el-button>
				        <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteUserById(row.id)"></el-button>
				      </template>
				</el-table-column>
			</el-table>
		<!-- 用户管理表格结束 -->
		<!-- 模态框 -->
			
		<el-dialog :title="uDialog.title" top='0' width="300px" center custom-class="uDialogStyle" 
		:before-close="beforeCloseUDialog"
		:visible="uDialog.visible">
		  <el-form :model="uDialog.formUser" :rules="userRules" ref="uDialog.formUser" status-icon size="mini" label-position="left" >
		   <el-form-item label="用户名"  label-width="6em" prop="username">
		      	<el-input v-model="uDialog.formUser.username" ></el-input>
		    </el-form-item>
		      <el-form-item label="姓名" label-width="6em" prop="nickname">
		   		 <el-input v-model="uDialog.formUser.nickname" ></el-input>
		    </el-form-item>
		   <el-form-item label="密码" label-width="6em"  prop="password" >
			    <el-input type="password" v-model="uDialog.formUser.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" label-width="6em"  prop="checkPass">
			    <el-input type="password" v-model="uDialog.formUser.checkPass" autocomplete="off" ></el-input>
			</el-form-item>
		    <el-form-item label="邮箱" label-width="6em" prop="email">
		   		 <el-input v-model="uDialog.formUser.email" ></el-input>
		    </el-form-item>
		    <el-form-item label="图像修改" label-width="6em">
		      	<el-upload
				  class="upload-demo"
				  action="http://ccwgs.top:8099/manager/file/upload"
				  list-type="picture">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
		    </el-form-item>
		  </el-form>

		  <div slot="footer" class="dialog-footer">
		    <el-button @click="closeUDialog">取 消</el-button>
		    <el-button type="primary" @click="submitForm('uDialog.formUser')">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 模态框结束 -->
	</div>
</template>
<script>
	import {user} from '@/http/index'
	export default{
		data(){
			var validatePass = (rule, value, callback) => {
			    if (value === '') {
			      callback(new Error('请输入密码'));
			    } else {
			      if (this.uDialog.formUser.checkPass !== '') {
			        this.$refs['uDialog.formUser'].validateField('checkPass');
			      }
			      callback();
			    }
	  		};
			var validatePass2 = (rule, value, callback) => {
			    if (value === '') {
			      callback(new Error('请再次输入密码'));
			    } else if (value !== this.uDialog.formUser.password) {
			      callback(new Error('两次输入密码不一致!'));
			    } else {
			      callback();
				}
			};
			return {
				loading:false, //默认没有加载数据
				users:[],  //保存用户信息
				searchName:'',
				multipleSelection:[], //通过多选 选中的用户信息
				userLogo:[],
				uDialog:{
					title:'',
					visible:false,
					formUser:{}
				},
				userRules:{
					username: [
			            { required: true, message: '用户名不能为空', trigger: 'blur' },
			            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
			          ],
			         nickname:[
			            { required: true, message: '姓名不能为空', trigger: 'blur' },
			            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
			          ],
			        email:[
			          	{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
	      				{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
			          ],
			        password: [
	        			{  required: true, validator: validatePass, trigger: 'blur' }
	      				],
			        checkPass: [
			            { validator: validatePass2, trigger: 'blur' }
			          ]
				},

			}
		},
		methods:{
			...user,
			// 关闭模态框右上角按钮
			beforeCloseUDialog(){
				this.$confirm('该没有提交该数据,确定要关闭？')
					.then(()=>{
						this.closeUDialog();
					})
					.catch(()=>{

					})
			},
			clearSeach(val){
				this.loadAllUsers();
			},
			// 查询用户
			searchUserName(){
				this.searchUser(this.searchName);
			},
			toUpdateUser(user){
				this.uDialog.title="修改用户";
				//后台接口没有这些字段
				delete user.regTime;
				delete user.roles;
				this.uDialog.formUser=Object.assign({},user);
				this.uDialog.visible=true;
			},
			//表单验证
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
			          if (valid) {
			           this.saveOrUpdateUser('提交',this.uDialog.formUser);
			           this.closeUDialog();
			          } else {
			            return false;
			          }
	    		});
			},
			//弹出添加用户模态框
			toAddUser(){
				this.uDialog.title="新增用户";
				this.uDialog.formUser={};
				this.uDialog.visible=true;
			},
			//关闭模态框
			closeUDialog(){
				this.uDialog.formUser={};
				this.uDialog.visible=false;
			},
			//点击开关按钮时触发
			swatchChange(row){
				this.changeStatusUser(row);
			},
			//当点击复选框时触发
			handleSelectionChange(val){
				this.multipleSelection=val;
			},
			//图片处理
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		    handlePreview(file) {
		        console.log(file);
		      }		
		},
		created(){
			//查询所有用户
			this.loadAllUsers();
		},
	}
</script>
<style>
	.user .btns{
		margin:0 12px;
		float: left;
	}
	.inputDiv{
		width: 300px;
		margin-left: 140px;
		margin-bottom: 12px;
	}
	.uDialogStyle{
		margin-right: 0;
		height: 100%;
		animation: zoom .5s;
	}
</style>