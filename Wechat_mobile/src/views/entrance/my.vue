<template>
	<div class="my-box">
		<div class="personal">
			<div class="top">
				<img src="http://f.zsjustn.top/save/2.jpg" alt="" @click="goToPersonal" />
				<span>张三</span>
			</div>
			<div class="bottom">
				<div class="like" v-for="(item, index) in texts" :key="index">
					<span class="key">{{ item }}</span>
					<span class="value">{{ index + 8 }}</span>
				</div>
			</div>
		</div>
		<div class="content">
			<van-cell-group><van-cell title="我的签到" icon="edit" is-link /></van-cell-group>
			<van-cell-group>
				<van-cell title="我的提醒" icon="chat-o" is-link />
				<van-cell title="我的收藏" icon="star-o" is-link />
			</van-cell-group>
			<van-cell-group>
				<van-cell title="用户组" icon="manager-o" is-link />
				<van-cell title="注册时间" icon="calender-o" is-link />
			</van-cell-group>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			texts: ['好友数', '回复数', '主题数', '积分']
		};
	},
	mounted() {},
	methods: {
		goToPersonal() {
			
		}
	}
};
</script>

<style scoped lang="scss">
.my-box {
	@include wh(100%, 100%);
	padding-top: 10px;
	overflow: auto;
	.personal {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin: 0 10px;
		background-color: #fff;
		border-radius: 6px;
		-moz-box-shadow: 0px 0px 1px #999;
		-webkit-box-shadow: 0px 0px 1px #999;
		box-shadow: 0px 0px 1px #999;
		.top {
			@include wh(100%, 120px);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-bottom: 1px solid #ebebeb;
			img {
				@include wh(60px, 60px);
				border-radius: 50%;
				overflow: hidden;
			}
			span {
				@include sc(14px, #333);
				font-weight: 500;
				margin-top: 8px;
			}
		}
		.bottom {
			display: flex;
			align-items: center;
			.like {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-right: 1px solid #ebebeb;
				height: 50px;
				.key {
					@include sc(14px, #333);
				}
				.value {
					@include sc(12px, #999);
					margin-top: 3px;
				}
				&:last-child {
					border-right: none;
				}
			}
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin: 20px 10px;
		.van-cell-group {
			margin-bottom: 16px;
			border-radius: 6px !important;
			overflow: hidden;
			&:last-child {
				margin-bottom: 0;
			}
			.van-cell {
				display: flex;
				align-items: center;
				min-height: 52px;
			}
		}
	}
}
</style>
