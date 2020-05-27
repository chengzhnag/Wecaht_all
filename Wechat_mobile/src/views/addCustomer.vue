<template>
	<div class="add-box">
		<van-form @submit="onSubmit" :show-error-message="false">
			<div class="content">
				<van-cell-group title="信息录入">
					<van-field
						clearable
						center
						size="large"
						required
						v-model="username"
						name="用户姓名"
						label="用户姓名"
						placeholder="请输入用户姓名"
						:rules="[{ required: true, message: '请填写用户姓名' }]"
					/>
					<div class="gap"></div>
					<van-field
						clearable
						center
						size="large"
						required
						v-model="username"
						name="用户电话"
						label="用户电话"
						placeholder="请输入用户电话"
						:rules="[{ required: true, message: '请填写用户电话' }]"
					/>
					<div class="gap"></div>
					<van-field
						clearable
						center
						size="large"
						required
						v-model="username"
						name="用户地址"
						label="用户地址"
						placeholder="请输入用户地址"
						:rules="[{ required: true, message: '请填写用户地址' }]"
					/>
					<div class="gap"></div>
					<van-field
						clearable
						center
						size="large"
						required
						v-model="username"
						name="水工姓名"
						label="水工姓名"
						placeholder="请输入水工姓名"
						:rules="[{ required: true, message: '请填写水工姓名' }]"
					/>
					<div class="gap"></div>
					<van-field
						clearable
						center
						size="large"
						required
						v-model="username"
						name="水工电话"
						label="水工电话"
						placeholder="请输入水工电话"
						:rules="[{ required: true, message: '请填写水工电话' }]"
					/>
					<div class="gap"></div>
					<van-field
						clearable
						center
						size="large"
						required
						v-model="username"
						name="质保卡号"
						label="质保卡号"
						placeholder="请输入质保卡号"
						:rules="[{ required: true, message: '请填写质保卡号' }]"
					/>
					<div class="gap"></div>
					<van-field
						clearable
						center
						size="large"
						required
						v-model="username"
						name="水工积分"
						label="水工积分"
						placeholder="请输入水工积分"
						:rules="[{ required: true, message: '请填写水工积分' }]"
					/>
					<div class="gap"></div>
					<van-field center clearable size="large" v-model="username" name="经销商" label="经销商" placeholder="请输入经销商" />
					<div class="gap"></div>
					<van-field center disabled size="large" v-model="username" name="上传时间" label="上传时间" />
					<div class="gap"></div>
					<van-field center disabled size="large" v-model="username" name="操作账号" label="操作账号" />
				</van-cell-group>
				<van-cell-group title="上传图片">
					<van-field name="uploader" input-align="left">
						<template #input>
							<van-uploader v-model="fileList" :after-read="afterRead" />
						</template>
					</van-field>
				</van-cell-group>
			</div>
			<div class="btn-box"><van-button block type="info" native-type="submit">提交</van-button></div>
		</van-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: '',
			fileList: [
				{
					url: 'https://img.yzcdn.cn/vant/leaf.jpg',
					status: 'uploading',
					message: '上传中...'
				},
				{
					url: 'https://img.yzcdn.cn/vant/tree.jpg',
					status: 'failed',
					message: '上传失败'
				}
			]
		};
	},
	mounted() {},
	methods: {
		onSubmit(values) {
			console.log('submit', values);
		},
		afterRead(file) {
			file.status = 'uploading';
			file.message = '上传中...';

			setTimeout(() => {
				file.status = 'failed';
				file.message = '上传失败';
			}, 1000);
		}
	}
};
</script>

<style scoped lang="scss">
.add-box {
	@include wh(100%, 100%);
	.van-form {
		@include wh(100%, 100%);
		.content {
			width: 100%;
			height: calc(100% - 60px);
			overflow: auto;
		}
		.btn-box {
			@include flexcenter();
			@include wh(100%, 60px);
			background-color: #fff;
			.van-button {
				margin: 0 16px;
				border-radius: 5px;
			}
		}
	}

	.gap {
		width: 100%;
		height: 10px;
		background-color: rgb(245, 245, 245);
	}
}
</style>
