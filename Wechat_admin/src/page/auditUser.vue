<template>
<div class="table">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i>
                用户审核
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <div>
                <el-input v-model="select_word" placeholder="输入查询内容: (姓名/手机号）" class="handle-input mr10" clearable></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
            <div>
                <el-button v-if="multipleSelection.length" type="primary" icon="el-icon-check" @click="batchPass">通过</el-button>
                <el-button v-if="multipleSelection.length" type="danger" icon="el-icon-delete" @click="batchRefuse">拒绝</el-button>
            </div>
        </div>
        <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" class="table" @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建日期" width="150"></el-table-column>
            <el-table-column align="center" prop="nickname" label="姓名"></el-table-column>
            <el-table-column align="center" prop="mobile" label="手机号"></el-table-column>
            <el-table-column align="center" prop="sex" label="性别"></el-table-column>
            <el-table-column align="center" prop="isAdmin" label="是否管理员"></el-table-column>
            <el-table-column align="center" prop="auditText" label="审核状态"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handlePass(scope.$index, scope.row)">通过</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleRefuse(scope.$index, scope.row)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalCount"></el-pagination>
        </div>
    </div>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">是否确定拒绝？</div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="refuseRow">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="passVisible" width="300px" center>
        <div class="del-dialog-cnt">是否确定通过？</div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="passVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmRow">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {
    getWaitAuditList,
    auditUserByAdmin
} from '@/api';
export default {
    name: 'audituser',
    data() {
        return {
            tableData: [],
            cur_page: 1,
            multipleSelection: [],
            select_word: '',
            del_list: [],
            delVisible: false,
            passVisible: false,
            idx: 0,
            totalCount: 0,
            sexTexts: ['未知', '女', '男'],
            refuseType: '',
            passType: ''
        };
    },
    created() {
        this.getData();
    },
    activated() {
        this.getData();
    },
    computed: {
        userInfo() {
            return this.$store.getters.userInfo || '';
        }
    },
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
            getWaitAuditList(params)
                .then(res => {
                    if (res.Code === 1) {
                        let _data = res.Data;
                        for (let i = 0; i < _data.length; i++) {
                            _data[i].createTime = this.$utils.parseTime(_data[i].createTime);
                            _data[i].sex = this.sexTexts[_data[i].gender + 1];
                            _data[i].isAdmin = _data[i].status - 1 ? '普通用户' : '管理员';
                            _data[i].auditText = _data[i].registerExamine ? '待审核' : '已拒绝';
                        }
                        this.tableData = _data;
                        this.totalCount = res.TotalCount;
                    } else {
                        this.$message.error(res.Message || '获取数据失败');
                    }
                })
                .catch(err => {
                    this.$message.error(err.message || '获取数据失败');
                });
        },
        search() {
            this.select_word = this.select_word.replace(/\s/g, '');
            this.getData();
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handlePass(index, row) {
            this.idx = index;
            this.passVisible = true;
            this.passType = 'alone';
        },
        handleRefuse(index, row) {
            this.idx = index;
            this.delVisible = true;
            this.refuseType = 'alone';
        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        },
        // 确定删除
        refuseRow() {
            let _ids = this.tableData[this.idx]['_id'] || '';
            if (this.refuseType == 'batch') {
                _ids = this.getSelectIds();
            }
            this.funcAudit(_ids, 0);
        },
        funcAudit(ids, status) {
            let params = {
                ids: ids,
                status: status
            };
            auditUserByAdmin(params)
                .then(res => {
                    this.delVisible = false;
                    this.passVisible = false;
                    if (res.Code === 1) {
                        this.$message.success(`审核(${status == 0 ? '拒绝' : '通过'})成功`);
                        this.getData();
                    } else {
                        this.$message.error(res.Message || `审核(${status == 0 ? '拒绝' : '通过'})失败`);
                    }
                })
                .catch(err => {
                    this.delVisible = false;
                    this.passVisible = false;
                    this.$message.error(err || `审核(${status == 0 ? '拒绝' : '通过'})失败`);
                });
        },
        getSelectIds() {
            let _data = this.multipleSelection;
            let result = [];
            _data.forEach(item => {
                result.push(item['_id']);
            });
            return result.join(',');
        },
        batchRefuse() {
            this.refuseType = 'batch';
            this.delVisible = true;
        },
        batchPass() {
            this.passType = 'batch';
            this.passVisible = true;
        },
        confirmRow() {
            let _ids = this.tableData[this.idx]['_id'] || '';
            if (this.passType == 'batch') {
                _ids = this.getSelectIds();
            }
            this.funcAudit(_ids, 2);
        }
    }
};
</script>

<style scoped>
.handle-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
