import axios from 'axios';
import store from '@/store';
import {
	Toast
} from 'vant';


const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 8000
});

service.interceptors.request.use(
	config => {
		Toast.loading({
			message: '加载中...',
			forbidClick: true,
			duration: 15000
		});
		console.log('config: ', config);
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
		Toast.clear();
		if (response.status === 200) {
			return response.data;
		} else {
			Promise.reject();
		}
	},
	error => {
		Toast.clear();
		console.log(error.response);
		if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
			return Promise.reject('请求超时, 请稍后重试'); // reject这个错误信息
		}
		return Promise.reject(error);
	}
);

export default service;
