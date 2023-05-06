<template>
    <u-popup :show="show" mode="center" round="12" :safeAreaInsetBottom="false" @close="close" @open="open">
        <view>
            <video ref="videoRef" style="width: 690rpx;height: 390rpx; display: block;" :autoplay="false" :src="url"></video>
        </view>
        
    </u-popup>      
</template>

<script>
export default {
    props:{
        url:{
            type: String,
            default: ''
        }
    },
    data(){
        return{
            show:true,
            vSrc:'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=182072&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
            play:false
        }
    },
    methods:{
        open(url){
            // this.vSrc = url;
            // this.show = true;
        },
        close(){
            // this.show = false;
            this.$emit('close')
        }
    }
}
</script>