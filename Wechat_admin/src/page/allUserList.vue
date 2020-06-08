<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i>
					图片修改
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="select_word" placeholder="输入查询内容: (水工电话/业主电话/经销商/地址等）" class="handle-input mr10" clearable></el-input>
				<el-button type="primary" icon="search" @click="search">搜索</el-button>
			</div>
			<el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" class="table" @selection-change="handleSelectionChange">
				<el-table-column align="center" type="selection" width="55"></el-table-column>
				<el-table-column align="center" prop="createTime" label="创建日期" width="180"></el-table-column>
				<el-table-column align="center" prop="nickname" label="姓名"></el-table-column>
				<el-table-column align="center" prop="mobile" label="手机号"></el-table-column>
				<el-table-column align="center" prop="gender" label="性别"></el-table-column>
				<el-table-column align="center" prop="status" label="是否管理员"></el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
	</div>
</template>
<script>
import { getUserListByAdmin, deleteOwner } from '@/api';
export default {
	name: 'imagechange',
	data() {
		return {
			tableData: [],
			cur_page: 1,
			multipleSelection: [],
			select_word: '',
			del_list: [],
			delVisible: false,
			idx: -1,
			totalCount: 0
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
			getUserListByAdmin(params)
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
		filterTag(value, row) {
			return row.tag === value;
		},
		handleEdit(index, row) {
			this.idx = index;
			this.$store.commit('index/SET_EDITORDATA', row);
			this.$router.push('/addmessage');
		},
		handleDelete(index, row) {
			this.idx = index;
			this.delVisible = true;
		},
		handleSelectionChange(val) {
			console.log(val);
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
