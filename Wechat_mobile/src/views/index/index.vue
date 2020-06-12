<template>
	<div class="box">正在获取微信授权...</div>
</template>

<script>
import { getUrlKey } from '@/utils/util.js';
export default {
	data() {
		return {};
	},
	mounted() {
		console.log(process.env.NODE_ENV);
		if (process.env.NODE_ENV == 'development') {
			const _code = getUrlKey('code');
			this.$store.commit('index/SET_TOKEN', _code);
			this.$store.commit('index/SET_OPENID', _code);
		}
		this.funcGetToken();
	},
	methods: {
		funcGetToken() {
			this.$store
				.dispatch('index/getUserInfoByToken')
				.then(res => {
					console.log(res);
					this.$router.push({
						name: 'Entrance'
					});
				})
				.catch(err => {
					console.log(err);
					this.$router.push({
						path: '/register'
					});
				});
		}
	}
};
</script>

<style scoped lang="scss">
.box {
	@include wh(100%, 100%);
	display: flex;
	justify-content: center;
	align-items: center;
	@include sc(18px, #333);
}
</style>
