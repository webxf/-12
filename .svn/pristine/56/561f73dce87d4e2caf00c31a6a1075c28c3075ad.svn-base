<template>
    <view class="container">
        <card :title="info.qymc" :titleStyle="titleStyle">
            <view class="item-text">
                <text>注册地址：</text>
                <text>{{info.zcdz}}</text>
            </view>
            <view class="item-text">
                <text>法定代表人：</text>
                <text>{{info.fddbr}}</text>
            </view>
            <view class="item-text">
                <text>法定人电话：</text>
                <text>{{info.lxfs}}</text>
            </view>
            <view class="item-text">
                <text>信用代码：</text>
                <text>{{info.tyshxydm}}</text>
            </view>
            <view class="item-text">
                <text>行业类别：</text>
                <text>{{info.hylb}}</text>
            </view>
            <view class="item-text">
                <text>行政区划：</text>
                <text>{{info.xzqh}}</text>
            </view>
            <view class="item-text">
                <text>环保联系人：</text>
                <text>{{info.hbfzr}}</text>
            </view>
            <view class="item-text">
                <text>联系电话：</text>
                <text>{{info.lxfs}}</text>
            </view>
            <view class="item-text">
                <text>经度：</text>
                <text>{{info.jd}}</text>
            </view>
            <view class="item-text">
                <text>纬度：</text>
                <text>{{info.wd}}</text>
            </view>
        </card>
    </view>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
    components: {
        Card
    },
    data () {
        return {
            titleStyle: {
                fontSize: '28rpx',
                color: '#2C8BFF',
                textAlign: 'center'
            },
            info:{}
        }
    },
    onShow () {
        this.getCompanyDetails()
    },
    methods: {
        async getCompanyDetails () {
            const res = await this.$service.archives.getEnterpriseInfo()
            this.info = res.data
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}

.item-text {
    display: flex;
    font-size: 26rpx;

    & text:first-child {
        color: #3E4244;
        min-width: 25%;
        font-weight: 600;
        text-align: right;
    }

    & text:last-child {
        color: #ACACAC
    }

    image {
        width: 200rpx;
        border-radius: 8rpx;
    }
}
</style>