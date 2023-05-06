<template>
    <view class="container">
        <view class="module">
            <view v-for="(item, index) in moduleList" :key="index">
                <u-cell :title="item.title"
                    :titleStyle="titleStyle"
                    value="点击前往" @click="goLink(index)" :border="false"
                    :name="index"
                    :isLink="true"
                    >
                    <u-icon slot="icon" size="32" :name="require('@/static/icon/icon-rcxh.png')"></u-icon>
                </u-cell>
            </view>
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
           moduleList:[
            {
            index:0,
            title:'智慧中心展示'
           },
           {
            index:1,
            title:'项目提醒'
           },
           {
            index:2,
            title:'在线报警'
           },
           {
            index:3,
            title:'环保巡检'
           },
           {
            index:4,
            title:'数据统计'
           }
           ]
        }
    },
    methods: {
        //点击跳转进入不同的链接
        goLink(i){
            if(i == 0 ){
                uni.navigateTo({
                    url:'./components/charts'
                })
            }else if(i == 1) {
                uni.navigateTo({
                    url:'./components/remind'
                })
            }else if(i == 2) {
                uni.navigateTo({
                    url:'./components/online-alarm'
                })
            }else if(i == 3) {
                uni.navigateTo({
                    url:'./components/environment-inspect'
                })
            }else if(i == 4) {
                uni.navigateTo({
                    url:'./components/report-list'
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