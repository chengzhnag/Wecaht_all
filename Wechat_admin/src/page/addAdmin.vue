<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-s-platform"></i>
					增加管理员
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box" style="width: 100%;">
				<el-form ref="form" :model="form" :rules="rules" label-width="80px">
					<el-form-item label="选择用户" prop="value">
						<el-select v-model="form.value" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
							<el-option v-for="item in options" :key="item._id" :label="item.nickname" :value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item><el-button type="primary" @click="onSubmit('form')">提交</el-button></el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
import { getUserList, setAdmin } from '@/api';
export default {
	name: 'addadmin',
	data: function() {
		return {
			options: [],
			loading: false,
			form: {
				value: []
			},
			rules: {
				value: [{ required: true, message: '请选择用户', trigger: 'change' }]
			}
		};
	},
	mounted() {},
	computed: {
		userInfo() {
			return this.$store.getters.userInfo || '';
		}
	},
	activated() {},
	methods: {
		remoteMethod(query) {
			if (query !== '') {
				this.loading = true;
				this.getData(query, res => {
					this.loading = false;
					this.options = res.Data;
				});
			} else {
				this.options = [];
			}
		},
		onSubmit(formName) {
			this.$refs[formName].validate(valid => {
				let ids = this.form.value.join(',');
				setAdmin({ ids: ids })
					.then(res => {
						if (res.Code === 1) {
							this.$refs[formName].resetFields();
							this.form.value = [];
							this.$message.success('设置管理员成功');
						} else {
							this.$message.error(res.Message);
						}
					})
					.catch(err => {
						this.$message.error(err || 'setAdmin error');
					});
			});
		},
		getData(k, cal) {
			getUserList({ keyword: k })
				.then(res => {
					if (res.Code === 1) {
						cal && cal(res);
					} else {
						this.loading = false;
						this.$message.error(res.Message);
					}
				})
				.catch(err => {
					this.loading = false;
					this.$message.error(err || 'getUserList error');
				});
		}
	},
	beforeDestroy() {
		console.log('beforeDestroy');
	},
	destroyed() {
		console.log('destroyed');
	}
};
</script>
<style></style>
