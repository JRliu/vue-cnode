import Vue from 'vue'
import VueResource from 'vue-resource'
import { Indicator } from 'mint-ui'
import 'mint-ui/lib/indicator/style.css'

Vue.use(VueResource)
//请求时动画
Vue.http.interceptors.push((request, next) => {
    Indicator.open({
	  text: '加载中...',
	  spinnerType: 'fading-circle'
	});
    next((response) => {
    	Indicator.close();
    });
});

