<template>
	<div id="message">
		<div class="tab clear">
			<div @click='changeTab("hasnot_read_messages")'
			     :class="{'active':this.active==this.data.hasnot_read_messages}">
			     未读消息
			</div>
			<div @click='changeTab("has_read_messages")'
			     :class="{'active':this.active==this.data.has_read_messages}">
			     已读消息
			</div>
		</div>
		<div class="list clear">
			<div v-for='item in active' class="item"
				 v-if='active.length>0'>
				<div class="author" 
					 v-link="{name:'user',params:{username:item.author.loginname}}">
					<img :src="item.author.avatar_url">
					<span>{{item.author.loginname}}在主题：</span>
					<span class="create_at">{{item.reply.create_at|last_reply_at}}</span>
				</div>
				<div class="topic" v-link="{name:'topic',params:{id:item.topic.id}}">
					{{item.topic.title}}
				</div>
				<div class="reply">
					{{item.reply.content}}
				</div>
			</div>
			<div class="empty" 
				 v-if='active.length==0'>
				暂无内容
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				active:[],
				data:{}
			}
		},
		vuex:{
			getters:{
				password:function(state){
					return state.accessToken
				}
			}
		},
		methods:{
			getMessages:function(){
				this.$http({
					method:"GET",
					url:'https://cnodejs.org/api/v1/messages',
					params:{accesstoken:this.password}
				}).then((response)=>{
					//初始化data和active
					this.$set('data',response.body.data)
					this.$set('active',response.body.data.hasnot_read_messages)
				}).catch((err)=>{
					console.warn(err)
				})
			},
			changeTab:function(name){
				this.$set('active',this.data[name])
			}
		},
		route:{
			data(transition){
				this.getMessages()
			}
		}
	}
</script>

<style scoped lang='scss'>
	#message{
		background-color: #fff;
		border: 5px solid #e2e2e2;
		box-sizing: border-box;
		position: absolute;
		width:100%;
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
			div{
				border-right: 1px solid #e2e2e2;
				display: inline-block;
				width:50%;
				float: left;
				box-sizing: border-box;
				height:.8rem;
				line-height: .8rem;
				font-size: .27rem;
				border-bottom:1px solid #e2e2e2;
			}
		}
		.list{
			background-color: #fff;
			.item{
				font-size: .25rem;
				text-align: left;
				border-bottom:1px solid #e2e2e2;
				width: 100%;
				float: left;
				cursor:pointer; 
				padding: 5px;
				box-sizing: border-box;
				.author{
					img{
						height:.4rem;
						display: block;
						padding: .1rem;
						border-radius: 15%;
						float: left;
						cursor:pointer; 
					}
					span{
						line-height: .6rem;
						font-size: .23rem;
					}
					.create_at{
						float: right;
					}
				}
				.topic{
					text-overflow:ellipsis;
					white-space: nowrap;
					overflow: hidden;
					background-color: #e2e2e2;
					font-weight:600;
					padding: 8px;
				}
				.reply{
					
					line-height: 1.75;
					margin-left: .4rem;
					padding-left: 8px;
				}
			}
			.empty{
				font-size: .28rem;
				line-height: .7rem;
			}
		}
	}
</style>