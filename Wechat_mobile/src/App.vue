<template>
	<div id="app">
		<keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	mounted() {
		this.$router.afterEach((to, from) => {
			if (to.meta && to.meta.title) {
				document.title = to.meta.title;
			}
		});
	},
	methods: {}
};
</script>
<style lang="scss">
#app {
	overflow: hidden;
}
</style>
