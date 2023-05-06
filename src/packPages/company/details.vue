<template>
    <view class="container">
        <view class="img-box">
            <image
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbkimg.cdn.bcebos.com%2Fpic%2F267f9e2f07082838807999dab299a9014d08f18c&refer=http%3A%2F%2Fbkimg.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675473613&t=0dad8afe3ad500a5067e5487c97b4302"
                mode="scaleToFill"
            />
        </view>
        <view class="content">
            <view class="title">
                <view class="name">
                    {{companyDetails.dwmc}}
                </view>
                <view class="adress">
                    {{companyDetails.xxdz}}
                </view>
            </view>
            <view class="details">
                <card>
                    <u--form labelPosition="left" labelWidth="120">
                        <u-form-item label="法定代表人：">
                            <text>{{ companyDetails.fr }}</text>
                        </u-form-item>
                        <u-form-item label="信用代码：">
                            <text>{{ companyDetails.shxydm }}</text>
                        </u-form-item>
                        <u-form-item label="行政区划：">
                            <text>{{ companyDetails.xzqh }}</text>
                        </u-form-item>
                        <u-form-item label="服务内容：">
                            <text>{{ companyDetails.fwxm || '未知'}}</text>
                        </u-form-item>
                        <u-form-item label="环保联系人：">
                            <text>{{ companyDetails.lxrxm }}</text>
                        </u-form-item>
                        <u-form-item label="联系电话：">
                            <text>{{ companyDetails.sjhm }}</text>
                        </u-form-item>
                        <u-form-item label="企业简介：">
                            <rich-text :nodes="companyDetails.qyjj"></rich-text>
                        </u-form-item>
                    </u--form>
                </card>
            </view>
        </view>
    </view>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
    components:{
        Card
    },
    data(){
        return{
            companyDetails:{}
        }
    },
    onShow(){
        this.companyDetails = uni.getStorageSync('companyDetails');
    },
    methods:{
    },
}
</script>

<style lang="scss" scoped>
.container{
    background: #F9FAFA;
    height: 100vh;
    position: relative;
    overflow: auto;
}
.img-box{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    z-index: 1 !important;
    image{
        z-index: 1;
        width:750rpx;
        height:400rpx;
    }
}
.content{
    width: 750rpx;
    height: auto;
    padding: 0rpx 30rpx 30rpx 30rpx;
    box-sizing: border-box;
    position: absolute;
    top: 350rpx;
    left: 0;
    right: 0;
    z-index: 10;
    .title{
        width: 690rpx;
        box-sizing: border-box;
        height: auto;
        background: rgba(256,256,256,.9);
        border-radius: 24rpx;
        padding: 30rpx;
        z-index: 10;
        .name{
            font-size:32rpx;
            font-weight: 600;
            color: #030303;
        }
        .adress{
            margin-top: 30rpx;
            font-size: 24rpx;
            color: #4F504F;
        }
    }
    .details{
        width: 690rpx;
        margin-top: 30rpx;
        
    }
}
</style>