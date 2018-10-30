<template>
	<div class="article">
		<!-- 按钮-->
		<div class="btns">
			<el-button   title="新增" icon="el-icon-plus" size="mini" circle 
				@click="toAddArticle"></el-button>
			<el-button   title="批量删除" icon="el-icon-minus" size="mini" circle 
				@click="batchDeleteArticle"></el-button>
			<el-select v-model="params.categoryId"  placeholder="请选择栏目"  size='mini'
				@change="selectChange"
			 v-loading="loadingCategory">
				<el-option :key='c.id' v-for='c in categories' :label="c.name" :value="c.id"></el-option>
			</el-select>
			<el-input
			style="width:130px;"
			  placeholder="请输入关键字"
			  prefix-icon="el-icon-search"
			  v-model="params.keywords"
			  clearable>
			</el-input>
		</div>
		<!-- 文章表格 -->
		<el-table
			:data="articles"
			style="width: 100%" @selection-change="handleSelectionChange" border size="mini"  v-loading="loading">
			<el-table-column
			type="selection"
			width="40" >
			</el-table-column>
			<el-table-column
			prop="title"
			label="文章标题"
			width="180">
			</el-table-column>
			<el-table-column
			prop="author"
			label="作者"
			width="120">
			</el-table-column>
			<el-table-column
			prop="publishtime"
			label="发布时间">
			</el-table-column>
			<el-table-column
			prop="readtimes"
			label="阅读次数">
			</el-table-column>
			<el-table-column
			prop="status"
			label="审阅"
			width="180">
			</el-table-column>
			<el-table-column label="操作" width='100'>
				<template slot-scope='{row}'>
					<el-button type="primary" title="修改文章" size="mini" icon="el-icon-edit" circle @click="toUpdateArticle(row)">
					</el-button>
					<el-button type="danger" size="mini" title="删除文章" icon="el-icon-delete" circle @click="deleteArticle(row.id)">
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 文章表格结束 -->
		<!-- 分页 -->
		<div class="pagination">
			<el-pagination
			  background
			  :page-size="params.pageSize"
			  :current-page="(params.page+1)"
			  @current-change="handlePaginationChange"
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination>
		</div>
		<!-- 分页结束 -->
		<!-- 模态框 -->
		<el-dialog :title="aDialog.title" :visible.sync="aDialog.visible" fullscreen>
			<el-form :model="aDialog.form" size="mini" label-position="left" >
			{{aDialog.form}}
				<el-form-item label="资讯标题" label-width="6em">
					<el-input v-model="aDialog.form.title" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="资讯栏目" label-width="6em">
					<el-select v-model="aDialog.form.categoryId" placeholder="所属栏目">
						<el-option :key='c.id' v-for='c in categories' :label="c.name" :value="c.id"></el-option>
					</el-select>
				</el-form-item>
				 <el-form-item label="列表样式" label-width="6em">
				      <ul class="list_style">
				      	<li class="style_one" :class="{current:aDialog.form.liststyle=='style-one'}" 
				      	@click="aDialog.form.liststyle = 'style-one'">
				      		<img src="@/assets/style-one.jpg" alt="">
				      	</li>
				      	<li class="style_two" :class="{current:aDialog.form.liststyle=='style-two'}"  
				      	@click="aDialog.form.liststyle = 'style-two'">
				      		<img src="@/assets/style-two.jpg" alt="">
				      	</li>
				      </ul>
			    </el-form-item>
			    <el-form-item label="缩略图" label-width="6em">
					<el-upload
					  action="http://120.78.164.247:8099/manager/file/upload"
					  :on-success='handleUploadSuccess'
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
			    </el-form-item>
				<el-form-item label="资讯正文" >
					<mavon-editor v-model="aDialog.form.content"></mavon-editor>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size='mini' @click='closeADialog'>取 消</el-button>
				<el-button type="primary" size='mini' @click='saveOrUpdateArticle '>确 定</el-button>
			</div>
		</el-dialog>
		<!-- 模态框结束 -->
	</div>
</template>
<script>
	import {article} from '@/http/index'

	export default{
		data(){
			return {
				articles:[],  //保存文章信息
				categories:[], //保存栏目信息
				loading:false, //正在加载文章 默认false
				loadingCategory:false, //加载栏目 默认false
				multipleSelection:[],
				aDialog:{  //模态框中的数据
					title:'',
					visible:false,
					form:{
						categoryId:'',
						liststyle:'style-one',
						fileIds:[]
					},
				},
				total:40, //默认文章总数 40
				params:{   //存储分页、搜索数据
					page:0,
					pageSize:3,
					categoryId:undefined,
					keywords:undefined
				}
			}
		},
		watch:{
			params:{
				handler(val){
					 this.findArticle();
				},
				deep:true
			}
		},
		created(){
			this.findAllCategory();
			this.findArticle();
		},
		methods:{
			...article,
			selectChange(val){
				this.params.page=0;
			},
			//成功上传图片的回调
			handleUploadSuccess(response, file, fileList){
			
				this.aDialog.form.fileIds.push(response.data.id);
			},
			/*修改栏目信息*/
			toUpdateArticle(row){
				this.aDialog.title='修改文章';
				row.categoryId=this.params.categoryId;
				this.aDialog.form=Object.assign({},row);
				this.aDialog.visible=true;
			},
			/*关闭模态框*/
			closeADialog(){
				this.aDialog.visible=false;
			},
			/*弹出模态框*/
			toAddArticle(){
				this.aDialog.title='新增文章';
				this.aDialog.form={liststyle:'style-one',fileIds:[]}
				this.aDialog.visible=true;
			},
			//处理分页
			handlePaginationChange(page){
				this.params.page=page-1;
			},
			//多选删除时 获取选择的用户信息
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
		}
	}
</script>
<style scoped>
	.btns{
		margin:10px;
	}
	.btns .el-input{
		margin:0 2em;
	}
	.pagination{
		width: 400px;
		margin: 0 auto;
		padding-top: 20px;
	}
	.list_style {

	}
	.list_style >li {
		width: 200px;
		height: 80px;
		border: 1px solid #ededed;
		border-radius: 3px;
		padding: .5em;
	}
	.list_style >li.current {
		border-color: #409eff;
	}
	.list_style >li img {
		width: 100%;
	}
	.list_style >li.style_one {
		float: left;
	}
	.list_style >li.style_two {
		margin-left: 220px;
	}
</style>