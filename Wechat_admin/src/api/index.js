import request from '@/components/common/request'

export const login = data => {
	return request({
		url: '/admin/login',
		method: 'post',
		data
	});
};

export const uploadUrl = process.env.VUE_APP_BASE_API + '/admin/upload';

export const addCustomer = data => {
	return request({
		url: '/admin/addCustomer',
		method: 'post',
		data
	});
};

export const getLoginLog = query => {
	return request({
		url: '/admin/getLoginLog',
		method: 'get',
		params: query
	});
};

export const getOwnerList = query => {
	return request({
		url: '/admin/getOwnerList',
		method: 'get',
		params: query
	});
};

export const deleteOwner = data => {
	return request({
		url: '/admin/deleteOwner',
		method: 'post',
		data
	});
};

export const updateOwner = data => {
	return request({
		url: '/admin/updateOwner',
		method: 'post',
		data
	});
};

export const getOperationLog = query => {
	return request({
		url: '/admin/getOperationLog',
		method: 'get',
		params: query
	});
};
