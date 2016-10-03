<template>
	<div id="header">
		<i class="iconfont icon-meun"
		   @click='showSidebar'></i>
		<img src="https://cnodejs.org/public/images/cnodejs_light.svg" alt="cnode" class="logo">
		<span v-if='loginStatus' @click='create'
			  v-link='{path:"/topic/create"}'></span>
	</div>
</template>

<script>
	export default{
		methods:{
			create:function(){

			}
		},
		vuex:{
			actions:{
				showSidebar:function({dispatch}){
					dispatch('SHOW_SIDEBAR')
				}
			},
			getters:{
				loginStatus:function(state){
					return state.loginStatus;
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	#header{
		height:.7rem;
		line-height: .7rem;
		background-color: #2e2e2e;
		position: fixed;
		width: 100%;
		left:0;
		z-index: 9;
		color: #ffffff;
		text-align: center;
		.logo{
			display: block;
			position: absolute;
			float: left;
			height:50%;
			top:25%;
			left: 50%;
			margin-left: -.7rem;
		}
		i{
			font-size: .4rem;
			position: absolute;
			left: 2%;
			line-height: .7rem;
			&:before{
				position: relative;
				top:-.02rem;
			}
		}
		span{
			font-size: .6rem;
			font-weight: 700;
			line-height: .7rem;
			width: .6rem;
			position: absolute;
			right: 2%;
			vertical-align:text-top;
			font-family:'Microsoft YaHei';
			&:before{
				content:'+';
				position: relative;
				/*top:-0.05rem;*/
			}
		}
	}
	
</style>