<template>
	<div class="entrance-box">
		<div class="alone" :class="'status' + item.status" v-for="(item, index) in menulist" :key="index" @click="enterMenu(item)">
			<div class="center">
				<span class="name">{{ item.name }}</span>
				<span class="desc van-ellipsis">{{ item.desc }}</span>
			</div>
			<div class="right"><van-icon color="#fff" name="arrow" /></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			menulist: [
				{
					name: '业主查询',
					desc: '通过手机号精准查询业主信息',
					status: '3',
					router: 'clock'
				},
				{
					name: '添加业主',
					desc: '根据表单完整填写信息, 添加业主',
					status: '1',
					router: 'addCustomer'
				},
				{
					name: '个人信息',
					desc: '查看自己的信息并编辑',
					status: '2',
					router: 'citymonitor'
				}
			]
		};
	},
	watch: {},
	mounted() {},
	methods: {
		enterMenu(item) {
			this.$router.push(item.router);
		}
	}
};
</script>

<style scoped lang="scss">
.entrance-box {
	@include wh(100%, 100%);
	padding-top: 8px;
	padding-bottom: 35px;
	overflow: auto;

	.alone {
		display: flex;
		flex: 1;
		margin: 0 18px;
		height: 90px;
		overflow: hidden;
		border-radius: 8px;
		background: #fff;
		margin-bottom: 20px;
		box-shadow: 4px 4px 1px #ececec;

		.center {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: center;
			height: 100%;
			margin-left: 20px;

			.name {
				@include sc(19px, #fff);
				margin-bottom: 6px;
			}

			.desc {
				@include sc(14px, #fff);
			}
		}

		.right {
			@include flexcenter;
			@include wh(30px, 100%);
		}

		&:active {
			background-color: rgb(248, 248, 248);
		}
	}
	.status1 {
		@include bis('../../assets/image/red.png');
	}

	.status2 {
		@include bis('../../assets/image/green.png');
	}

	.status3 {
		@include bis('../../assets/image/blue.png');
	}

	.status4 {
		@include bis('../../assets/image/purple.png');
	}

	.status5 {
		@include bis('../../assets/image/status5.png');
	}

	.status6 {
		@include bis('../../assets/image/status6.png');
	}
}
</style>
