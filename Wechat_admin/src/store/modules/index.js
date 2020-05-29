import {
	storageservice
} from '@/components/common/storageservice.js';

const state = {
	userInfo: storageservice.read('userInfo') || null
}

const mutations = {
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo;
		storageservice.write('userInfo', userInfo);
	}
}

const actions = {

}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
