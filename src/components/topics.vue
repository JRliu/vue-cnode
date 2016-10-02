<template>
	<div id="topics">
	<mt-loadmore :bottom-method="loadMore" :top-method="refresh"
				 :bottom-pull-text="'上拉加载更多'">
<!-- 顶部标签 -->
		<ul id="tab" class="clear">
			<li v-for='tab in tabs'>
				<p class="tab" 
				   v-link='{name:"tab",params:{tab:tab.en},activeClass:"active"}'
				   >{{tab.cn}}
				</p>
			</li>
		</ul>
<!-- 帖子 -->
		<ul>
			<li class="topic" v-for='topic in topics'
				 v-link="{name:'topic',params:{id:topic.id}}">
				<!-- 标签（精华  等） -->
				<div class="top">
					<div class="tab" 
						v-bind:class="[tabClass(topic)]">
						{{topic|tabName}}
					</div>
					<span class="last_reply_at">{{topic.last_reply_at|last_reply_at}}</span>
				</div>
				<!-- 标题 -->
				<div class="title">
					 {{topic.title}}
				</div>
				<!-- 浏览次数 -->
				<div class="footer">
					<span class="reply_visit">{{topic.reply_count}}/{{topic.visit_count}}</span>
					<span class="author">{{topic.author.loginname}}</span>
				</div>
			</li>
		</ul>
	</mt-loadmore>
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	import 'mint-ui/lib/loadmore/style.css';
	
	export default{
		components:{
			MtLoadmore:Loadmore
		},
		data(){
			return{
				tabs:[
					{cn:'全部',en:'all'},
					{cn:'精华',en:'good'},
					{cn:'分享',en:'share'},
					{cn:'提问',en:'ask'},
					{cn:'招聘',en:'job'}
				]
			}
		},
		computed:{
			tabName:function(){
				return this.$route.params.tab
			}
		},
		watch:{
			refreshSwitch:function(val,oldVal){
				this.refresh();				
			},
			sidebarGetTopics:function(){
				setTimeout(()=>{
					this.getTopics();
				},0)
			}
		},
		ready:function(){
			//刷新浏览器的话，获取第一页
			if(this.topics==''){
				this.getTopics();
			}
		},
		methods:{
		//ajax通用函数，获取分区第一页
			get:function(page,successFn,errorFn){
				this.$http({
			      method:'GET',
			      url:'https://cnodejs.org/api/v1/topics',
			      params:{'tab':this.$route.params.tab,'page':page}
			    }).then((response)=>{
			      successFn(response);
			    }).catch((err)=>{
			      errorFn(err);
			    })
			},
		//获取第一页
			getTopics:function(){
				let page=1;
				let successFn=(response)=>{
					this.saveTopics(response.body.data)
				};
				let errorFn=(err)=>{
					console.warn(err);
				};
				this.get(page,successFn,errorFn)
				this.$nextTick(()=>{
					document.body.scrollTop=0;
				})
			},
		//上拉后获取更多
			loadMore:function(id){
				let page=this.page;
				let successFn=(response)=>{
					setTimeout(()=>{
						this.moreTopics(response.body.data);
						this.$broadcast('onBottomLoaded', id);
					},300)
				};
				let errorFn=(err)=>{
					console.warn(err);
				};
				this.get(page,successFn,errorFn);
			},
		//下拉刷新
			refresh:function(id){
				let page=1;
				let successFn=(response)=>{
					setTimeout(()=>{
						this.saveTopics(response.body.data);
						this.$broadcast('onTopLoaded', id);
					},300)
				};
				let errorFn=(err)=>{
					console.warn(err);
				};
				this.get(page,successFn,errorFn);

				document.body.scrollTop=0;
			},
			tabClass:function(topic){
				if(topic.top){ return 'topTab'}
				else if(topic.good){return 'good'}
				else if(topic.tab=='share'){return 'share'}
				else if(topic.tab=='ask'){return 'ask'}
				else if(topic.tab=='job'){return 'job'}
			}
		},
		vuex:{
			getters:{
				topics:function(state){
					return state.topics;
				},
				page:function(state){
					return state.page;
				},
				refreshSwitch:function(state){
					return state.refreshTopics;
				},
				sidebarGetTopics:function(state){
					return state.getTopics;
				}
			},
			actions:{
			//获取第一页后清除原有帖子，并保存新获取的
				saveTopics:function({dispatch},data){
					dispatch('SAVE_TOPICS',data)
				},
			//获取更多后拼接原有的帖子
				moreTopics:function({dispatch},data){
					dispatch('MORE_TOPICS',data)
				}
			}
		},
		route:{
			data:function(transition){
				if(transition.from.name=='tab'){
					this.getTopics()
				}
				
				//返回时调整scrolltop到进入内容时的状态
				if(transition.from.name!='tab'){
					this.$nextTick(()=> document.body.scrollTop=sessionStorage.scrollTop);
				}
				
			},
			deactivate(transition){
				//离开时保存scrolltop
				sessionStorage.scrollTop = document.body.scrollTop;
				transition.next();
			}
		}
	}
</script>

<style scoped lang='scss'>
	#topics{
		position: absolute;
		width: 100%;
	}
	#tab{
		/*height:50px;*/
		padding: 5px;
		.tab{
			height:.5rem;
			line-height:.5rem;
			font-size: .3rem;
			padding: 1px 5px;
			background-color: #fff;
			float: left;
			border-radius: 15%;
			margin-left: 10px;
			cursor: pointer;
		}
		.active{
			background-color: #2e2e2e;
			color: #fff;
		}
	}
	.topic{
		border-width: 3px 5px;
		border-style:solid;
		border-color:#e2e2e2;
		background-color: #fff;
		padding:5px;
		position: relative;
		&:active{
			background-color:#e2e2e2;
		}
	}
	.title{
		font-size: .28rem;
		text-align: left;
		padding: .1rem 0;
		width: 100%;
		cursor:pointer; 
		text-overflow:ellipsis;
		/*white-space: nowrap;*/
		overflow: hidden;
	}
	.top{
		position: relative;
		height: .4rem;
		.tab{
			position: absolute;
			left: 0;
			background-color: #e1e1e1;
			height:.4rem;
			width:.5rem;
			line-height: .4rem;
			padding: 0 .1rem;
			border-radius:10%;
			font-size: 0.2rem;
		}
		.last_reply_at{
			position: absolute;
			right: 0px;
			line-height: .4rem;
		}
	} 
	.footer{
		position: relative;
		height: 20px;
		line-height: 20px;
		span{
			line-height: 20px;
			color: #999999;
			position: absolute;
		}
		.reply_visit{
			right: 0px;
		}
		.author{
			left: 0px;
		}
	}
	.topic {
		.topTab{
			background-color: #c92252;
			color: #fff;
		}
		.good{
			background-color: #80bd01;
			color: #fff;
		}
		.share{
			background-color: #0039b3;
			color: #fff;
		}
		.ask{
			background-color: #2096ba;
			color: #fff;
		}
		.job{
			background-color: #424e69;
			color: #fff;
		}
	}
</style>