<template>
	<div id="create">
		<div class="tab">
		 选择板块:
			<select v-model='tab'>
				<option selected value='share'>分享</option>
				<option value='ask'>提问</option>
				<option value='job'>招聘</option>
			</select>
		</div>
		<div class="title">
			<input type="text" v-model='title' placeholder="标题字数十个以上">
		</div>
		<div class="content">
			<textarea v-model='content'  rows="18"></textarea>
		</div>
		<mt-button type='primary' size='large' @click='publish'>发布</mt-button>
	</div>
</template>

<script>
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
				tab:'',
				title:'',
				content:''
			}
		},
		vuex:{
			getters:{
				password:function(state){
					return state.accessToken;
				}
			}
		},
		ready:function(){
			window.scrollTo(0,0);
		},
		methods:{
			publish:function(){
				this.$http({
					method:'POST',
					url:'https://cnodejs.org/api/v1/topicsd',
					body:{accesstoken:this.password,
						  titel:this.title,
						  tab:this.tab,
						  content:this.content}
				}).then((response)=>{
					//成功
					successFn(response);
				}).catch((err)=>{
					//失败
					errorFn(err)
				})
				//成功时执行
				let successFn=(response)=>{
					Toast({message:'发表成功',duration:1000})
					this.$route.router.go({
						name:'tab',
						params:{tab:this.tab}
					})
				}
				//失败时执行
				let errorFn=(err)=>{
					Toast({message:'发表失败',duration:1000})
					console.warn(err.body);
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	#create{
		background-color: #fff;
		margin:5px;
		font-size: .25rem;
		padding: 5px;
		.tab{
			text-align:left;
			padding: 10px 0;
			select{
				width: 50%;
				padding: 4px;
			}
		}
		.title{
			input{
				width: 96%;
				border-radius: 3px;
				padding: 5px;
			}
		}
		.content{
			margin-top: 10px;
			textarea{
				width: 96%;
				border-radius: 3px;
				padding: 5px;
				resize: none;
			}
		}
	}
</style>