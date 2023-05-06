<template>
    <view class="container">
        <u-tabs :list="tabList"></u-tabs>
        <view class="card-box">
            <card>
                <u--form labelPosition="left" labelWidth="80" :model="form">
                    <u-form-item label="报警时间：">
                        <text>节点一</text>
                    </u-form-item>
                    <u-form-item label="报警点位：">
                        <text>节点一</text>
                    </u-form-item>
                    <u-form-item label="预警内容：">
                        <u--textarea v-model="form.name" placeholder="请输入内容" ></u--textarea>
                    </u-form-item>
                    <u-form-item label="最新整改：">
                        <u--textarea v-model="form.name" placeholder="请输入内容" ></u--textarea>
                    </u-form-item>
                    <u-form-item label="相关附件：">
                        <u-upload :fileList="fileList" name="1" multiple :maxCount="3"></u-upload>
                    </u-form-item>
                </u--form>
            </card>
        </view>
        <view style="margin-top:25px;">
            <u-button style="marginTop:50rpx" type="primary" plain text="+ 添加进度"></u-button>
        </view>
        <view class="btn-box">
            <u-button class="btn" type="primary" shape="circle" plain text="保存数据"></u-button>
            <u-button class="btn" type="primary" shape="circle" text="确定上传"></u-button>
        </view>
    </view>
</template>

<script>
import Card from '@/components/Card.vue'
export default{
    components:{
        Card
    },
    data(){
        return{
            titleStyle:{
                fontSize:'26rpx',
                color:'#2C8BFF',
                fontWeight:'600',
            },
            form:{},
            fileList:[],
            tabList:[
                {name: '在线预警'},
                {name: '过控预警'},
            ],
        }
    },
    methods:{}
}
</script>
<style lang="scss" scoped>
.container{
    height: 100vh;
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
    box-sizing: border-box;
}
.card-box{
    margin-top: 30rpx;
}
.btn-box{
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    padding: 0 40rpx 40rpx 40rpx;
    justify-content: space-between;
    ::v-deep .u-button{
        width: 250rpx;
    }
}
</style>