<template>
  <div id="app">
     <!-- 左边区域开始 -->
    <div class="leftDiv">
        <div class="leftLogo">
            <img src="./assets/logo.png" alt="">
        </div>
        <!-- 导航条开始-->
        <div class="leftNav">
            <el-menu
                :router="true"
                :default-active="currentRouter"
               class="el-menu-vertical-demo"
                background-color="#1f2d3d"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="/">
                  <i class="el-icon-location-outline"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/category">
                  <i class="el-icon-menu"></i>
                  <span slot="title">栏目管理</span>
                </el-menu-item>
                <el-submenu index="/article">
                    <template slot="title" >
                       <i class="el-icon-document"></i>
                       <span slot="title">文章管理</span>
                    </template>
                    <el-menu-item index="/article">
                         <i class="el-icon-view"></i>
                        <span slot="title">查看文章</span>
                    </el-menu-item>
                    <el-menu-item index="/editArticle">
                        <i class="el-icon-edit"></i>
                        <span slot="title">编写文章</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="/user">
                  <i class="el-icon-setting"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
            </el-menu>
        </div>
         <!--导航条结束-->
    </div>
    <!-- 左边区域结束 -->
    <!-- 右边区域开始 -->
    <div class="rightDiv">
      <!-- 右侧的头部开始 -->
      <div class="rightTop">
        <i class="el-icon-menu collapseicon"></i>
        <div class="usericon">
        </div>
      </div>
      <!-- 右侧的头部结束 -->
      <!-- 当前栏目tabs -->
      <div class="currentTab">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/category'}">栏目管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/article'}">文章管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 当前栏目tabs结束 -->
      <!-- 加载内容区 -->
      <div class="Rightcontent">
        <div class="wrapper">
          <router-view></router-view>
        </div>
      </div>
      <!-- 内容区结束 -->
    </div>
      <!-- 右边区域结束 -->
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        msg:'App.vue',
        currentRouter:'/'
      }
    },
    methods:{
     
    },
    watch:{
      '$route':function(to,from){
          this.currentRouter=to.path;
      }
    },
    beforeMount(){
        this.currentRouter=this.$route.path;
    }
  }
</script>

<style>
    body,html{
      margin:0;
      padding:0;
      height: 100%;
      font-family: '微软雅黑';
      font-size: 14px;
    }
    ul,li{
      list-style: none;
    }
    div{
      box-sizing: border-box;
    }
    #app{
      height: 100%;
    }
    /*左边区域样式*/
    .leftDiv{
      width: 210px;
      position: absolute;
      top:0;
      bottom: 0;
      left: 0;
      background-color: #1f2d3d; 
      display: inline-block;
      transition: all .3s;
    }

    .leftDiv .leftLogo{
      height: 50px;
      line-height: 50px;
    }
    .leftLogo img{
      max-width: 100%;
      max-height: 100%;
      cursor: pointer;
    }
    /*右边区域样式*/
    .rightDiv{
        position: absolute;
        top:0;
        left: 220px;
        bottom: 0;
        right: 0;
        /*background: red;*/
    }
    i.collapseicon{
      font-size:20px;
      line-height: 40px;
    }
    .rightDiv .rightTop{
        height: 7%;
        border-bottom: 2px solid #fcfcfc;
    }
    .usericon{
      width: 40px;
      height: 40px;
      position: absolute;
      right: 5%;
      top:0;
      border:1px solid #303133;
      border-radius: 50%;
      animation: run 5s ease-in-out infinite alternate;
    }
   .usericon:hover{
      background-color: #409EFF;
      opacity: .5;
      animation-play-state:paused;
   }
    /*右侧导航tabs*/
   .rightDiv .currentTab{
      height: 5%;
      padding: .5em;
      border-bottom: 6px solid #fcfcfc;
   }
   /*右侧内容区域*/
   .Rightcontent{
      padding: .5em;
      height: 88%;
   }
   .Rightcontent .wrapper{
      width: 100%;
      height: 100%;
      border-radius: 5px;
      padding:.5em;
      overflow-y: auto;
   }
   @keyframes run{
      form {
          right:5%;
      }to{
        right:92%;
      }
   }
    @keyframes zoom{
      from{
        transform: scaleX(0);
      }to{
        transform: scaleX(1);
      }
  }
</style>
