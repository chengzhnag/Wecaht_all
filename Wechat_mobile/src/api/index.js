import request from '@/utils/request'

export const getData = query => {
	console.log(query);
	return request({
		url: '/api',
		method: 'get',
		params: query
	});
};

export const register = data => {
	return request({
		url: '/api/register',
		method: 'post',
		data
	});
};

export const uploadUrl = process.env.VUE_APP_BASE_API + '/admin/upload';

export const fileUpload = data => {
	return request({
		url: '/admin/upload',
		method: 'post',
		data,
		headers: {
			// 修改请求头
			"Content-Type": "multipart/form-data"
		}
	});
};

export const addCustomer = data => {
	return request({
		url: '/admin/addCustomer',
		method: 'post',
		data
	});
};
