<template>
	<div id="mask"
		 @click='hideSidebar'>
		
	</div>
</template>

<script>
	export default{
		vuex:{
			actions:{
				hideSidebar:function({dispatch}){
					dispatch('HIDE_SIDEBAR')
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	#mask{
		position:fixed;
		top: 0;
		left:0;
		height: 100%;
		width: 100%;
		background-color: #000;
		opacity: 0.5;
		z-index: 99;
	}
</style>
