import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		topics:'',
		page:1,
		showSidebar:false,
		refreshTopics:false,
		getTopics:false,
		//登陆状态
		loginStatus:localStorage.getItem('auto-login')||false,
		userData:JSON.parse( localStorage.getItem('userData') )||'',
		accessToken: localStorage.getItem('accessToken') ||'',
		tabsName:[
					{name:'首页',en:'all',icon:'quanbu'},
					{name:'精华',en:'good',icon:'jinghua'},
					{name:'分享',en:'share',icon:'fenxiang'},
					{name:'问答',en:'ask',icon:'tiwen'},
					{name:'招聘',en:'job',icon:'zhaopin'},
				]
	},
	mutations:{
		SAVE_TOPICS(state,data){
			state.topics=data;
			state.page=1;
			state.page++;
		},
		MORE_TOPICS(state,data){
			state.page++;
			state.topics=state.topics.concat(data);
		},
		SHOW_SIDEBAR(state){
			state.showSidebar=true;
			document.body.style.overflow='hidden';
		},
		HIDE_SIDEBAR(state){
			state.showSidebar=false;
			document.body.style.overflow='auto';
		},
		REFRESH_START(state){
			state.refreshTopics=!state.refreshTopics;
		},
		LOGIN_IN(state,data,password){
			state.loginStatus=true;
			state.userData=data;
			state.accessToken=password;
		},
		LOGIN_OUT(state,data){
			state.loginStatus=false;
		},
		GET_TOPICS(state,data){
			state.getTopics=!state.getTopics;
		}
	}
})