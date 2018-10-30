<template>
	<div class="edit">
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
import axios from '@/http/axios'
	export default{
		data(){
			return{
				categories:[],
				aDialog:{  //模态框中的数据
					title:'',
					visible:true,
					
					form:{
						categoryId:'',
						liststyle:'style-one',
						fileIds:[]
					},

				},
			}
		},
		methods:{
			
			closeADialog(){
				this.aDialog.visible=false;
				this.$router.push({ path: 'article' });
			},
			//成功上传图片的回调
			handleUploadSuccess(response, file, fileList){
			
				this.aDialog.form.fileIds.push(response.data.id);
			},
			saveOrUpdateArticle(){
				axios.post('/manager/article/saveOrUpdateArticle',this.aDialog.form)
				.then(()=>{
					this.$notify.success({
						title: '成功',
						message: '提交成功！'
					});
					this.closeADialog();
					this.$router.push({ path: 'article' });
				})
				.catch((error)=>{
					this.$notify.error({
						title: '错误',
						message: '提交失败！'
					});
				});
			},
			findAllCategory(){
				axios.get('/manager/category/findAllCategory')
				.then(({data:result})=>{
					this.categories=result.data;
				})
				.catch(()=>{
					this.$notify.error({
			          title: '错误',
			          message: '网络异常'
			        });
				})
			}
		},
		mounted(){
			this.findAllCategory();
		}
	}
</script>
<style scoped>
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