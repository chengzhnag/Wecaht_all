
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
