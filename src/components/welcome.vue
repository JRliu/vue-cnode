<template>
	<div id="welcome">
		<img src="https://cnodejs.org/public/images/cnodejs.svg" alt="cnode js" class="logo bounceInDown">
		<img src="../assets/logo.png" alt="vue" class="vue rollIn">
	</div>
</template>

<script>
	export default{
		route:{
			data:function(){
				let fn=()=>{
					this.$route.router.go('/all')
				}
				setTimeout(fn,2300)
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
			display: block;
			height: 10%;
			margin:auto;
			position: relative;
			top: 30%;
		}
		.vue{
			height: 20%;
			display: block;
			margin: auto;
			position: relative;
			top: 35%;
		}
	}

	@-webkit-keyframes bounceInDown {
		from, 60%, 75%, 90%, to {
			-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
		}

		0% {
			opacity: 0;
			-webkit-transform: translate3d(0, -3000px, 0);
			transform: translate3d(0, -3000px, 0);
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(0, 25px, 0);
			transform: translate3d(0, 25px, 0);
		}

		75% {
			-webkit-transform: translate3d(0, -10px, 0);
			transform: translate3d(0, -10px, 0);
		}

		90% {
			-webkit-transform: translate3d(0, 5px, 0);
			transform: translate3d(0, 5px, 0);
		}

		to {
			-webkit-transform: none;
			transform: none;
		}
	}

	@keyframes bounceInDown {
		from, 60%, 75%, 90%, to {
			-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
		}

		0% {
			opacity: 0;
			-webkit-transform: translate3d(0, -3000px, 0);
			transform: translate3d(0, -3000px, 0);
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(0, 25px, 0);
			transform: translate3d(0, 25px, 0);
		}

		75% {
			-webkit-transform: translate3d(0, -10px, 0);
			transform: translate3d(0, -10px, 0);
		}

		90% {
			-webkit-transform: translate3d(0, 5px, 0);
			transform: translate3d(0, 5px, 0);
		}

		to {
			-webkit-transform: none;
			transform: none;
		}
	}

	.bounceInDown {
		-webkit-animation-name: bounceInDown;
		animation-name: bounceInDown;

		animation-duration: 1s;	
		-webkit-animation-duration: 1s;

		animation-timing-function: ease;	
		-webkit-animation-timing-function: ease;
	}

	@-webkit-keyframes rollIn {
		0% {
			visibility: visible;
			opacity: 0;
			-webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
			transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
		}

		100% {
			visibility: visible;
			opacity: 1;
			-webkit-transform: none;
			transform: none;
		}
	}

	@keyframes rollIn {
		from {
			visibility: visible;
			opacity: 0;
			-webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
			transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
		}

		to {
			visibility: visible;
			opacity: 1;
			-webkit-transform: none;
			transform: none;
		}
	}

	.rollIn {
		visibility: hidden;

		-webkit-animation-name: rollIn;
		animation-name: rollIn;

		animation-duration: 1s;	
		-webkit-animation-duration: 1s;

		animation-timing-function: ease;	
		-webkit-animation-timing-function: ease;

		animation-delay:1s;	
		-webkit-animation-delay:1s;

		animation-fill-mode:forwards;
		-webkit-animation-fill-mode:forwards;
	}
</style>