<template>
	<div id="loginIn">
		<form>
			<label>请输入Access Token</label>
			<textarea rows="2" v-model='accessToken'
				   class="password">ce3d4bcc-f85b-4c39-96f3-251c49d7416d</textarea>
			<mt-button class='logBtn' size='large' type='primary'
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
				accessToken:'',
				from_path:''
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
					console.warn(err.body)
					Toast({message:err.body.error_msg,duration:1000})
				})
			},
			successFn:function(response){
				localStorage.setItem('accessToken',this.accessToken);
				localStorage.setItem('userData',JSON.stringify(response.body));
				localStorage.setItem('auto-login',true);

				this.loginStatus(response.body,this.accessToken);
				this.$route.router.go({path:this.from_path||'/all'})
				Toast({message:'登陆成功',duration:1000})
			}
		},
		vuex:{
			actions:{
				loginStatus:function({dispatch},data,password){
					dispatch('LOGIN_IN',data,password);
				}
			}
		},
		route:{
			data(transition){
				this.$set('from_path',transition.from.path)
			}
		}

	}
</script>

<style scoped lang='scss'>
	#loginIn{
		border: 5px solid #e2e2e2;
		border-width: 2px 1px;
		background-color: #fff;
		padding-top: .6rem;
		padding-left: .2rem;
		padding-right: .2rem;
		position: absolute;
		top:.7rem;
		label{
			font-size: .4rem;
			font-weight: 700;
			line-height: 50px;
			display: block;
			text-align: center;
		}
		.password{
			color: #2e2e2e;
			padding: 5px;
			font-size: .4rem;
			font-family: "monospace";
			width: 100%;
			box-sizing: border-box;
			display: block;
			margin:0 auto;
			border-radius: 5px;
			text-align: center;
			resize: none;
		}
		.logBtn{
			margin:5px 0;
		}
		.prompt{
			text-align: left;
			margin-top: 30px;
			font-size: .2rem;
		}
	}
</style>