<template>
	<div class="box">正在获取微信授权...</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		this.$store
			.dispatch('index/getUserInfoByToken')
			.then(res => {
				console.log(res);
				// this.$router.push({
				// 	path: '/entrance'
				// });
				this.$router.push({
					name: 'Entrance/Home'
				});
			})
			.catch(err => {
				console.log(err);
				this.$router.push({
					path: '/register'
				});
			});
	},
	methods: {}
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
