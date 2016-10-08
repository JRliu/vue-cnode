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
				component:require('./components/content.vue')
			},
			'/topic/create':{
				name:'create',
				component:require('./components/create.vue')
			},
			'/user/:username':{
				name:'user',
				component:require('./components/user.vue')
			},
			'/loginIn':{
				name:'loginIn',
				component:require('./components/loginIn.vue')
			},
			'/message':{
				name:'message',
				component:require('./components/message.vue')
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