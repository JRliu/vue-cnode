<template>
	<div id="sidebar">
		<!-- 未登陆 -->
			<div class="loginIn"
				 v-link="{name:'loginIn'}"
				 @click='hideSidebar'
				 v-if='!loginStatus'>
				<div class="img">
					<i class="iconfont icon-denglu"></i>
				</div>
				<mt-button type="default" 
						   :size='"small"'
						   class='logBtn'>
							登陆
				</mt-button>
			</div>
		<!-- 已登录 -->
			<div class="loginIn"
				 v-if='loginStatus'>
				<div class="img"
					  v-link="{name:'user',params:{username:userData.loginname}}"
				 	  @click='hideSidebar'>
					<img :src="userData.avatar_url">
				</div>
				<p>{{userData.loginname}}</p>
				<mt-button type="danger" 
						   :size='"small"'
						   class='logBtn'
						   @click='logout'>
							退出登陆
				</mt-button>
				<i class="iconfont icon-xiaoxi"
					@click='goMessage'></i>
			</div>
		<!-- 分区按钮 -->
		<div class="btns">
			<div class="btn"
				 v-for='btn in btns'
				 v-link="{path:btn.link}"
				 @click='goList(btn)'>
				{{btn.name}}
			</div>
		</div>
	</div>
</template>

<script>
	import {Button} from 'mint-ui'
	import 'mint-ui/lib/button/style.css'
	import { Toast } from 'mint-ui'
	import 'mint-ui/lib/toast/style.css'
	import { MessageBox } from 'mint-ui'
	import 'mint-ui/lib/message-box/style.css'
	

	export default{
		components:{
			MtButton:Button
		},
		data(){
			return{
				btns:[
					{name:'首页',link:'/all',en:'all'},
					{name:'精华',link:'/good',en:'good'},
					{name:'分享',link:'/share',en:'share'},
					{name:'问答',link:'/ask',en:'ask'},
					{name:'招聘',link:'/job',en:'job'},
				]
			}
		},
		methods:{
			goList:function(btn){
				this.clearTopics();
				//如果分区不变，则刷新
				if(btn.en==this.$route.params.tab){
					this.refreshTopics();
				}
				this.hideSidebar();
			},
			logout:function(){
				MessageBox.confirm('退出登陆？','提示').then((action)=>{
						localStorage.clear();
						this.logoutStatus();
						Toast({message:'退出成功',duration:1000,position:'bottom'})
					},(cancel)=>{
						Toast({message:'取消',duration:1000,position:'bottom'})
					})
			},
			goMessage:function(){
				this.hideSidebar();
				this.$route.router.go({name:'message'})
			}
		},
		vuex:{
			actions:{
				hideSidebar:function({dispatch}){
					//v-link和@click冲突，异步@click解决
					window.setTimeout(()=>{
						dispatch('HIDE_SIDEBAR');
					},0)
				},
				clearTopics:function({dispatch}){
					dispatch('CLEAR_TOPICS')
				},
				refreshTopics:function({dispatch}){
					dispatch('REFRESH_START')
				},
				logoutStatus:function({dispatch}){
					dispatch('LOGIN_OUT')
				}
			},
			getters:{
				loginStatus:function(state){
					return state.loginStatus;
				},
				userData:function(state){
					return state.userData;
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	#sidebar{
		height: 100%;
		width: 3rem;
		background-color: #fff;
		position: fixed;
		top: 0;
		z-index: 100;
		.loginIn{
			padding-top: .4rem;
			position: relative;
			background-color: #fff;
			border-bottom:1px solid #e2e2e2;
			font-size: .3rem;
			text-align: center;
			.img{
				background-color: #ccc;
				border-radius: 15%;
				height: 1.5rem;
				width: 1.5rem;
				line-height: 1.5rem;
				margin:0 auto;
				position: relative;
				i{
					font-size: .8rem;
				}
				img{
					height: 100%;
					width: 100%;
					display: block;
					border-radius: 15%;
				}
			}
			.logBtn{
				margin:5px 0;
			}
			.icon-xiaoxi{
				position: absolute;
				margin-left: 10px;
				font-size: .4rem;
				/*line-height: 1rem;*/
				/*&:before{
					position:relative;
					top:4px;
				}*/
			}
		}
		.btn{
			border-bottom:1px solid #e2e2e2;
			font-size: .4rem;
			line-height: .7rem;
		}
	}
	
</style>