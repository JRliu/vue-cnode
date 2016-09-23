import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		topics:'',
		page:1,
		showSidebar:false,
		refreshTopics:false,
		//登陆状态
		loginStatus:localStorage.getItem('auto-login')||false,
		userData:JSON.parse( localStorage.getItem('userData') )||'',
		accessToken: localStorage.getItem('accessToken') ||''
		
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
		CLEAR_TOPICS(state){
			state.topics=''
		},
		REFRESH_END(state){
			state.refreshTopics=false;
		},
		REFRESH_START(state){
			state.refreshTopics=true;
		},
		LOGIN_IN(state,data){
			state.loginStatus=true;
			state.userData=data;
		},
		LOGIN_OUT(state,data){
			state.loginStatus=false;
		}
	}
})