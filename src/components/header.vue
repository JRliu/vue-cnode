<template>
	<div id="header">
		<span class="title">{{header_title|tabNameCn}}</span>
		<i class="iconfont icon-meun"
		   @click='showSidebar'></i>
		<span class='create' v-if='loginStatus'
			  v-link='{path:"/topic/create"}'></span>
	</div>
</template>

<script>
	export default{
		computed:{
			header_title:function(){
				return this.$route
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
		span.title{
			font-size: .35rem;
			line-height: .7rem;
			text-align: center;
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
		span.create{
			font-size: .6rem;
			font-weight: 700;
			line-height: .7rem;
			width: .6rem;
			position: absolute;
			right: 2%;
			&:before{
				content:'+';
				position: relative;
				/*top:-0.05rem;*/
			}
		}
	}
	
</style>