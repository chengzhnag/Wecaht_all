<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i>
					数据查询
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="select_word" placeholder="输入查询内容: (水工电话/业主电话/经销商/地址等）" class="handle-input mr10" clearable></el-input>
				<el-button type="primary" icon="search" @click="search">搜索</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column prop="count" label="序号" width="50"></el-table-column>
				<el-table-column align="center" prop="createTime" label="日期" sortable width="180"></el-table-column>
				<el-table-column align="center" prop="qualityAssuranceNum" label="质保号" width="130"></el-table-column>
				<el-table-column align="center" prop="dealers" label="经销商" width="90"></el-table-column>
				<el-table-column align="center" prop="customerName" label="业主姓名" width="90"></el-table-column>
				<el-table-column align="center" prop="customerAdress" label="业主地址"></el-table-column>
				<el-table-column align="center" prop="hydraulicName" label="水工姓名" width="90"></el-table-column>
				<el-table-column align="center" prop="hydraulicMobil" label="水工电话" width="130"></el-table-column>
				<el-table-column align="center" prop="hydraulicIntegral" label="积分" width="110"></el-table-column>
				<el-table-column align="center" prop="operatingAccount" label="操作员" width="100"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
						<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination"><el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalCount"></el-pagination></div>
		</div>
		<!-- 删除提示框 -->
		<el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
			<div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteRow">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="查看用户信息" :visible.sync="dialogFormVisible" center custom-class="dialog_box" width="70%">
			<div class="form-box data_query_box" style="width: 76%">
				<el-form ref="form" label-position="right" :model="form" label-width="80px">
					<div class="one_row">
						<el-form-item label="业主姓名" prop="userName"><el-input v-model="form.userName" disabled></el-input></el-form-item>
						<el-form-item label="业主电话" prop="userPhoen"><el-input v-model="form.userPhoen" disabled></el-input></el-form-item>
					</div>
					<div class="one_row">
						<el-form-item label="业主地址" prop="userAddress"><el-input v-model="form.userAddress" disabled></el-input></el-form-item>
						<el-form-item label="水工姓名" prop="hydraulicName"><el-input v-model="form.hydraulicName" disabled></el-input></el-form-item>
					</div>
					<div class="one_row">
						<el-form-item label="水工电话" prop="hydraulicPhoen"><el-input v-model="form.hydraulicPhoen" disabled></el-input></el-form-item>
						<el-form-item label="质保卡号" prop="qualityAssuranceNum"><el-input v-model="form.qualityAssuranceNum" disabled></el-input></el-form-item>
					</div>
					<div class="one_row">
						<el-form-item label="水工积分" prop="hydraulicIntegral"><el-input v-model="form.hydraulicIntegral" disabled></el-input></el-form-item>
						<el-form-item label="经销商"><el-input v-model="form.dealers" disabled></el-input></el-form-item>
					</div>
					<div class="one_row">
						<el-form-item label="上传时间"><el-input v-model="form.uploadTime" disabled></el-input></el-form-item>
						<el-form-item label="操作账号"><el-input v-model="form.operatingAccount" disabled></el-input></el-form-item>
					</div>
				</el-form>
				<el-carousel height="380px" indicator-position="outside">
					<el-carousel-item v-for="(item, index) in showPhotos" :key="index">
						<el-image :z-index="10001" class="carousel_img" fit="cover" :src="item.path" :preview-src-list="splitPhotos(showPhotos)"></el-image>
					</el-carousel-item>
				</el-carousel>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { getOwnerList, deleteOwner } from '@/api';
export default {
	name: 'imagechange',
	data() {
		return {
			tableData: [],
			cur_page: 1,
			multipleSelection: [],
			select_word: '',
			del_list: [],
			editVisible: false,
			delVisible: false,
			idx: 0,
			totalCount: 0,
			form: {
				userName: '', // 业主姓名
				userPhoen: '', // 业主电话
				userAddress: '', // 业主地址
				hydraulicName: '', // 水工姓名
				hydraulicPhoen: '', // 水工电话
				qualityAssuranceNum: '', // 质保卡号
				hydraulicIntegral: '', // 水工积分
				dealers: '', // 经销商
				uploadTime: '', // 上传时间
				operatingAccount: ''
			},
			dialogFormVisible: false,
			showPhotos: []
		};
	},
	created() {
		this.getData();
	},
	activated() {
		this.getData();
	},
	computed: {},
	methods: {
		// 分页导航
		handleCurrentChange(val) {
			this.cur_page = val;
			this.getData();
		},
		// 获取 easy-mock 的模拟数据
		getData() {
			let params = {
				pageNum: this.cur_page,
				pageSize: 10,
				keyword: this.select_word
			};
			getOwnerList(params)
				.then(res => {
					if (res.Code === 1) {
						let _data = res.Data;
						for (let i = 0; i < _data.length; i++) {
							_data[i].count = (this.cur_page - 1) * 10 + i + 1;
							_data[i].createTime = this.$utils.parseTime(_data[i].createTime);
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
		search() {
			this.select_word = this.select_word.replace(/\s/g, '');
			this.getData();
		},
		handleEdit(index, row) {
			this.idx = index;
			this.showPhotos = this.tableData[index]['uploadPhotos'] || [];
			this.form = {
				userName: row.customerName, // 业主姓名
				userPhoen: row.customerMobil, // 业主电话
				userAddress: row.customerAdress, // 业主地址
				hydraulicName: row.hydraulicName, // 水工姓名
				hydraulicPhoen: row.hydraulicMobil, // 水工电话
				qualityAssuranceNum: row.qualityAssuranceNum, // 质保卡号
				hydraulicIntegral: row.hydraulicIntegral, // 水工积分
				dealers: row.dealers, // 经销商
				uploadTime: row.createTime, // 上传时间
				operatingAccount: row.operatingAccount
			};
			this.dialogFormVisible = true;
		},
		handleDelete(index, row) {
			this.idx = index;
			this.delVisible = true;
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		// 确定删除
		deleteRow() {
			let params = {
				_id: this.tableData[this.idx]['_id']
			};
			deleteOwner(params)
				.then(res => {
					if (res.Code === 1) {
						this.$message.success('删除成功');
						this.delVisible = false;
						this.getData();
					} else {
						this.$message.error(res.Message || '删除失败');
						this.delVisible = false;
					}
				})
				.catch(err => {
					this.$message.error(err || '删除失败');
				});
		},
		openImg(path) {
			window.open(path);
		},
		splitPhotos(data) {
			let result = [];
			if (data && typeof data == 'object') {
				data.forEach(item => {
					result.push(item.path);
				});
			}
			return result;
		}
	}
};
</script>
<style>
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

.data_query_box .one_row {
	display: flex;
	justify-content: space-between;
}

.dialog_box .el-dialog__body {
	display: flex;
	justify-content: center;
}

.carousel_img {
	width: 100%;
	height: 100%;
}
</style>
