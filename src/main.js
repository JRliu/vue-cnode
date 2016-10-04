import Vue from 'vue'
import Wrap from './wrap'
import Welcome from './components/welcome'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

// 懒加载
import { Lazyload } from 'mint-ui';
import 'mint-ui/lib/lazyload/style.css'
Vue.use(Lazyload);

//重置样式
require('./css/reset.css');
//rem
require('./js/rem.js')
//过滤器
require('./js/filter.js')
//http请求
require('./js/vue-resource.js')
//iconfont
require('./css/iconfont/iconfont.css')

Vue.use(VueRouter)

const router=new VueRouter({
	hashbang: true,
    // history: true,
    // saveScrollPosition: true,
    // suppressTransitionError: true,
    transitionOnLoad:true
});
router.map({
	'/welcome':{
		component:Welcome
	},
	'/':{
		component(resolve){
			require(['./App.vue'],resolve)
		},
		subRoutes:{
			'/:tab':{
				name:'tab',
				component(resolve){
					require(['./components/topics.vue'],resolve)
				}
			},
			'/topic/:id':{
				name:'topic',
				component(resolve){
					require(['./components/content.vue'],resolve)
				}
			},
			'/topic/create':{
				component(resolve){
					require(['./components/create.vue'],resolve)
				}
			},
			'/user/:username':{
				name:'user',
				component(resolve){
					require(['./components/user.vue'],resolve)
				}
			},
			'/loginIn':{
				name:'loginIn',
				component(resolve){
					require(['./components/loginIn.vue'],resolve)
				}
			},
			'/message':{
				name:'message',
				component(resolve){
					require(['./components/message.vue'],resolve)
				}
			}
		}
	}
	
})

router.redirect({
	'/':'/welcome',
	'*':'/welcome'
})
router.alias({
	
})
router.start(Wrap,'#wrap')
// router.start(Welcome,'#app')