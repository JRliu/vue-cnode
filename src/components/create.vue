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
		route:{
			data:function(){
				window.scrollTo(0,0);
			}
		},
		methods:{
			publish:function(){
				if(this.title.trim()==''){
					Toast({message:'标题不能为空',duration:1000})
				}else if(this.content.trim()==''){
					Toast({message:'内容不能为空',duration:1000})
				}else{
					this.$http({
						method:'POST',
						url:'https://cnodejs.org/api/v1/topics',
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
					}

				//成功时执行
				let successFn=(response)=>{
					Toast({message:'发表成功',duration:1000})
					this.tab='';this.title='';this.content='';
					this.$route.router.go({
						name:'tab',
						params:{tab:this.tab}
					});
				}
				//失败时执行
				let errorFn=(err)=>{
					Toast({message:err.body.error_msg+'!',duration:2000})
					console.warn(err.body);
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	#create{
		position: absolute;
		width: 100%;
		background-color: #fff;
		border: 1px solid #e2e2e2;
		border-width: 2px 1px;
		font-size: .25rem;
		padding: 5px;
		box-sizing: border-box;
		.tab{
			text-align:left;
			padding: 10px 0;
			select{
				width: 50%;
				padding: 4px;
				&:focus{
					outline:0;
					border-color: #66afe9; 
					outline: 0; 
					-webkit-box-shadow: inset 0 0px 0px rgba(0,0,0,.075), 0 0 5px rgba(102, 175, 233, 0.6); 
					box-shadow: inset 0 0px 0px rgba(0,0,0,.075), 0 0 5px rgba(102, 175, 233, 0.6);
				}

			}
		}
		.title{
			input{
				width: 96%;
				padding: 5px;
				border-top: 0;
				border-left:0;
				border-right:0;
				border-bottom: 1px solid #999;
				&:focus{
					border-color: #66afe9; 
					outline: 0; 
					-webkit-box-shadow: inset 0 0px 0px rgba(0,0,0,.075), 0 0 5px rgba(102, 175, 233, 0.6); 
					box-shadow: inset 0 0px 0px rgba(0,0,0,.075), 0 0 5px rgba(102, 175, 233, 0.6); 
				}
			}
		}
		.content{
			margin-top: 10px;
			textarea{
				width: 96%;
				border-radius: 3px;
				padding: 5px;
				resize: none;
				&:focus{
					border-color: #66afe9; 
					outline: 0;
					-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 5px rgba(102, 175, 233, 0.6); 
					box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 5px rgba(102, 175, 233, 0.6); 
				}
			}
		}
	}
</style>