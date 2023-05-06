<template>
    <view class="container">
        <view class="module">
            <view class="title">政务通知</view>
            <view class="item-module">
                <u-cell title="政务通知" value="点击前往" url="/packPages/government-enterprise/notice" :border="false" :isLink="true">
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-zwtz2.png')"></u-icon>
                </u-cell>
            </view>
        </view>
        <view class="module">
            <view class="title">市局预警</view>
            <view class="item-module">
                <u-cell title="市局预警" value="点击前往" url="/packPages/government-enterprise/warning" :border="false" :isLink="true">
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-sjyj2.png')"></u-icon>
                </u-cell>
            </view>
        </view>
        <view class="module">
            <view class="title">监督检查</view>
            <view class="item-module">
                <u-cell title="监督检查" value="点击前往" url="/packPages/government-enterprise/check" :border="false" :isLink="true">
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-jdjc.png')"></u-icon>
                </u-cell>
            </view>
        </view>
        <!-- <view class="module">
            <view class="title">政策法规</view>
            <view class="item-module">
                <u-cell title="政策法规" value="点击前往" url="" :border="false" :isLink="true">
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-zcfg.png')"></u-icon>
                </u-cell>
            </view>
        </view>
        <view class="module">
            <view class="title">政务咨询</view>
            <view class="item-module">
                <u-cell title="政务咨询" value="点击前往" url="" :border="false" :isLink="true">
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-zwzx.png')"></u-icon>
                </u-cell>
            </view>
        </view> -->
    </view>
</template>

<script>
export default{
    data(){
        return{
        }
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