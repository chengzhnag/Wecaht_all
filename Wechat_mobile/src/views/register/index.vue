<template>
	<div class="register-box">
		<van-icon name="vip-card-o" size="56px" />
		<van-form @submit="onSubmit" class="form-box" :show-error-message="false">
			<van-field v-model="nickname" name="姓名" label="姓名" placeholder="请输入真实姓名" :rules="[{ required: true, message: '请输入真实姓名' }]" />
			<van-field
				v-model="mobile"
				name="手机号"
				type="number"
				maxlength="11"
				label="手机号"
				placeholder="请输入手机号"
				:rules="[{ required: true, message: '请填写手机号' }, { validator: validMobile, message: '手机号格式错误' }]"
			/>
			<van-field v-model="password" type="password" name="密码" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />
			<van-field
				v-model="againPassword"
				type="password"
				name="确认密码"
				label="确认密码"
				placeholder="请再次输入密码"
				:rules="[{ required: true, message: '请再次填写密码' }]"
			/>
			<div class="btn"><van-button block type="info" native-type="submit">注册</van-button></div>
		</van-form>
	</div>
</template>

<script>
import { passwrodMd5, validMobile, showLoading, closeLoading } from '@/utils/validate.js';
export default {
	data() {
		return {
			mobile: '',
			password: '',
			againPassword: '',
			nickname: ''
		};
	},
	computed: {
		validMobile() {
			return p => {
				return validMobile(p);
			};
		}
	},
	mounted() {},
	methods: {
		onSubmit(values) {
			console.log('submit', values);
			if (this.password != this.againPassword) {
				this.$toast('两次输入密码不同.');
				return;
			}
			let params = {
				openId: this.$store.getters.openId || '',
				mobile: this.mobile,
				nickname: this.nickname,
				password: passwrodMd5(this.password)
			};
			showLoading(this);
			this.$store
				.dispatch('index/register', params)
				.then(res => {
					console.log(res);
					closeLoading(this);
					if (res.Code) {
						this.$router.go(-1);
					} else {
						this.$toast(res.Message || '注册失败!');
					}
				})
				.catch(err => {
					closeLoading(this);
					this.$toast(err || '提交表单失败, 请稍后重试.');
				});
		}
	}
};
</script>

<style scoped lang="scss">
.register-box {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	padding: 0 20px;
	background-color: #fff;
	padding-bottom: 60px;
	.form-box {
		width: 100%;
		margin-top: 20px;
		/deep/ .van-cell {
			border: 1px solid #ebebeb;
			border-top: none;
		}
		/deep/ .van-cell:first-child {
			border-top: 1px solid #ebebeb;
		}
		/deep/ .van-cell:not(:last-child)::after {
			content: none;
		}
		.btn {
			margin-top: 30px;
			.van-button {
				border-radius: 5px;
			}
		}
	}
}
</style>
