<template>
	<div id="header">
		<i class="iconfont icon-meun"
		   @click='showSidebar'></i>
		<img src="https://cnodejs.org/public/images/cnodejs_light.svg" alt="" class="logo">
		<span v-if='loginStatus' @click='create'
			  v-link='{path:"/topic/create"}'>+</span>
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
		max-width: 640px;
		z-index: 9;
		color: #ffffff;
		.logo{
			display: block;
			position: absolute;
			float: left;
			height:50%;
			top:25%;
			left: 15%;
		}
		i{
			font-size: .6rem;
			position: absolute;
			left: 2%;
			line-height: .675rem;
			&:before{
				position: relative;
			}
		}
		span{
			font-size: .7rem;
			line-height: .65rem;
			width: .6rem;
			position: absolute;
			right: 2%;
		}
	}
	
</style>