<template>
<div class="query-box">
    <van-search v-model="value" show-action placeholder="请输入业主手机号搜索" @search="onSearch">
        <template #action>
            <div @click="onSearch">搜索</div>
        </template>
    </van-search>
    <div class="content" v-if="!isNotData">
        <van-cell-group title="基础数据">
            <van-field disabled center size="large" v-model="params.customerName" name="业主姓名" label="业主姓名" placeholder="请输入业主姓名" />

            <van-field disabled center size="large" v-model="params.customerMobil" name="业主电话" label="业主电话" placeholder="请输入业主电话" />

            <van-field disabled center size="large" v-model="params.customerAdress" name="业主地址" label="业主地址" placeholder="请输入业主地址" />
            <div class="gap"></div>
            <van-field disabled center size="large" v-model="params.hydraulicName" name="水工姓名" label="水工姓名" placeholder="请输入水工姓名" />

            <van-field disabled center size="large" v-model="params.hydraulicMobil" name="水工电话" label="水工电话" placeholder="请输入水工电话" />

            <van-field disabled center size="large" v-model="params.qualityAssuranceNum" name="质保卡号" label="质保卡号" placeholder="请输入质保卡号" />

            <van-field disabled center size="large" v-model="params.hydraulicIntegral" name="水工积分" label="水工积分" placeholder="请输入水工积分" />
            <div class="gap"></div>
            <van-field center v-if="params.dealers" disabled size="large" v-model="params.dealers" name="经销商" label="经销商" placeholder="请输入经销商" />

            <van-field center disabled size="large" v-model="params.createTime" name="上传时间" label="上传时间" />

            <van-field center disabled size="large" v-model="params.operatingAccount" name="操作账号" label="操作账号" />
        </van-cell-group>
        <van-cell-group title="图片数据">
            <van-field name="uploader" input-align="left">
                <template #input>
                    <van-uploader :deletable="false" :show-upload="false" v-model="fileList" disabled />
                </template>
            </van-field>
        </van-cell-group>
    </div>
    <van-empty v-if="isNotData" description="暂无数据" />
</div>
</template>

<script>
import {
    getCustomerByMobile
} from '@/api';
import {
    validMobile
} from '@/utils/validate.js';
import {
    parseTime
} from '@/utils';
import {
    mixins
} from '@/utils/mixins.js';
export default {
    mixins: [mixins],
    data() {
        return {
            value: '',
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
            isNotData: true
        }
    },
    computed: {
        userInfo() {
            return this.$store.getters.userInfo;
        },
        fileList() {
            let result = [];
            this.params.uploadPhotos.forEach(item => {
                result.push({
                    url: this.filterImg(item.path)
                });
            })
            return result;
        }
    },
    mounted() {},
    methods: {
        onSearch() {
            if (!validMobile(this.value)) {
                this.$toast('输入的手机号格式错误');
                return;
            }
            getCustomerByMobile({
                    mobile: this.value
                }).then(res => {
                    if (res.Code) {
                        res.Data.createTime = parseTime(res.Data.createTime, '{y}-{m}-{d} {h}:{i}');
                        this.params = res.Data;
                        this.$toast('查询成功');
                        this.isNotData = false;
                    } else {
                        this.isNotData = true;
                        this.$toast(res.Message || '查询失败');
                    }
                })
                .catch(err => {
                    this.isNotData = true;
                    this.$toast(err.message || '查询失败');
                });
        }
    }
}
</script>

<style lang="scss" scoped>
.query-box {
    @include wh(100%, 100%);
    overflow: auto;

    .gap {
        width: 100%;
        height: 10px;
        background-color: rgb(245, 245, 245);
    }
}
</style>
