<template>
	<div id="topics">
	<mt-loadmore :bottom-method="loadMore" :top-method="refresh"
				 :bottom-pull-text="'上拉加载更多'">
<!-- 顶部标签 -->
		<div id="tab" class="clear">
			<div v-for='tab in tabs'>
				<p class="tab" 
				   v-link='{name:"tab",params:{tab:tab.en},activeClass:"active"}'
				   >{{tab.cn}}
				</p>
			</div>
		</div>
<!-- 帖子 -->
		<div class="topic" v-for='topic in topics'>
			<!-- 头像 -->
			<img :src="topic.author.avatar_url"  
				 v-link="{name:'user',params:{username:topic.author.loginname}}">
			<!-- 标签（精华  等） -->
			<div class="tab" 
				v-bind:class="{'good':topic.good||topic.top}">
				{{topic|tabName}}
			</div>
			<!-- 标题 -->
			<div class="title"
				 v-link="{name:'topic',params:{id:topic.id}}">
				 {{topic.title}}
			</div>
			<!-- 浏览次数 -->
			<div class="last_reply_at">{{topic.last_reply_at|last_reply_at}}</div>
			<div class="reply_visit">{{topic.reply_count}}/{{topic.visit_count}}</div>
		</div>
		
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
			//切换分区
			tabName:function(val,oldVal){
				setTimeout(()=>{
					this.getTopics()
				},0)
			},
			refreshSwitch:function(val,oldVal){
				if(oldVal==false){
					this.refresh();
					this.refreshEnd();
				}
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
				}
			},
			actions:{
			//获取第一页后清除原有帖子，并保存新获取的
				saveTopics:function({dispatch},data){
					dispatch('SAVE_TOPICS',data)
				},
			//获取更多后拼接进原有的帖子
				moreTopics:function({dispatch},data){
					dispatch('MORE_TOPICS',data)
				},
				refreshEnd:function({dispatch}){
					dispatch('REFRESH_END')
				}
			}
		},
		route:{
			data(transition){
				//重内容页返回时调整scrolltop到进入内容时的状态
				if(transition.from.name=='topic'){
					this.$nextTick(()=> document.body.scrollTop=sessionStorage.scrollTop);
				}
			},
			deactivate(transition){
				//进入内容时保存scrolltop
				if(transition.to.name=="topic"){
					sessionStorage.scrollTop = document.body.scrollTop;
				}
				transition.next();
			}
		}
	}
</script>

<style scoped lang='scss'>
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
		height: 1rem;
		border: 1px solid #e2e2e2;
		background-color: #fff;
	}
	.title{
		font-size: .28rem;
		font-weight:600;
		text-align: left;
		padding-top: .2rem;
		padding-left: .2rem;
		width: 70%;
		float: left;
		cursor:pointer; 
		text-overflow:ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.topic .tab{
		background-color: #e1e1e1;
		height:.4rem;
		line-height: .4rem;
		padding: 0 .1rem;
		border-radius:10%;
		top:.2rem;
		margin-top: .2rem;
		float: left;
		font-size: 0.2rem;
	}
	.topic .good{
		background-color: #80bd01;
		color: #fff;
	}
	.last_reply_at{
		float: right;
		margin-right: .3rem;
		color: #999999;
	}
	.reply_visit{
		margin-left: .9rem;
		float: left;
		color: #999999;
	}
	img{
		height:0.75rem;
		display: block;
		padding: .125rem;
		border-radius: 15%;
		float: left;
		cursor:pointer; 
	}
	.pages{
		height:50px;
	}
</style>