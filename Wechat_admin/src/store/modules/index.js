import {
	storageservice
} from '@/components/common/storageservice.js';

const state = {
	userInfo: storageservice.read('userInfo') || null,
	countdown: storageservice.read('countdown') || null,
	continuedNum: 60,  // minute
	editorData: null,
	showRouteAdmin: ['addadmin', 'alluserlist']
}

const mutations = {
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo;
		let countdown = new Date().getTime();
		state.countdown = countdown;
		storageservice.write('countdown', countdown);
		storageservice.write('userInfo', userInfo);
	},
	SET_COUNTDOWN: (state) => {
		let countdown = new Date().getTime();
		state.countdown = countdown;
		storageservice.write('countdown', countdown);
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
