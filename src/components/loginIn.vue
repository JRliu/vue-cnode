<template>
	<div id="loginIn">
		<form>
			<label>Access Token</label>
			<textarea rows="2" v-model='accessToken'
				   class="password">ce3d4bcc-f85b-4c39-96f3-251c49d7416d</textarea>
			<mt-button class='logBtn' size='large'
						@click.prevent='loginIn(this.accessToken)'
						>
						登陆
			</mt-button>
		</form>
		<p class="prompt">提示：如何获取 accessToken？ 用户在pc端登录后，在设置页面底部可以看到自己的 accessToken。</p>
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
				accessToken:''
			}
		},
		methods:{
			loginIn:function(password){
				this.$http({
					method:'POST',
					url:'https://cnodejs.org/api/v1/accesstoken',
					body:{accesstoken:password}
				}).then((response)=>{
					this.successFn(response);
				}).catch((err)=>{
					console.warn(err)
				})
			},
			successFn:function(response){
				localStorage.setItem('accessToken',this.accessToken);
				localStorage.setItem('userData',JSON.stringify(response.body));
				localStorage.setItem('auto-login',true);

				this.loginStatus(response.body);
				this.$route.router.go({path:'/all'})
				Toast({message:'登陆成功',duration:1000})
			}
		},
		vuex:{
			actions:{
				loginStatus:function({dispatch},data){
					dispatch('LOGIN_IN',data);
				}
			}
		}

	}
</script>

<style scoped lang='scss'>
	#loginIn{
		border: 2px solid #e2e2e2;
		background-color: #fff;
		margin-top: 10px;
		padding-top: .4rem;
		padding-left: .2rem;
		padding-right: .2rem;
		position: absolute;
		label{
			font-size: .4rem;
			font-weight: 700;
			display: block;
			text-align: left;
			padding-left: 10%;
		}
		.password{
			padding: 5px 20px;
			font-size: .5rem;
			font-family: "monospace";
			width: 85%;
			display: block;
			margin:0 auto;
			border-radius: 5px;
			text-align: left;
			resize: none;
		}
		.logBtn{
			margin:5px 0;
		}
		.prompt{
			text-align: left;
			margin-top: 30px;
		}
	}
</style>