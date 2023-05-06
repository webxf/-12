<template>
    <view class="container">
        <view class="module" v-if="dailyModuleList.length > 0">
            <view class="title">日常巡检</view>
            <view class="item-module" v-for="item  in dailyModuleList" :key="item.xjModelId">
                <u-cell  :title="item.xjModelName"
                    value="点击前往" :url="'/packPages/daily-inspection/safety-check?id=' + item.xjModelId" :border="false"
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
            queryParams: {
                pageNo: 1,
                pageSize: 20
            },
            loadStatus:false,
            allPage: 0,
            total: 0,
            dailyModuleList: []
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
            const res = await this.$service.dailyInspection.getDailyModelList({ modelType: 1, ...this.queryParams });
            this.loadStatus = false
            this.total = res.total;
            this.allPage = Math.ceil(res.data.total / this.queryParams.pageSize);
            this.dailyModuleList = this.dailyModuleList.concat(res.data);
        },
        reset () {
            this.queryParams = {
                pageNo: 1,
                pageSize: 20
            };
            this.dailyModuleList = [];
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}

.module {
    margin-bottom: 30rpx;

    .title {
        font-size: 32rpx;
        font-weight: 600;
        color: #343434;
    }

    .item-module {
        background: #fff;
        border-radius: 24rpx;
        margin-top: 20rpx;
    }
}

.empty {
    padding-top: 20%;
}
</style>