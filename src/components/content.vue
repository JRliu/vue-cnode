<template>
	<div id="content">
		<div class="panel ">
		<!-- 主题信息 -->
			<div class="top clear">
				<div class="title">
					<p>{{data.title}}</p>
				</div>
				<div class="create_at">•发表于 {{data.create_at|last_reply_at}}</div>
				<div class="tab">•来自 {{data|tabName}}</div>
				<mt-button :type="isCollect" size='small' style='float:right'
							v-if='loginStatus'
						   @click='collectToggle'>
				{{collectBtn}}
				</mt-button>
			</div>
		<!-- 主题内容 -->
			<div class="content clear">
				<div class="author clear"
					 v-link="{name:'user',params:{username:data.author.loginname}}">
					<img :src="data.author.avatar_url">
					<span>{{data.author.loginname}}</span>
				</div>
				
				<div class="main-content"
					 v-html='data.content'>
				</div>
			</div>
		<!-- 回复数量 -->
			<div class="replies_count">
				<div class="count">共{{data.reply_count}}条回复</div>
			</div>
		<!-- 所有回复 -->
			<div class="replies">
				<div class="reply"
					 v-for='re in data.replies'>
					<div class="author clear"
						 v-link="{name:'user',params:{username:re.author.loginname}}">
						<img :src="re.author.avatar_url">
						<span class="name">{{re.author.loginname}}</span>
						<span class="create_at">{{$index}}楼&nbsp&nbsp&nbsp{{re.create_at|last_reply_at}}</span>
					</div>
					<div class="content"
						 v-html='re.content|replaceLink'>
					</div>
					<!-- 点赞和回复评论 -->
					<div class="ups clear" v-if='loginStatus'>
						<div @click='ups(re.id)'>点赞({{re.ups.length}})</div>
						<div @click='showReply(re.id,re.author.loginname)'>回复</div>
					</div>
					<!-- 回复该楼 -->
					<div class="myReply" v-if='re.id===showReplyId'>
						<textarea name="myReply" class="myReplyText" rows="3" required
								  v-model='myReReply'>@{{showReplyName}}  </textarea>
						<mt-button type='default' size='small'
									@click="reReply(re.id)">回复该楼</mt-button>
					</div>
				</div>
			</div>
		<!-- 回复楼主 -->
			<div class="myReply" v-if='loginStatus'>
				<textarea name="myReply" class="myReplyText" rows="5" 
						  placeholder="快来回复楼主吧！" required
						  v-model='myReply'></textarea>
				<mt-button type='primary' size='large'
							@click='reply'>发表</mt-button>
			</div>
		</div>


	</div>
</template>

<script>
	import Vue from 'vue'
	require('../css/content.scss')
	import {Button} from 'mint-ui'
	import 'mint-ui/lib/button/style.css'
	import { Toast } from 'mint-ui'
	import 'mint-ui/lib/toast/style.css'
	
	export default{
		components:{
			MtButton:Button
		},
		data(){
			return{
				id:this.$route.params.id,
				data:{
					author:{}
				},
				myReply:'',
				myReReply:'',
				showReplyId:0,
				showReplyName:''
			}
		},
		computed:{
			isCollect:function(){
				if(!this.data.is_collect){
					return 'primary'
				}else{
					return 'default'
				}
			},
			collectBtn:function(){
				if(!this.data.is_collect){
					return '收藏'
				}else{
					return '取消收藏'
				}
			}
		},
		vuex:{
			getters:{
				accessToken:function(state){
					return state.accessToken;
				},
				loginStatus:function(state){
					return state.loginStatus;
				}
			}
		},
		methods:{
			getData:function(){
				this.$http({
					url:'https://cnodejs.org/api/v1/topic/'+this.$route.params.id,
					method:'GET',
					params:{accesstoken:this.accessToken}
				}).then((response)=>{
					let data=response.body.data
					Vue.set(this,'data',data)
				});
			},
			collectToggle:function(){
				let toggle=(url,boolean)=>{
					this.$http({
						url:'https://cnodejs.org/api/v1/topic_collect/'+url,
						method:'POST',
						body:{accesstoken:this.accessToken,
							  topic_id:this.data.id}
					}).then((response)=>{
						Vue.set(this.data,'is_collect',boolean)
					}).catch((err)=>{
						console.warn(err)
					})
				}
				if(!this.data.is_collect){
					let url='collect',boolean=true;
					toggle(url,boolean)
					Toast({message:'收藏成功',duration:1000})
				}else{
					let url='de_collect',boolean=false;
					toggle(url,boolean)
					Toast({message:'取消成功',duration:1000})
				}
			},
			reply:function(replyId){
				this.$http({
					url:'https://cnodejs.org/api/v1/topic/'+this.data.id+'/replies',
					method:'POST',
					body:{accesstoken:this.accessToken,
						  content:this.myReply}
				}).then((response)=>{
					this.getData();
					this.myReply='';
				}).catch((err)=>{
					console.log(err)
				})
			},
			ups:function(id){
				this.$http({
					url:'https://cnodejs.org/api/v1/reply/'+id+'/ups',
					method:'POST',
					body:{accesstoken:this.accessToken}
				}).then((response)=>{
					// let items=this.data.replies.filter(function(item){
					// 	return item.id==id
					// })
					// let item=items[0];
					// item.ups.push('0')
					// console.log(item[0].ups)
				}).catch((err)=>{
					console.log(err)
				})
			},
			reReply:function(replyId){
				this.$http({
					url:'https://cnodejs.org/api/v1/topic/'+this.data.id+'/replies',
					method:'POST',
					body:{accesstoken:this.accessToken,
						  content:this.myReReply,
						  reply_id:replyId}
				}).then((response)=>{
					this.getData();
					this.showReplyId=0;
				}).catch((err)=>{
					console.log(err)
				})
			},
			showReply:function(id,name){
				if(this.showReplyId===id){
					this.showReplyId=0;
					this.showReplyName=''
				}else{
					this.showReplyId=id;
					this.showReplyName=name;
				}
			}
		},
		ready:function(){
			this.getData();
			//修改@user 的href
		}
	}
</script>

<style scoped lang='scss'>
	#content{
		position: absolute;
		width: 100%;
	}
	.panel{
		margin:5px;
		.top{
			padding: 10px;
			background-color: #fff;
			.create_at{
				float: left;
				font-size: 0.2rem;
			}
			.tab{
				padding: 0 .1rem;
				border-radius:10%;
				float: left;
				font-size: 0.2rem;
			}
			.title{
				font-size:.35rem;
				text-align: left;
				font-weight: 600;
				line-height: .6rem;
			}
		}
		.content{
			.author{
				background-color: #fff;
				img{
					height:0.5rem;
					display: block;
					padding: .125rem;
					border-radius: 15%;
					float: left;
					cursor:pointer; 
				}
				span{
					float: left;
					line-height: .5rem;
					font-size: .3rem;
				}
			}
			.main-content{
				text-align: justify;
				font-size:.26rem;
				line-height: .4rem;
				padding: 10px;
				background-color: #fff;
			}
		}
		.replies_count{
			margin:2px 0;
			background-color: #fff;
			height:.5rem;
			line-height: .5rem;
			font-size: .26rem;
			text-align: justify;
			color: #2e2e2e;
			font-weight: 700;
			&:before{
				content:'';
				height:100%;
				float: left;
				width: 7px;
				background-color: #2e2e2e;
				display: block;
			}
		}
		.replies{
			.reply{
				margin-bottom: 2px;
			}
			.author{
				background-color: #fff;
				img{
					height:0.5rem;
					display: block;
					padding: .125rem;
					border-radius: 15%;
					float: left;
					cursor:pointer; 
				}
				.name{
					float: left;
					line-height: .5rem;
					font-size: .25rem;
				}
				.create_at{
					float:right;
					line-height: .5rem;
					font-size: .2rem;
					padding-right: 10px;
				}
			}

			.content{
				text-align: justify;
				font-size:.26rem;
				line-height: .4rem;
				padding: 10px;
				padding-top: 0;
				background-color: #fff;
				position: relative;

			}
			.ups{
				background-color: #fff;
				div{
					float: right;
					padding-right: 10px;
					color: #26a2ff;
				}
			}
		}
	}
	.myReply{
		.myReplyText{
			width: 100%;
			resize: none;
			border-radius: 5px;
			font-size: .28rem;
			box-sizing: border-box;
			padding: 5px;
		}
	}
	
</style>