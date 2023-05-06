<template>
    <view class="container">
        <u-swiper :list="bannerlist"></u-swiper>
        <view class="notice" @click="handleJump('/packPages/remind/index')">
            <view class="icon-box">
                <image src="@/static/icon/icon-notice.png" mode="scaleToFill" />
            </view>
            <view class="text-box">
                <view class="text">您有{{txhz.total}}条任务需整改</view>
                <view class="date">{{txhz.date}}</view>
            </view>
        </view>
        <view class="tabs">
            <view class="item-tab" @click="handleJump('/pages/archives/index')">
                <view class="icon">
                </view>
                <text>档案管理</text>
            </view>
            <view class="item-tab" @click="handleJump('/pages/declare/index')">
                <view class="icon">
                </view>
                <text>申报管理</text>
            </view>
            <view class="item-tab" @click="handleJump('/pages/working/index')">
                <view class="icon">
                </view>
                <text>环保工况</text>
            </view>
            <view class="item-tab" @click="handleJump('/packPages/account/index')">
                <view class="icon">
                </view>
                <text>台账管理</text>
            </view>
        </view>
        <u-row customStyle="margin-top: 30rpx">
            <u-col span="6" gutter="10">
                <view class="module-zqt" @click="handleJump('/packPages/government-enterprise/index')">
                    <view class="title">政企通</view>
                    <view class="item"><text>政务通知</text><text style="color:#2C8BFF">{{ backlog.zwtzzs || 0 }}</text>
                    </view>
                    <view class="item"><text>市局预警</text><text style="color:#FD8D1B">{{ backlog.sjyj || 0 }}</text>
                    </view>
                    <view class="item"><text>监督检查</text><text style="color:#9B88F7">{{ backlog.jdjc || 0 }}</text>
                    </view>
                </view>
            </u-col>
            <u-col span="6">
                <view class="flex-box">
                    <view class="module-rcxj" @click="handleJump('/packPages/daily-inspection/index')">
                        <view class="title">日常巡检</view>
                        <view class="item"><text>共发现</text><text style="color:#FE9430">{{ backlog.rcxjwts || 0 }}</text>
                        </view>
                    </view>
                    <view class="module-hbxc" @click="handleJump('/packPages/environment-inspection/index')">
                        <view>环保巡查</view>
                        <view class="item"><text>共交办</text><text style="color:#2C8BFF">{{ backlog.hbxcwts || 0 }}</text>
                        </view>
                    </view>
                </view>
            </u-col>

        </u-row>
        <u-row>
            <u-col span="6">
                <view class="module-jsdw" @click="handleJump('/packPages/company/index')">
                    <view class="title">技术单位</view>
                    <view class="item">单位尽在这里</view>
                </view>
            </u-col>
            <u-col span="6">
                <view class="module-zhzx" @click="handleJump('/packPages/statistics/index')">
                    <view class="title">智慧中心</view>
                    <view class="item">智慧在线分析</view>
                </view>
            </u-col>
        </u-row>
    </view>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import { getDate } from '@/utils/index'
export default {
    components: {
        Tabbar
    },
    data () {
        return {
            notice: '',
            bannerlist: ['https://xx7x.star7.cn:8090/qyjg/auth/getImage?fileId=bf2701d6-7545-4e2f-bc09-33da90de56e6'],
            backlog: {},
            txhz:{}
        }
    },
    onPageScroll (e) {
        this.scrollTop = e.scrollTop
    },
    onShow () {
        this.initData()
    },
    methods: {
        async initData () {
            this.getCount();
            this.getTxhz();
        },
        async getTxhz(){
            const { data } = await this.$service.index.getTxhzInfo()
            let date= getDate();
            let count = 0;
            Object.keys(data).map(item=>{
                count+=data[item]
            });
            this.txhz={
                total: count,
                date:date.year+'-'+date.month+'-'+date.day
            };
        },
        async getCount(){
            // 获取待整理数量
            const { data } = await this.$service.index.getCount()
            this.backlog = data;
        },
        handleJump (url) {
            uni.navigateTo({
                url: url
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

.notice {
    width: 100%;
    background: #fff;
    border-radius: 50rpx;
    margin: 30rpx auto;
    display: flex;
    align-items: center;
    padding: 15rpx 30rpx;
    box-sizing: border-box;

    .icon-box {
        width: 122rpx;
        height: 52rpx;

        image {
            width: 100%;
            height: 100%;
        }
    }

    .text-box {
        flex: 1;
        display: flex;
        font-size: 24rpx;
        color: #A0A1A7;

        .text {
            flex: 1;
        }

        .date {
            flex: 1;
            text-align: right;
        }
    }
}

.tabs {
    width: 100%;
    display: flex;

    .item-tab {
        flex: 1;
        text-align: center;
        color: #3E4245;

        .icon {
            width: 100rpx;
            height: 100rpx;
            border-radius: 24rpx;
            box-sizing: border-box;
            margin: 0 auto 10rpx auto;
            display: flex;
            justify-content: center;
            align-items: center;
            // background: url('~@/static/icon/icon-tab1.png') no-repeat center center;
            // background-size:100% 100%;
        }

    }

    & .item-tab:nth-child(1) .icon {
        background: url('~@/static/icon/icon-tab1.png') no-repeat center center;
        background-size: 100% 100%;
    }

    & .item-tab:nth-child(2) .icon {
        background: url('~@/static/icon/icon-tab2.png') no-repeat center center;
        background-size: 100% 100%;
    }

    & .item-tab:nth-child(3) .icon {
        background: url('~@/static/icon/icon-tab3.png') no-repeat center center;
        background-size: 100% 100%;
    }

    & .item-tab:nth-child(4) .icon {
        background: url('~@/static/icon/icon-tab4.png') no-repeat center center;
        background-size: 100% 100%;
    }

}

.title {
    color: #3E4245;
}

.item {
    font-size: 22rpx;
    color: #A0A1A7;
}

.item text:last-child {
    font-weight: 600;
    margin-left: 40rpx;
}

.module-zqt,
.module-rcxj,
.module-hbxc,
.module-jsdw,
.module-zhzx {
    padding: 40rpx;
    box-sizing: border-box;
}

.module-zqt {
    height: 300rpx;
    background: url('@/static/index/module-zqt.png');
    background-size: 100% 100%;

    .item {
        margin-top: 20rpx;
    }
}

.module-rcxj,
.module-hbxc,
.module-jsdw,
.module-zhzx {
    height: 150rpx;
    background: url('@/static/index/module-rcxj.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.module-hbxc {
    background: url('@/static/index/module-hbxc.png');
    background-size: 100% 100%;
}

.module-jsdw {
    background: url('@/static/index/module-jsdw.png');
    background-size: 100% 100%;
}

.module-zhzx {
    background: url('@/static/index/module-zhzx.png');
    background-size: 100% 100%;
}
</style>
