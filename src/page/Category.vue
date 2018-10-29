<template>
	<div class="category" v-loading="loading">
		<!-- 按钮区域 -->
		<div class="btns">
			<el-button   title="新增" icon="el-icon-plus" size="mini" circle 
				@click="toAddCategory"
			>
			</el-button>
			<el-button   title="批量删除" icon="el-icon-minus" size="mini" circle 
				@click="batchDeleteCategoroies"
			></el-button>
		</div>
		<!-- 按钮区域结束 -->
		<!-- 栏目管理表格 -->
	  	<el-table
		    :data="categories"
		    border
		    stripe
		    align="center"
		    style="width: 100%"
		    @selection-change="handleSelectionChange"
		    >
		    <el-table-column
		    	align="center"
		      type="selection"
		      width="50">
		    </el-table-column>
		    
		    <el-table-column
		    	align="center"
		      prop="name"
		      label="栏目名称"
		      width="160">
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      prop="parent.name"
		      width="160"
		      label="父栏目">
		    </el-table-column>
			<el-table-column
		    	align="center"
		      prop="comment"
		      label="描述">
		    </el-table-column>
		     <el-table-column
		     	align="center"
			      label="操作"
			      width="140">
			      <template slot-scope="{row}">
			        <el-button type="primary" size="mini" icon="el-icon-edit" circle title="修改"
			        	@click="toUpDataCategory(row)"
						>
	 				</el-button>
			        <el-button type="danger" size="mini" icon="el-icon-delete" circle title="删除"
			        	@click="deleteCategoryById(row.id)"
			        	>
			        </el-button>
			      </template>
			</el-table-column>
		</el-table>
		<!-- 栏目管理表格结束 -->
		<!-- 模态框 -->
		<el-dialog :title="cDialog.title" top="0" width="400px" center custom-class="cDialogStyle" :visible.sync="cDialog.visible">
			{{cDialog.form}}
		  <el-form :model="cDialog.form" :rules="cRules" size="mini" 
				ref="cDialog.form" label-position="left" >
		    <el-form-item label="栏目名称" label-width="6em" prop="name">
		      <el-input v-model="cDialog.form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="父栏目" label-width="6em" >
		      <el-select v-model="cDialog.form.parentId" placeholder="---请选择---">
		        <el-option :key='c.id' v-for='c in categories' :label="c.name" :value="c.id"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="栏目描述" prop="comment">
		    	 <mavon-editor v-model="cDialog.form.comment"></mavon-editor>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size='mini' @click="closeCDialog('cDialog.form')">取 消</el-button>
		    <el-button type="primary" size='mini' @click="confirmCategory('cDialog.form')">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 模态框结束 -->
	</div>
</template>
<script>
	import {category} from '@/http/index'
	export default{
		data(){
			return {
				categories:[], //保存栏目信息
				loading:false,
				multipleSelection:[], //保存复选框选择的栏目信息
				cDialog:{
					title:'',
					visible:false,
					form:{}
				},
				cRules:{
					name: [
		            { required: true, message: '请输入栏目名称', trigger: 'blur' }
		          ]
		      	},

			}
		},
		methods:{
			...category,
			//打开修改栏目模态框
			toUpDataCategory(category){
				this.cDialog.title="修改栏目";
				this.cDialog.form=Object.assign({},category);
				this.cDialog.visible=true;
			},
			//验证栏目信息
			confirmCategory(formName){
				this.$refs[formName].validate((valid) => {
			          if (valid) {
			           this.saveOrUpdateCategory(this.cDialog.form);
			           this.closeCDialog();
			          } else {
			            return false;
			          }
	    		});
			},
			// 关闭模态框
			closeCDialog(formName){
				this.cDialog.form={};
				this.cDialog.visible=false;
			},
			//打开添加栏目模态框
			toAddCategory(){
				this.cDialog.title="添加栏目";
				this.cDialog.visible=true;
			},
			//点击批量删除按钮
			batchDeleteCategoroies(){
				var ids=this.multipleSelection.map((item)=>{
					return item.id;
				});
				//删除所有选择栏目
				this.batchDeleteCategory(ids);
			},
			//选择所有要删除的栏目信息
			handleSelectionChange(val){
				this.multipleSelection=val;
			}
		},
		created(){
			this.loadAllCategory();
		}
	}
</script>
<style>
	.category .btns{
		margin:10px 2px;
	}
	.cDialogStyle{
		margin-right: 0;
		height: 100%;
		margin-bottom: 0;
		animation: zoom .5s;
		margin-bottom: 0;
	}
</style>