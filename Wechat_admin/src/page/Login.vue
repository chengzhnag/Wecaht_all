<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">后台管理系统</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
				<el-form-item prop="mobile">
					<el-input v-model="ruleForm.mobile" placeholder="mobile"><el-button slot="prepend" icon="el-icon-lx-people"></el-button></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
						<el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
					</el-input>
				</el-form-item>
				<div class="login-btn"><el-button type="primary" @click="submitForm('ruleForm')">登录</el-button></div>
				<p class="login-tips">Tips : 通过手机号登录, 请输入正确的密码。</p>
			</el-form>
		</div>
	</div>
</template>
<script>
import util from '@/components/common/util.js';
import { Message } from 'element-ui';
import { login } from '@/api';
export default {
	data: function() {
		return {
			ruleForm: {
				mobile: '',
				password: ''
			},
			rules: {
				mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: util.validMobile, trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
		};
	},
	methods: {
		submitForm(formName) {
			let _this = this;
			this.$refs[formName].validate(valid => {
				if (valid) {
					let password = util.passwrodMd5(this.ruleForm.password);
					let params = {
						password,
						mobile: this.ruleForm.mobile
					};
					login(params)
						.then(res => {
							if (res.Code === 1) {
								let _code = res.Data.registerExamine;
								switch (_code) {
									case 0:
										Message('注册申请已被拒绝, 请联系管理员');
										break;
									case 1:
										Message('注册申请正在审核中, 请耐心等待');
										break;
									case 2:
										Message.success(res.Message);
										this.$store.commit('index/SET_USERINFO', res.Data);
										_this.$router.push('/dashboard');
										break;
									default:
										break;
								}
							} else {
								Message.error(res.Message);
							}
						})
						.catch(err => {
							Message.error(err || 'login error');
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
};
</script>
<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-image: url(../assets/img/login-bg.jpg);
	background-size: 100%;
}

.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}

.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}

.ms-content {
	padding: 30px 30px;
}

.login-btn {
	text-align: center;
}

.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}

.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}
</style>
