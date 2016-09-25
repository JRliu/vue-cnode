<template>
	<div id="gotop">
		<div class="btn"
			 v-show='show'
			 :style="{opacity:opacity,top:top,right:right,bottom:bottom,left:left}"
			 @click='scroll_To(scrollTo)'>
			<i class="iconfont  icon-huidingbu"></i>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
		    return{
		      show:false,
		      onscroll:false,
		      opacity:this.staticOpacity
		    }
		},
		props:{
			//按下goTop后滚动的目标位置
			scrollTo:{
				type:Number,
				default:0
			},
			//滚动screenNum个屏幕高度后出现goTop按钮
			screenNum:{
				type:Number,
				default:4
			},
			//30ms后到达
			step:{
				type:Number,
				default:30
			},
			scrollOpacity:{
				type:Number,
				default:0
			},
			staticOpacity:{
				type:Number,
				default:0.8
			},
			//位置参数4个
			top:{
				type:String
			},
			right:{
				type:String,
				default:'0px'
			},
			bottom:{
				type:String,
				default:'50px'
			},
			left:{
				type:String
			}
		},
		ready:function(){
			let _this=this
			let onScroll=function(){
					//滚动时半透明
			      _this.opacity=_this.scrollOpacity;
			      //静止后不透明
			      let old=document.documentElement.scrollTop||document.body.scrollTop;
			      let check=()=>{
			      	if(document.body.scrollTop||document.documentElement.scrollTop==old){
			      		_this.opacity=_this.staticOpacity;
			      	}
			      }
			      setTimeout(check,100)
			      //滚动到的scrolltop显示
			      if(document.documentElement.scrollTop||document.body.scrollTop>window.screen.height*_this.screenNum){
			          _this.show=true
			      }else{_this.show=false;}
				}
		// touchmove时透明度	
			window.addEventListener( 'touchstart', function( e ){
				window.addEventListener( 'touchmove', function( e ){
					onScroll();
					})
			})
		//onscroll时透明度
			window.onscroll=()=>{
				onScroll();
			}
		},
		methods:{
			scroll_To:function (tar_y){ 
			    var timer = setTimeout(()=>{  
			        var current_y = document.body.scrollTop||document.documentElement.scrollTop;
			        var step = this.step;//步长系数 即剩余的距离除以40 每1ms 移动一段距离  
			        if (tar_y>current_y){ //tar_y > current_y 即向下滚动  
			            var dist = Math.ceil((tar_y-current_y)/step)  
			            var next_y = current_y+dist  
			            if(next_y<tar_y){    
			                window.scrollTo(0,next_y);    
			                scroll_To(tar_y);
			            }  
			            else{  
			                window.scrollTo(0,tar_y)  
			            }  
			        }  
			        else{ //tar_y < current_y 即向上滚动  
			            var dist = Math.floor((tar_y-current_y)/step)  
			            var next_y = current_y+dist  
			            if(next_y>tar_y){  
			                window.scrollTo(0,next_y)  
			                this.scroll_To(tar_y)  
			            }  
			            else{  
			                window.scrollTo(0,tar_y)  
			            }  
			        }  
			    },1)  
			}  

		}
	}
	
	
	
</script>

<style scoped lang='scss'>
	.btn{
		width:.8rem;
		height:.8rem;
		line-height: .8rem;
		position: fixed;
		margin: 10px;
		border-radius: 50%;
		background-color: #666666;
		transition: all .2s ease;
		color: #fff;
		i{
			font-size: .5rem;
		}
	}
	
</style>