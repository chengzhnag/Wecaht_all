<template>
	<div class="entrance-box">
		<div class="content">
			<keep-alive><router-view></router-view></keep-alive>
		</div>
		<van-tabbar v-model="active" safe-area-inset-bottom placeholder @change="changeTab">
			<van-tabbar-item icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item icon="manager-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 0
		};
	},
	watch: {
		$route(to, from) {
			console.log('to: ', to);
			console.log('from: ', from);
		}
	},
	mounted() {
		console.log(this.$route);
		let _name = this.$route.name;
		if (_name == 'Entrance/My') {
			this.active = 1;
		} else {
			this.active = 0;
		}
	},
	methods: {
		// 底部tabbar的切换事件
		changeTab(e) {
			console.log(e);
			let _name = 'Entrance/Home';
			if (e) {
				_name = 'Entrance/My';
			}
			this.$router.replace({
				name: _name
			});
		}
	}
};
</script>

<style scoped lang="scss">
.entrance-box {
	@include wh(100%, 100%);
	.content {
		width: 100%;
		height: calc(100% - 50px);
	}
}
</style>
