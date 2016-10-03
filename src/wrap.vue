<template>
	<div>
		<router-view transition='wrap'></router-view>	
	</div>
</template>

<script>
	
</script>

<style scoped lang='scss'>
	.wrap-transition {
      transition: all .9s ease;
      opacity: 1;
    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .wrap-enter, .wrap-leave {
      opacity: 0;
    }
</style>