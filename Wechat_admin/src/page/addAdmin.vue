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
					<el-form-item label="选择用户">
						<el-select
							v-model="form.value"
							prop="us"
							multiple
							filterable
							remote
							reserve-keyword
							placeholder="请输入关键词"
							:remote-method="remoteMethod"
							:loading="loading"
						>
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item><el-button type="primary" @click="onSubmit('form')">提交</el-button></el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'addadmin',
	data: function() {
		return {
			options: [],
			list: [],
			loading: false,
			states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut'],
			form: {
				value: []
			},
			rules: {
				us: [{ required: true, message: '请选择用户', trigger: 'change' }]
			}
		};
	},
	mounted() {
		this.list = this.states.map(item => {
			return { value: `value:${item}`, label: `label:${item}` };
		});
	},
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
				setTimeout(() => {
					this.loading = false;
					this.options = this.list.filter(item => {
						return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
					});
				}, 200);
			} else {
				this.options = [];
			}
		},
		onSubmit(formName) {
			console.log('submit!');
			this.$refs[formName].validate(valid => {});
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
