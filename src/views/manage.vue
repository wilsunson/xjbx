<template>
    <div>
        <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
       <el-row>
           <el-col  :span="4">
               <el-menu :default-active="defaultActive"  router>
                   <el-button type="primary" @click="routedetail">@click="routedetail"</el-button>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="about">about</el-menu-item>
						<el-menu-item index="input">input</el-menu-item>
						<el-menu-item index="call">call</el-menu-item>
					</el-submenu>
               </el-menu>
           </el-col>
           <el-col :span="20">
               <div>this is a router-view page</div>
               <keep-alive>
				    <router-view></router-view>
				</keep-alive>
           </el-col>
       </el-row>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Manage extends Vue{
  get  defaultActive(){
        	return this.$route.name;
    }
    routedetail(){
        console.log(`route detail`,this.$route,this.$route.path.replace('/', ''))
    }
}
</script>
