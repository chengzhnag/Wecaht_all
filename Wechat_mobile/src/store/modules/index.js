import storage from '@/utils/localstorage';
import {
	getAuthToken,
	getUserInfo
} from '../../api/wx.js';
import {
	register
} from '../../api/index.js';
import {
	getUrlKey,
	formatDate
} from '@/utils/util.js'

const state = {
	userInfo: storage.read('userInfo') || null,
	token: '',
	openId: ''
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token;
		storage.write('wx_token', token);
	},
	SET_OPENID: (state, openId) => {
		state.openId = openId;
		storage.write('wx_openId', openId);
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo;
		storage.write('userInfo', userInfo);
	}
}

const actions = {
	getUserInfoByToken({
		commit,
		state
	}) {
		const _code = getUrlKey('code');
		return new Promise((resolve, reject) => {
			if (state.token && state.openId) {
				// 获取用户数据
				getUserInfo({
					openid: state.openId
				}).then(resp => {
					if (resp.Code == 1) {
						let _data = resp.Data;
						commit('SET_USERINFO', _data);
						resolve(_data);
					} else {
						reject(resp.Message);
						commit('SET_USERINFO', '');
					}
				}).catch((err) => {
					reject(err);
					commit('SET_USERINFO', '');
				})
				return;
			}
			// 获取token
			getAuthToken({
				code: _code
			}).then(response => {
				if (response.Code) {
					commit('SET_TOKEN', response.Data.access_token);
					commit('SET_OPENID', response.Data.openid);
					// 获取用户数据
					getUserInfo({
						openid: response.Data.openid
					}).then(resp => {
						if (resp.Code == 1) {
							let _data = resp.Data;
							commit('SET_USERINFO', _data);
							resolve(_data)
						} else {
							reject(resp.Message);
							commit('SET_USERINFO', '');
						}
					}).catch(error => {
						reject(error);
						commit('SET_USERINFO', '');
					})
				} else {
					reject(response.Message)
					commit('SET_USERINFO', '');
				}
			}).catch(error => {
				console.log(error);
				reject(error)
				commit('SET_USERINFO', '');
			})
		});
	},
	register({
		commit
	}, params) {
		return new Promise((resolve, reject) => {
			register(params).then(response => {
				console.log(response);
				if (response.Code == 1) {
					let _data = response.Data;
					commit('SET_USERINFO', _data);
				}
				resolve(response);
			}).catch(error => {
				reject(error);
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
