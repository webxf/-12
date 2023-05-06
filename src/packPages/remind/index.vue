<template>
    <view class="container">
        <view class="module">
            <view class="module-content">
                <view class="title">政企通</view>
                <view class="list">
                    <view class="item" @click="handleJump(txhz.zwtz,'/packPages/government-enterprise/notice')">
                        <u-icon size="33" :name="require('@/static/icon/icon-zwtz.png')"></u-icon>
                        <view class="name">政务通知</view>
                        <view class="btn-box">
                            <text :style="{ color: txhz.zwtz > 0 ? '#FFA62A' : '#92939A' }">{{ txhz.zwtz ||
                                    0
                            }}条待整改</text>
                            <u-icon name="rewind-right-fill" :color="txhz.zwtz > 0 ? '#FFA62A' : '#92939A'"
                                size="18"></u-icon>
                        </view>
                    </view>
                    <view class="item" @click="handleJump(txhz.sjyj,'/packPages/government-enterprise/warning')">
                        <u-icon size="33" :name="require('@/static/icon/icon-sjyj.png')"></u-icon>
                        <view class="name">市局预警</view>
                        <view class="btn-box">
                            <text :style="{ color: txhz.sjyj > 0 ? '#FFA62A' : '#92939A' }">{{ txhz.sjyj || 0
                            }}条待整改</text>
                            <u-icon name="rewind-right-fill" :color="txhz.sjyj > 0 ? '#FFA62A' : '#92939A'"
                                size="18"></u-icon>
                        </view>
                    </view>
                    <view class="item" @click="handleJump(txhz.jctz,'/pages/working/online-detection')">
                        <u-icon size="33" :name="require('@/static/icon/icon-jctz.png')"></u-icon>
                        <view class="name">监测通知</view>
                        <view class="btn-box">
                            <text :style="{ color: txhz.jctz > 0 ? '#FFA62A' : '#92939A' }">{{ txhz.jctz || 0
                            }}条待整改</text>
                            <u-icon name="rewind-right-fill" :color="txhz.jctz > 0 ? '#FFA62A' : '#92939A'"
                                size="18"></u-icon>
                        </view>
                    </view>
                </view>
            </view>
            <view class="module-content">
                <view class="title">巡检</view>
                <view class="list">
                    <view class="item" @click="handleJump(txhz.rcxj,'/packPages/daily-inspection/index')">
                        <u-icon size="33" :name="require('@/static/icon/icon-rcxj.png')"></u-icon>
                        <view class="name">日常巡检</view>
                        <view class="btn-box">
                            <text :style="{ color: txhz.rcxj > 0 ? '#FFA62A' : '#92939A' }">{{ txhz.rcxj || 0
                            }}条待整改</text>
                            <u-icon name="rewind-right-fill" :color="txhz.rcxj > 0 ? '#FFA62A' : '#92939A'"
                                size="18"></u-icon>
                        </view>
                    </view>
                    <view class="item" @click="handleJump(txhz.ybjgl,'/packPages/environment-inspection/index')">
                        <u-icon size="33" :name="require('@/static/icon/icon-hbxj.png')"></u-icon>
                        <view class="name">环保巡检</view>
                        <view class="btn-box">
                            <text :style="{ color: txhz.hbxj > 0 ? '#FFA62A' : '#92939A' }">{{ txhz.hbxj || 0
                            }}条待整改</text>
                            <u-icon name="rewind-right-fill" :color="txhz.hbxj > 0 ? '#FFA62A' : '#92939A'"
                                size="18"></u-icon>
                        </view>
                    </view>
                </view>
            </view>
            <view class="module-content">
                <view class="title">预报警管理</view>
                <view class="list">
                    <view class="item" @click="handleJump(txhz.ybjgl,'/pages/working/warning')">
                        <u-icon size="33" :name="require('@/static/icon/icon-yjcl.png')"></u-icon>
                        <view class="name">预报警管理</view>
                        <view class="btn-box">
                            <text :style="{ color: txhz.ybjgl > 0 ? '#FFA62A' : '#92939A' }">{{ txhz.ybjgl ||
                                    0
                            }}条待整改</text>
                            <u-icon name="rewind-right-fill" :color="txhz.ybjgl > 0 ? '#FFA62A' : '#92939A'"
                                size="18"></u-icon>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data () {
        return {
            txhz: {}
        }
    },
    onShow () {
        this.initData()
    },
    methods: {
        async initData () {
            const { data } = await this.$service.remind.getTxhzInfo()
            this.txhz = data
        },
        handleJump(num,url){
            if(num>0){
                uni.navigateTo({
                    url:url
                })
            }else{
                uni.showToast({
                    title: '该模块暂无通知',
                    icon: 'none'
                })
            }
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
    .module-content {
        .title {
            font-size: 32rpx;
            font-weight: 600;
            color: #343434;
        }

        .list {
            margin: 30rpx auto;
            display: grid;
            font-size: 28rpx;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 20rpx;
            grid-row-gap: 20rpx;

            .item {
                background: #fff;
                border-radius: 24rpx;
                padding: 20rpx;

                .name {
                    margin: 10rpx 0;
                }

                .btn-box {
                    display: flex;
                    font-size: 24rpx;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }

    }
}
</style>