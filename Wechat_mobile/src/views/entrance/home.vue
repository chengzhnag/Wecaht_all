<template>
	<div class="home-box">
		<div class="swipe-box">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="(image, index) in images" :key="index"><img v-lazy="image" /></van-swipe-item>
			</van-swipe>
		</div>
		<div class="tag-box">
			<van-tag plain @click="goToAdd">去添加</van-tag>
			<van-tag plain>张三</van-tag>
			<van-tag plain>精品原创</van-tag>
			<van-tag plain>资源教程</van-tag>
			<van-tag plain>影音</van-tag>
		</div>
		<div class="content">
			<div class="item" v-for="(item, index) in 4" :key="index">
				<div class="top">
					<div class="left"><img src="http://f.zsjustn.top/save/2.jpg" alt="" /></div>
					<div class="right">
						<div class="t">[开箱]坚果Pro3开箱照小赛</div>
						<div class="b">
							<div class="mes">
								坚果手机
								<span style="margin: 0 6px;"></span>
								2019-11-19 12:55
							</div>
							<div class="len">
								<van-icon name="eye" color="#999" />
								142214
								<span style="margin: 0 5px;"></span>
								<van-icon name="chat" color="#999" />
								456
							</div>
						</div>
					</div>
				</div>
				<div class="bottom"><img src="http://f.zsjustn.top/save/2.jpg" alt="" /></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			images: ['http://f.zsjustn.top/save/4.jpg', 'http://f.zsjustn.top/save/3.jpg']
		};
	},
	mounted() {},
	methods: {
		goToAdd() {
			this.$router.push('addCustomer');
		}
	}
};
</script>

<style scoped lang="scss">
.home-box {
	@include wh(100%, 100%);
	background-color: #fff;
	padding-top: 10px;
	overflow: auto;

	.swipe-box {
		max-height: 170px;
		display: flex;
		flex: 1;
		margin: 0 14px;
		border-radius: 6px;
		overflow: hidden;
		-moz-box-shadow: 0px 0px 1px #999;
		-webkit-box-shadow: 0px 0px 1px #999;
		box-shadow: 0px 0px 1px #999;
		.my-swipe {
			display: flex;
			flex: 1;
			max-height: 170px;
			.van-swipe-item {
				color: #fff;
				font-size: 20px;
				line-height: 170px;
				max-height: 170px;
				text-align: center;
				img {
					object-fit: cover;
				}
			}
		}
	}
	.tag-box {
		display: flex;
		flex: 1;
		margin: 14px;
		margin-top: 30px;
		justify-content: space-between;
		align-items: center;
		.van-tag {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 64px;
			height: 22px;
			font-size: 12px;
			color: #333;
			&:active {
				background-color: rgb(240, 240, 240);
			}
		}
	}

	.content {
		@include wh(100%, auto);
		border-top: 1px solid #ebebeb;
		.item {
			display: flex;
			flex: 1;
			flex-direction: column;
			padding: 18px 14px;
			border-bottom: 1px solid #ebebeb;
			.top {
				display: flex;
				align-items: center;
				@include wh(100%, auto);
				.left {
					@include wh(45px, 45px);
					border-radius: 50%;
					overflow: hidden;
					margin-right: 14px;
					img {
						@include wh(100%, 100%);
					}
				}
				.right {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.t {
						@include sc(14px, #333);
						font-weight: bold;
					}
					.b {
						@include sc(12px, #999);
						display: flex;
						align-items: center;
						justify-content: space-between;

						.len {
							display: flex;
							align-items: center;
							.van-icon {
								margin-right: 3px;
							}
						}
					}
				}
			}
			.bottom {
				@include wh(100%, 170px);
				border-radius: 4px;
				overflow: hidden;
				margin-top: 10px;
				img {
					@include wh(100%, 100%);
					object-fit: cover;
				}
			}
		}
	}
}
</style>
