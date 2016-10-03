<template>
	<div id="welcome">
	<img src="https://cnodejs.org/public/images/cnodejs.svg" alt="cnode" class="logo slideDown">
	</div>
</template>

<script>
	export default{
		route:{
			data:function(){
				let fn=()=>{
					this.$route.router.go('/all')
				}
				setTimeout(fn,3000)
			}
		}
	}
</script>

<style scoped lang='scss'>
	#welcome{
		position: fixed;
		top:0;
		height: 100%;
		width: 100%;
		text-align: center;
		background-color: #e2e2e2;
		z-index: 99;
		.logo{
			width: 80%;
			height: 30%;
			position: absolute;
			left: 10%;
			top: -30%;
			/*left:50%;
			margin-left:-100px;*/
		}
	}
	


	.slideDown{
		animation-name: slideDown;
		-webkit-animation-name: slideDown;	

		animation-duration: 1s;	
		-webkit-animation-duration: 1s;

		animation-timing-function: ease;	
		-webkit-animation-timing-function: ease;

		animation-delay:1s;	
		-webkit-animation-delay:1s;	
		animation-fill-mode: forwards;
		visibility: visible !important;						
	}

	@keyframes slideDown {
		0% {
			transform: translateY(0%);
		}
		35%{
			transform: translateY(208%);
		}
		65%{
			transform: translateY(160%);
		}
		80%{
			transform: translateY(204%);
		}
		95%{
			transform: translateY(190%);
		}			
		100% {
			transform: translateY(200%);
		}		
	}

	@-webkit-keyframes slideDown {
		0% {
			transform: translateY(0%);
		}
		35%{
			transform: translateY(208%);
		}
		65%{
			transform: translateY(160%);
		}
		80%{
			transform: translateY(204%);
		}
		95%{
			transform: translateY(190%);
		}			
		100% {
			transform: translateY(200%);
		}	
	}
</style>