<template>
	<div class="box">{{ showText }}</div>
</template>

<script>
import { getUrlKey } from '@/utils/util.js';
export default {
	data() {
		return {
			showText: '正在获取微信授权...'
		};
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
					let _code = res.registerExamine;
					switch (_code) {
						case 0:
							this.showText = '注册申请已被拒绝, 请联系管理员';
							break;
						case 1:
							this.showText = '注册申请正在审核中, 请耐心等待';
							break;
						case 2:
							this.$router.push({
								name: 'Entrance'
							});
							break;
						default:
							this.showText = '注册申请正在审核中, 请耐心等待';
							break;
					}
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
