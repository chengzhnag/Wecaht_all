<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i>
					登陆日志
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column align="center" prop="count" label="序号" width="50"></el-table-column>
				<el-table-column align="center" prop="userName" label="用户" width="220"></el-table-column>
				<el-table-column align="center" prop="landTime" label="登陆时间" width="220"></el-table-column>
				<el-table-column align="center" prop="landIp" label="登陆IP"></el-table-column>
				<el-table-column align="center" prop="permissions" label="权限" width="220"></el-table-column>
			</el-table>
			<div class="pagination"><el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalCount"></el-pagination></div>
		</div>
	</div>
</template>
<script>
import { getLoginLog } from '@/api';
export default {
	name: 'loginLog',
	data() {
		return {
			tableData: [],
			cur_page: 1,
			multipleSelection: [],
			totalCount: 0
		};
	},
	created() {
		this.getData();
	},
	computed: {},
	methods: {
		// 分页导航
		handleCurrentChange(val) {
			this.cur_page = val;
			this.getData();
		},

		getData() {
			let params = {
				pageNum: this.cur_page,
				pageSize: 10
			};
			getLoginLog(params)
				.then(res => {
					if (res.Code === 1) {
						let _data = res.Data;
						for (let i = 0; i < _data.length; i++) {
							_data[i].count = (this.cur_page - 1) * 10 + i + 1;
							_data[i].landTime = this.$utils.parseTime(_data[i].landTime);
							_data[i].permissions = _data[i].permissions === 1 ? ' 管理员' : '普通用户';
						}
						this.tableData = _data;
						this.totalCount = res.TotalCount;
					} else {
						this.$message.error(res.Message || '获取数据失败');
					}
				})
				.catch(err => {
					this.$message.error(err || '获取数据失败');
				});
		},
		handleSelectionChange(val) {
			console.log(3);
			this.multipleSelection = val;
		}
	}
};
</script>
<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
	display: inline-block;
}

.del-dialog-cnt {
	font-size: 16px;
	text-align: center;
}

.table {
	width: 100%;
	font-size: 14px;
}

.red {
	color: #ff0000;
}

.mr10 {
	margin-right: 10px;
}
</style>
