import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'


//重置样式
require('./css/reset.css');
//rem
require('./js/rem.js')
//过滤器
require('./js/filter.js')
//路由
require('./js/vue-resource.js')
//iconfont
require('./css/iconfont/iconfont.css')

Vue.use(VueRouter)

const router=new VueRouter({
	hashbang: true
    // history: true,
    // saveScrollPosition: true,
    // suppressTransitionError: true,
    // transitionOnLoad:true
});
router.map({
	'/:tab':{
		name:'tab',
		component(resolve){
					require(['./components/topics.vue'],resolve)
				},
		subRoutes:{
			'/:page':{
				name:'page',
				component(resolve){
					require(['./components/topics.vue'],resolve)
				}
			}
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
})

router.redirect({
	'*':'/all'
})
router.alias({
	
})
router.start(App,'#app')