import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
	storageservice
} from './components/common/storageservice.js';
import utils from './components/common/util.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";

Vue.config.productionTip = false
Vue.use(ElementUI, {
	size: 'small'
});
Vue.prototype.$storage = storageservice;
Vue.prototype.$utils = utils;

Vue.filter("filterImg", function(url) {
	let flag = /(http|https)/.test(url);
	let host = process.env.VUE_APP_BASE_API;
	if (!flag && url) {
		if (!/data:image\/([^;]+).*/.test(url)) {
			if (url.indexOf('public') == 0) {
				url = host + url.replace('public', '');
			} else {
				url = host + url;
			}
		}
	}
	return url;
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
	let countdown = store.getters.countdown;
	if (compare(countdown)) {
		localStorage.clear();
		window.location.reload();
	}
	const role = store.getters.userInfo ? store.getters.userInfo.status : '';
	if (!role && to.path !== '/login') {
		next('/login');
	} else if (to.meta.permission) {
		// 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
		role === 1 ? next() : next('/403');
	} else {
		// 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
		if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
			Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
				confirmButtonText: '确定'
			});
		} else {
			next();
		}
	}
})

function compare(time) {
	if (!time) return 0;
	let num = store.getters.num;
	let after = new Date().getTime() - time;
	after = parseInt(after / 1000 / 60, 10);
	console.log(after);
	return Boolean(after >= num);
}

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
