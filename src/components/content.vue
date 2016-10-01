<template>
	<div id="content" v-show='loadState'>
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
					 v-html='data.content'
					 @click='showPic'>
				</div>
				<mt-button :type="isCollect" size='small' 
							v-if='loginStatus'
						   @click='replyFocus'>
					回复
				</mt-button>
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
						<div @click='ups(re.id,re.ups)'>{{upsText(re)}}({{re.ups.length}})</div>
						<div @click='showReply(re.id,re.author.loginname)'>回复</div>
					</div>
					<!-- 回复该楼 -->
					<div class="myReply" v-if='re.id===showReplyId'>
						<textarea name="myReply" class="myReplyText" rows="3" required
								  v-model='myReReply' id="reReply"
								  @click='iosScrollTo'>@{{showReplyName}}  </textarea>
						<mt-button type='default' size='small'
									@click="reReply(re.id)">回复该楼</mt-button>
					</div>
				</div>
			</div>
		<!-- 回复楼主 -->
			<div class="myReply" v-if='loginStatus' >
				<textarea name="myReply" class="myReplyText" rows="5"  id='replyAuthor'
						  placeholder="快来回复楼主吧！" required
						  v-model='myReply'
						  @click='iosScrollTo'></textarea>
				<mt-button type='primary' size='large'
							@click='reply'>发表</mt-button>
			</div>
		</div>

		<show-pic v-ref:showPic></show-pic>
	</div>
</template>

<script>
	import Vue from 'vue'
	require('../css/content.scss')
	import {Button} from 'mint-ui'
	import 'mint-ui/lib/button/style.css'
	import { Toast } from 'mint-ui'
	import 'mint-ui/lib/toast/style.css'
	import ShowPic from './showPic'
	
	export default{
		components:{
			MtButton:Button,
			ShowPic
		},
		data(){
			return{
				id:this.$route.params.id,
				data:{
					author:{},
					content:''
				},
				myReply:'',
				myReReply:'',
				showReplyId:0,
				showReplyName:'',
				loadState:false
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
				},
				userId:function({userData}){
					return userData.id
				}
			}
		},
		methods:{
			//获取数据
			getData:function(){
				this.$data.loadState=false
				this.$http({
					url:'https://cnodejs.org/api/v1/topic/'+this.$route.params.id,
					method:'GET',
					params:{accesstoken:this.accessToken}
				}).then((response)=>{
					let data=response.body.data;
					Vue.set(this,'data',data);
					setTimeout(()=>{
			      	  this.$data.loadState=true;
			      },300)
				});
			},
			collectToggle:function(){
			//收藏、取消收藏
				let toggle=(url,boolean,succ)=>{
					this.$http({
						url:'https://cnodejs.org/api/v1/topic_collect/'+url,
						method:'POST',
						body:{accesstoken:this.accessToken,
							  topic_id:this.data.id}
					}).then((response)=>{
						Vue.set(this.data,'is_collect',boolean);
						succ()
					}).catch((err)=>{
						console.warn(err.body)
						Toast({message:'请求失败，请稍后再试',duration:1000})
					})
				}
				if(!this.data.is_collect){
					let url='collect',boolean=true;
					let succ=()=>{Toast({message:'收藏成功',duration:1000})};
					toggle(url,boolean,succ)
					
				}else{
					let url='de_collect',boolean=false;
					let succ=()=>{Toast({message:'取消成功',duration:1000})};
					toggle(url,boolean,succ)
				}
			},
			//回复楼主
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
					console.warn(err.body)
					
				})
			},
			replyFocus:function(){
				let reply=document.getElementById('replyAuthor');
				reply.scrollIntoView();
			},
			//点赞
			ups:function(id,ups){
				this.$http({
					url:'https://cnodejs.org/api/v1/reply/'+id+'/ups',
					method:'POST',
					body:{accesstoken:this.accessToken}
				}).then((response)=>{
					if(response.body.action=='up'){
						ups.push(this.userId)
					}else{
						let index=ups.indexOf(this.userId)
						ups.splice(index,1)
					}
				}).catch((err)=>{
					console.warn(err.body)
					Toast({message:'请求失败，请稍后再试',duration:1000})
				})
			},
			//点赞按钮文字
			upsText:function(re){
				if(re.ups.some((item,index,array)=>{
					return item==this.userId
				})){return '已赞'}else{return '点赞'}
			},
			//回复某楼
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
			//显示回复某楼输入框
			showReply:function(id,name){
				if(this.showReplyId===id){
					this.showReplyId=0;
					this.showReplyName=''
				}else{
					this.showReplyId=id;
					this.showReplyName=name;
				}
			},
			// ios下键盘挡住textarea
			iosScrollTo:function(e){
				let u = navigator.userAgent;
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				let scrollBottom=()=> {
				    let win=document.body.scrollTop;
				    let el=e.target.offsetTop;
				    document.body.scrollTop=win+(el-win)-15
				}
				if (isiOS) {
			      	setTimeout(scrollBottom, 500)
				}
			},
			showPic:function(e){
				if(e.target.nodeName==='IMG'){
					this.$refs.showpic.$data.show=true;
					this.$refs.showpic.$data.src=e.target.src
				}
			}
		},
		route:{
			data(transition){
				this.getData();
				if(transition.from.name=='tab'){
					setTimeout(()=>{
						document.body.scrollTop=0;
					},500)
				}
				
				// 返回时调整scrolltop到进入内容时的状态
				if(transition.from.name=='user'&&sessionStorage.contentId==this.id){
					this.$nextTick(()=> {
						document.body.scrollTop=sessionStorage.contentScrollTop;
					});
				}
			},
			deactivate(transition){
				//离开时保存scrolltop
				if(transition.to.name=='user'){
					sessionStorage.contentScrollTop = document.body.scrollTop;
					sessionStorage.contentId=this.id;
				}
				transition.next();
			}
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
				line-height: 33px;
			}
			.tab{
				padding: 0 .1rem;
				border-radius:10%;
				float: left;
				font-size: 0.2rem;
				line-height: 33px;
			}
			.title{
				font-size:.35rem;
				text-align: left;
				font-weight: 600;
				line-height: .6rem;
			}
		}
		.content{
			background-color: #fff;
			padding-bottom: 10px;
			.author{
				img{
					height:0.7rem;
					display: block;
					padding: .125rem;
					border-radius: 20%;
					float: left;
					cursor:pointer; 
				}
				span{
					float: left;
					line-height: .925rem;
					font-size: .3rem;
				}
			}
			.main-content{
				text-align: justify;
				font-size:.26rem;
				line-height: .4rem;
				padding: 10px;
			}
		}
		.replies_count{
			margin:3px 0;
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
				margin-bottom: 3px;
				background-color: #fff;
			}
			.author{
				img{
					height:0.5rem;
					display: block;
					padding: .125rem;
					border-radius: 20%;
					float: left;
					cursor:pointer; 
				}
				.name{
					float: left;
					line-height: .75rem;
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
