<template>
	<div id="userpage" v-show='loadState'>
		<div class="introduction clear">
			<img :src="user.avatar_url">
			<span class="username">{{user.loginname}}</span>
			<span class="create_at">{{user.create_at|last_reply_at}}加入cnodejs</span>
			<span class="score">个人积分：{{user.score}}</span>
		</div>
		<div class="recent">
			<!-- 标签 -->
			<div class="tab clear">
				<div @click='changeTab("recent_replies")'
				     :class="{'active':this.active==this.user.recent_replies}">
				     最近回复
				</div>
				<div @click='changeTab("recent_topics")'
				      :class="{'active':this.active==this.user.recent_topics}">
				     最近发表
				</div>
				<div @click='changeTab("collect")'
				      :class="{'active':this.active==this.collect}">
				     收藏文章
				</div>
			</div>
			<!-- 内容 -->
			<div class="content clear">
				<div v-for='item in active' 
					 class="item clear">
					<img :src="item.author.avatar_url"  
						 v-link="{name:'user',params:{username:item.author.loginname}}"
						 >
					<div class="title"
						 v-link="{name:'topic',params:{id:item.id}}">
						 {{item.title}}
					</div>
					<div class="last_reply_at">
						最近回复：{{item.last_reply_at|last_reply_at}}
					</div>
				</div>
				<!-- 无内容时 -->
				<div class="empty"
					 v-if='active.length<1'>
					 暂无内容
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				user:{},
				active:{},
				collect:[],
				loadState:false
			}
		},
		computed:{
			username:function(){
				return this.$route.params.username
			}
		},
		watch:{
			username:function(val,oldVal){
				if(!!val&!!oldVal){
					this.getAll();
				}
			}
		},
		route:{
			data:function(){
				this.getAll();
			}
		},
		methods:{
			get:function(url,username,successFn,errorFn){
				this.$data.loadState=false;
				this.$http({
			      method:'GET',
			      url:url+username
			    }).then((response)=>{
			      successFn(response);
			      setTimeout(()=>{
			      	  this.$data.loadState=true;
			      },200)
			    }).catch((err)=>{
			      errorFn(err);
			    })
			},
			getAll:function(){
				//获取最近发表和最近回复
				let url='https://cnodejs.org/api/v1/user/';
				let username=this.$route.params.username;
				let successFn=(response)=>{
					this.$set('user',response.body.data)
					//初始化active
					this.$set('active',response.body.data.recent_replies)
				};
				let errorFn=(response)=>{
					console.warn(response);
				};
				this.get(url,username,successFn,errorFn)
				//获取收藏
				let cUrl='https://cnodejs.org/api/v1/topic_collect/';
				let cSuccessFn=(response)=>{
					this.$set('collect',response.body.data)
				}
				this.get(cUrl,username,cSuccessFn,errorFn)

			},
			changeTab:function(name){
				this.$set('active',this.user[name]||this[name]);
			}
		}
	}
</script>

<style scoped lang='scss'>
	#userpage{
		position: absolute;
		width: 100%;
	}
	.introduction{
		background-color: #fff;
		margin: 5px;
		padding: 10px;
		position: relative;
		img{
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 15%;
			float: left;
		}
		span{
			position: absolute;
			display: block;
			left:1.7rem;
		}
		.username{
			font-size: .3rem;
			padding: 5px;
		}
		.create_at{
			padding: 5px;
			top:.7rem;
			color: #666666;
		}
		.score{
			padding: 5px;
			top:1.1rem;
			color: #666666;
		}
	}
	.recent{
		background-color: #fff;
		margin: 5px;
		position: relative;
		.tab{
			position: relative;
			width: 100%;
			.active{
				color: #80bd01;
				&:after{
					background-color:#80bd01;
					color: #2e2e2e;
					height:3px;
					margin-top: -3px;
					width: 100%;
					display: block;
					content: "";
				}
			}
		}
		.tab div{
			border-right: 1px solid #e2e2e2;
			display: inline-block;
			width:33.3%;
			float: left;
			box-sizing: border-box;
			height:.8rem;
			line-height: .8rem;
			font-size: .27rem;
			border-bottom:1px solid #e2e2e2;
		}
		.content{
			.item{
				font-size: .28rem;
				font-weight:600;
				text-align: left;
				border-bottom:1px solid #e2e2e2;
				padding: .1rem 0;
				width: 100%;
				float: left;
				cursor:pointer; 
				img{
					height:.7rem;
					display: block;
					padding: .1rem;
					border-radius: 15%;
					float: left;
					cursor:pointer; 
				}
				.title{
					text-overflow:ellipsis;
					white-space: nowrap;
					overflow: hidden;
					padding-top: .1rem;
				}
				.last_reply_at{
					float: right;
					margin-right: .3rem;
					color: #999999;
					font-size: 12px;
				}
			}
			.empty{
				font-size: .28rem;
				line-height: .7rem;
			}
		}
		
	}
</style>