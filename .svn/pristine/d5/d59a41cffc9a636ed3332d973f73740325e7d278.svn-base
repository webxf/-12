<template>
    <view class="container">
        <view class="module" v-if="list.length > 0">
            <view class="title">废水处理台账模块</view>
            <view class="item-module" v-for="item in list" :key="item.diyId">
                <u-cell :title="item.diyName" value="查看" :url="'/packPages/account/list?id='+item.diyId" :border="false" :isLink="true">
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-sbxt2.png')"></u-icon>
                </u-cell>
            </view>
            <view class="more">
                <u-loadmore :status="loadStatus ? 'loading' : 'nomore'" height="50" :line="true" />
            </view>
        </view>  
        <view class="empty" v-else>
            <u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
        </view>
    </view>
</template>

<script>
export default{
    data(){
        return{
            queryParams:{
                pageNo: 1,
                pageSize: 60,
				diyOwner: 0,
				tzlx:'废气处理台账模板',
            },
            loadStatus:false,
            list:[],
            total:1,
            allPage:1,
        }
    },
    onReachBottom () {
        if (this.queryParams.pageNo < this.allPage) {
            this.queryParams.pageNo += 1;
            this.getAccountData();
        }
    },
    onLoad(){
        this.initData();
    },
    methods:{
        initData () {
            // 获取待检查列表
            this.getAccountData();
        },
        async getAccountData () {
            this.loadStatus = true;
            const res = await this.$service.account.getAccountData(this.queryParams);
            this.loadStatus = false
            this.total = res.total;
            this.allPage = Math.ceil(res.data.total / this.queryParams.pageSize);
            this.list = this.list.concat(res.data);
        },
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}
.module{
    margin-bottom: 30rpx;
    .title{
        font-size: 32rpx;
        font-weight: 600;
        color: #343434;
    }
    .item-module{
        background: #fff;
        border-radius: 24rpx;
        margin-top: 20rpx;
    }
}
</style>