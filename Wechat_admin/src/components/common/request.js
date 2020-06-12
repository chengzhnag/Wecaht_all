import axios from 'axios';
import store from '@/store';
import {
	Loading
} from 'element-ui';

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 8000
});
var loadingInstance;

service.interceptors.request.use(
	config => {
		console.log('config: ', config);
		let countdown = store.getters.countdown;
		if (!compare(countdown)) {
			store.commit('index/SET_COUNTDOWN');
		}
		loadingInstance = Loading.service({
			lock: true,
			text: 'Loading',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
		});
		if (store.getters.userInfo) {
			config.headers['zsid'] = store.getters.userInfo._id;
		}
		return config;
	},
	error => {
		console.log(error);
		return Promise.reject();
	}
);

service.interceptors.response.use(
	response => {
		loadingInstance.close();
		if (response.status === 200) {
			return response.data;
		} else {
			Promise.reject();
		}
	},
	error => {
		console.log(error.response);
		loadingInstance.close();
		if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
			return Promise.reject('请求超时, 请稍后重试'); // reject这个错误信息
		}
		return Promise.reject(error);
	}
);

function compare(time) {
	if (!time) return 0;
	let num = store.getters.num;
	let after = new Date().getTime() - time;
	after = parseInt(after/1000/60, 10);
	console.log(after);
	return Boolean(after >= num);
}

export default service;
