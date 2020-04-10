
import request from '@/utils/request'

export const getAuthToken = query => {
    return request({
        url: '/api/getToken',
        method: 'get',
        params: query
    });
};


export const getUserInfo = query => {
    return request({
        url: '/api/getUserInfo',
        method: 'get',
        params: query
    });
};