<template>
    <view class="container">
        <view class="module" v-if="companyList.length > 0">
            <view :class="['item-module',index>0?'mt20':'']" v-for="(item, index) in companyList" :key="index + item.dwbh">
                <u-cell :title="item.dwmc"
                    :titleStyle="titleStyle"
                    value="点击前往" @click="handleJump" :border="false"
                    :name="index"
                    :isLink="true">
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-rcxh.png')"></u-icon>
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
export default {
    data () {
        return {
            titleStyle:{
                width:'350rpx',
                fontSize:'14px',
                overflow: 'hidden',
                textOverflow:'ellipsis',
                whiteSpace: 'nowrap'
            },
            queryParams: {
                pageNo: 1,
                pageSize: 20
            },
            typeColumns:[],
            loadStatus:false,
            allPage: 0,
            total: 0,
            typePickerShow:false,
            companyList: []
        }
    },
    onReachBottom () {
        if (this.queryParams.pageNo < this.allPage) {
            this.queryParams.pageNo += 1;
            this.getDailyModelList();
        }
    },
    onLoad () {
        this.initData();
    },
    methods: {
        initData () {
            // 获取待检查列表
            this.getDailyModelList();
        },
        async getDailyModelList () {
            this.loadStatus = true;
            const res = await this.$service.company.getCompanyList(this.queryParams);
            console.log(res);
            this.loadStatus = false
            this.total = res.total;
            this.allPage = Math.ceil(res.total / this.queryParams.pageSize);
            this.companyList = this.companyList.concat(res.data);
        },
        reset () {
            this.queryParams = {
                pageNo: 1,
                pageSize: 20
            };
            this.companyList = [];
        },
        typePickerClose(){
            this.typePickerShow = false;
        },
        typePickerConfirm(){},
        handleJump(event){
            uni.removeStorageSync('companyDetails');
            let details = this.companyList[event.name];
            uni.setStorageSync('companyDetails',details);
            uni.navigateTo({
                url: '/packPages/company/details'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}
.picker-box{
    background: #fff;
    border-radius: 24rpx;
}

.module {
    margin-bottom: 30rpx;
    .item-module {
        background: #fff;
        border-radius: 24rpx;
    }
    .mt20{
        margin-top: 20rpx;
    }
}

.empty {
    padding-top: 20%;
}
</style>