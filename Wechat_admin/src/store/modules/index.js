import {
	storageservice
} from '@/components/common/storageservice.js';

const state = {
	userInfo: storageservice.read('userInfo') || null,
	editorData: null,
	showRouteAdmin: ['addadmin', 'alluserlist']
}

const mutations = {
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo;
		storageservice.write('userInfo', userInfo);
	},
	SET_EDITORDATA: (state, editorData) => {
		state.editorData = editorData;
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
