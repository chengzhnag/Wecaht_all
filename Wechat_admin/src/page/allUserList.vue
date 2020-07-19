<template>
<div class="table">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i>
                全部用户
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
                <el-button v-if="multipleSelection.length" type="danger" icon="el-icon-delete" @click="batchDelete">删除</el-button>
            </div>
        </div>
        <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" class="table" @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建日期" width="180"></el-table-column>
            <el-table-column align="center" prop="nickname" label="姓名"></el-table-column>
            <el-table-column align="center" prop="mobile" label="手机号"></el-table-column>
            <el-table-column align="center" prop="sex" label="性别"></el-table-column>
            <el-table-column align="center" prop="area" label="所属区域"></el-table-column>
            <el-table-column align="center" prop="isAdmin" label="是否管理员"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalCount"></el-pagination>
        </div>
    </div>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="isShowEditor" width="70%" :close-on-click-modal="false">
        <el-form ref="form" :model="form" label-position="right" label-width="100px">
            <el-form-item label="姓名" prop="nickname" required :rules="[{ required: true, message: '姓名不能为空' }]">
                <el-col :span="11">
                    <el-input v-model="form.nickname"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile" required :rules="[{ required: true, message: '手机号不能为空' }]">
                <el-col :span="11">
                    <el-input v-model="form.mobile"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                    <el-radio :label="-1">未知</el-radio>
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="所属区域" prop="area">
                <el-col :span="11">
                    <el-input v-model="form.area"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="出生年月">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                        style="width: 100%;">
                    </el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload name="myfile" id="myfile" class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="avatarSuccess" :before-upload="beforeAvatarUpload" :on-error="uploadError">
                    <img v-if="form.avatar" :src="form.avatar | filterImg" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否管理员">
                <el-radio-group v-model="form.status">
                    <el-radio :label="2">普通用户</el-radio>
                    <el-radio :label="1">管理员</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="{ required: false, trigger: 'blur', validator: validatePass }">
                <el-col :span="16">
                    <el-input type="password" clearable v-model="form.password" placeholder="请输入要修改的密码"></el-input>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isShowEditor = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    getUserListByAdmin,
    deleteUser,
    uploadUrl,
    upDateUser
} from '@/api';
import util from '@/components/common/util.js';
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
            idx: 0,
            totalCount: 0,
            sexTexts: ['未知', '女', '男'],
            deleteType: '',
            isShowEditor: false,
            form: {
                nickname: '',
                mobile: '',
                gender: -1,
                area: '',
                birthday: new Date(),
                avatar: '',
                status: 2,
                _id: '',
                password: ''
            },
            uploadUrl: uploadUrl
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
        validatePass(rule, value, callback) {
            value = value.replace(/\s/g, '');
            if (value === '') {
                callback();
            } else {
                if (value.length >= 6) {
                    callback();
                }
                callback(new Error('密码长度需大于等于六位数'));
            }
        },
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
                            _data[i].createTime = this.$utils.parseTime(_data[i].createTime);
                            _data[i].sex = this.sexTexts[_data[i].gender + 1];
                            _data[i].isAdmin = _data[i].status - 1 ? '普通用户' : '管理员';
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
        handleEdit(index, row) {
            this.idx = index;
            let data = this.tableData[index];
            this.init();
            for (var key in data) {
                if (Object.prototype.hasOwnProperty.call(this.form, key) === true) {
                    //此处hasOwnProperty是判断自有属性，使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问会避免原型对象扩展带来的干扰
                    this.form[key] = data[key];
                }
            }
            this.form.password = '';
            console.log(this.form);
            this.isShowEditor = true;
        },
        init() {
            this.form = {
                nickname: '',
                mobile: '',
                gender: -1,
                area: '',
                birthday: new Date(),
                avatar: '',
                status: 2,
                _id: '',
                password: ''
            };
        },
        handleDelete(index, row) {
            this.idx = index;
            this.delVisible = true;
            this.deleteType = 'alone';
        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        },
        // 确定删除
        deleteRow() {
            let _ids = this.tableData[this.idx]['_id'] || '';
            if (this.deleteType == 'batch') {
                _ids = this.getSelectIds();
            }
            this.funcDelete(_ids);
        },
        funcDelete(id) {
            let params = {
                _id: id
            };
            deleteUser(params)
                .then(res => {
                    this.delVisible = false;
                    if (res.Code === 1) {
                        this.$message.success('删除成功');
                        this.getData();
                    } else {
                        this.$message.error(res.Message || '删除失败');
                    }
                })
                .catch(err => {
                    this.delVisible = false;
                    this.$message.error(err || '删除失败');
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
        batchDelete() {
            this.deleteType = 'batch';
            this.delVisible = true;
        },
        avatarSuccess(res, file, fileList) {
            console.log(res);
            console.log(file);
            console.log(fileList);
            if (res.Code === 1) {
                this.form.avatar = res.Data.path;
            } else {
                this.$message.error(res.Message || '上传失败, 请重试');
            }
        },
        beforeAvatarUpload(file) {
            console.log(file);
            let types = ['image/png', 'image/jpeg'];
            const isJPG = types.includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        uploadError(err, file, fileList) {
            console.log(err);
            this.$message.error(file.name + '上传失败');
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                console.log(valid);
                if (valid) {
                    let params = JSON.parse(JSON.stringify(this.form));
                    if (params.password && params.password.length >= 6) {
                        params.password = util.passwrodMd5(params.password);
                    } else {
                        delete params.password;
                    }
                    upDateUser(params)
                        .then(res => {
                            if (res.Code === 1) {
                                if (params._id == this.userInfo._id) {
                                    this.$store.commit('index/SET_USERINFO', Object.assign(this.userInfo, params));
                                }
                                this.$message({
                                    message: `编辑用户${params.nickname}成功`,
                                    type: 'success'
                                });
                                this.getData();
                                this.isShowEditor = false;
                            } else {
                                this.$message.error(res.Message || '编辑失败');
                            }
                        })
                        .catch(err => {
                            this.$message.error(err.message || '编辑失败');
                        });
                }
            });
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

/deep/ .avatar-uploader .el-upload--text {
    width: 128px;
    height: 128px;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
}

.avatar {
    width: 128px;
    height: 128px;
    display: block;
}
</style>
