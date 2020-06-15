<template>
<div class="add-box">
    <van-form @submit="onSubmit" :show-error-message="false" @failed="onFailed">
        <div class="content">
            <van-cell-group title="信息录入">
                <van-field clearable center size="large" required v-model="params.customerName" name="业主姓名" label="业主姓名" placeholder="请输入业主姓名" :rules="[{ required: true, message: '请填写业主姓名' }]" />

                <van-field clearable center size="large" required v-model="params.customerMobil" name="业主电话" label="业主电话" placeholder="请输入业主电话" :rules="phoneRules" />

                <van-field clearable center size="large" required v-model="params.customerAdress" name="业主地址" label="业主地址" placeholder="请输入业主地址" :rules="[{ required: true, message: '请填写业主地址' }]" />
                <div class="gap"></div>
                <van-field clearable center size="large" required v-model="params.hydraulicName" name="水工姓名" label="水工姓名" placeholder="请输入水工姓名" :rules="[{ required: true, message: '请填写水工姓名' }]" />

                <van-field clearable center size="large" required v-model="params.hydraulicMobil" name="水工电话" label="水工电话" placeholder="请输入水工电话" :rules="phoneRules" />

                <van-field clearable center size="large" required v-model="params.qualityAssuranceNum" name="质保卡号" label="质保卡号" placeholder="请输入质保卡号" :rules="[{ required: true, message: '请填写质保卡号' }]" />

                <van-field clearable center size="large" required v-model="params.hydraulicIntegral" name="水工积分" label="水工积分" placeholder="请输入水工积分" :rules="[{ required: true, message: '请填写水工积分' }]" />
                <div class="gap"></div>
                <van-field center clearable size="large" v-model="params.dealers" name="经销商" label="经销商" placeholder="请输入经销商" />

                <van-field center disabled size="large" v-model="params.createTime" name="上传时间" label="上传时间" />

                <van-field center disabled size="large" v-model="params.operatingAccount" name="操作账号" label="操作账号" />
            </van-cell-group>
            <van-cell-group title="上传图片">
                <van-field name="uploader" input-align="left" :rules="[{ required: true, message: '请上传图片' }]">
                    <template #input>
                        <van-uploader name="myfile" v-model="fileList" @delete="deleteImg" :after-read="afterRead" multiple />
                    </template>
                </van-field>
            </van-cell-group>
        </div>
        <div class="btn-box">
            <van-button block type="info" native-type="submit">提交</van-button>
        </div>
    </van-form>
</div>
</template>

<script>
import dayjs from 'dayjs';
import {
    fileUpload,
    addCustomer
} from '@/api';
import {
    validMobile
} from '@/utils/validate.js';
export default {
    data() {
        this.phoneRules = [{
                required: true,
                message: '请输入手机号'
            },
            {
                validator: validMobile,
                message: '手机号格式错误！'
            }
        ];
        return {
            params: {
                customerName: '',
                customerMobil: '',
                customerAdress: '',
                hydraulicName: '',
                hydraulicMobil: '',
                qualityAssuranceNum: '',
                hydraulicIntegral: '',
                createrId: '',
                createTime: '',
                dealers: '',
                operatingAccount: '',
                uploadPhotos: []
            },
            fileList: []
        };
    },
    computed: {
        userInfo() {
            return this.$store.getters.userInfo;
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.params.createTime = dayjs().format('YYYY-MM-DD HH:mm');
            this.params.createrId = this.userInfo._id;
            this.params.operatingAccount = this.userInfo.nickname || '**';
        },
        onFailed(errorInfo) {
            console.log('failed', errorInfo);
            let errTexts = '';
            errorInfo.errors.forEach(item => {
                errTexts += item.message + '\n';
            });
            this.$toast(errTexts);
        },
        onSubmit(values) {
            console.log('submit', values);
            addCustomer(this.params)
                .then(res => {
                    if (res.Code) {
                        this.$dialog.alert({
                            title: '提示',
                            message: `添加业主${this.params.customerName}成功`,
                        }).then(() => {
							// on close
							this.$router.back();
                        });
                    } else {
                        this.$toast.fail(res.Message || '添加业主失败');
                    }
                })
                .catch(err => {
                    this.$toast(err.message || '添加业主失败');
                });
        },
        afterRead(file) {
            console.log(file);
            const formData = new FormData(); // 声明一个FormData对象
            formData.append('myfile', file.file);
            file.status = 'uploading';
            file.message = '上传中...';
            fileUpload(formData)
                .then(res => {
                    if (res.Code) {
                        this.params.uploadPhotos.push(res.Data);
                        file.status = 'done';
                        file.message = '上传成功';
                        console.log(this.params.uploadPhotos);
                    } else {
                        file.status = 'failed';
                        file.message = '上传失败';
                    }
                })
                .catch(err => {
                    console.log(err);
                    file.status = 'failed';
                    file.message = '上传失败';
                });
        },
        deleteImg(file, name) {
            let index = name.index;
            this.params.uploadPhotos.splice(index, 1);
        }
    }
};
</script>

<style lang="scss" scoped>
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
