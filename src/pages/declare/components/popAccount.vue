<template>
    <u-popup :show="show" mode="center" round="12" :safeAreaInsetBottom="false" @close="close" @open="open">
        <view class="popup-content">
            <view class="popup-body">
                <u--form labelPosition="top" labelWidth="80" :model="form">
                    <u-form-item label="账号">
                        <u--input placeholder="请输入账号" border="surround" v-model="form.zh"></u--input>
                    </u-form-item>
                    <u-form-item label="密码">
                        <u--input placeholder="请输入密码" border="surround" v-model="form.mm"></u--input>
                    </u-form-item>
                </u--form>
            </view>
            <view class="popup-footer">
                <view class="cancel" @click="cancel">取 消</view>
                <view class="interval"></view>
                <view class="confirm" @click="confirm">确 认</view>
            </view>
        </view>
    </u-popup>
</template>

<script>
export default {
    props:{
        form:Object
    },
    data(){
        return{
            // form:{},
            show:false
        }
    },
    methods:{
        open(){
            this.show = true
        },
        close(){
            this.$emit('cancel')
            this.show = false 
        },
        cancel(){
            this.$emit('cancel')
            this.show = false
        },
        confirm(){
            this.$emit('confirm')
            this.show = false
        }
    }
}
</script>

<style lang="scss" scoped>
.popup-content{
    width: 600rpx;
}
.popup-body{
    padding: 20rpx 40rpx;
}
.popup-footer{
    display: flex;
    border-top: 1px solid #EBEDF0;
    .cancel,.confirm{
        flex: 1;
        text-align: center;
        line-height: 90rpx;
    }
    .interval{
        width: 1px;
        height: 90rpx;
        background: #EBEDF0;
    }
    .confirm{
        color: #1985FE;
    }
}
::v-deep .u-safe-area-inset-bottom{
    padding-bottom: 0px !important;
}
</style>