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

export const deleteUser = data => {
	return request({
		url: '/api/deleteUser',
		method: 'post',
		data
	});
};
export const upDateUser = data => {
	return request({
		url: '/api/upDateUser',
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

export const getUserList = query => {
	return request({
		url: '/api/getUserList',
		method: 'get',
		params: query
	});
};

export const getUserListByAdmin = query => {
	return request({
		url: '/admin/getUserListByAdmin',
		method: 'get',
		params: query
	});
};

export const setAdmin = data => {
	return request({
		url: '/api/setAdmin',
		method: 'post',
		data
	});
};
