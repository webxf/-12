<template>
    <view class="container">
        <!-- <u-tabs :list="tabList"></u-tabs> -->
        <u-toast ref="uToast"></u-toast>
        <view class="card-box">
            <card>
                <u--form labelPosition="left" labelWidth="80" :model="form">
                    <u-form-item label="任务来源：">
                        <text>{{ jdjcData.wtly || '' }}</text>
                    </u-form-item>
                    <u-form-item label="下派时间：">
                        <text>{{ jdjcData.tbsj || '' }}</text>
                    </u-form-item>
                    <u-form-item label="问题类型：">
                        <text>{{ jdjcData.wtlx || '' }}</text>
                    </u-form-item>
                    <u-form-item label="存在问题：">
                        <u--textarea v-model="jdjcData.czwt" disabled placeholder="请输入内容" ></u--textarea>
                    </u-form-item>
                    <u-form-item label="最新整改进度：">
                        <u--textarea v-model="jdjcData.zgcs" placeholder="请输入内容" ></u--textarea>
                    </u-form-item>
                    <u-form-item label="问题附件：">
                        <u-upload :fileList="fileList" multiple @afterRead="upLoadAfterRead" @delete="upLoadDelete" accept="image" width="70" height="70"></u-upload>
                    </u-form-item>
                </u--form>
            </card>
        </view>
        
        <view class="btn-box">
            <u-button class="btn" type="primary" shape="circle" plain text="保存数据" @click="save(0)"></u-button>
            <u-button class="btn" type="primary" shape="circle" text="任务完成" @click="save(1)"></u-button>
        </view>
    </view>
</template>

<script>
import Card from '@/components/Card.vue'
import location from '@/utils/locationUrl'
import { mapGetters } from 'vuex'
export default{
    components:{
        Card
    },
    data(){
        return{
            location,
            titleStyle:{
                fontSize:'26rpx',
                color:'#2C8BFF',
                fontWeight:'600'
            },
            form:{},
            fileList:[],
            tabList:[
                {name: '在线预警'},
                {name: '过控预警'},
            ],
            jdjcData:{},
            zps:[]
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    onLoad(obj){
        this.jdjcData = uni.getStorageSync('jdjcData')
        if(this.jdjcData.zps) {
            this.zps = this.jdjcData.zps
            this.fileList = this.jdjcData.zps.map(e=>{
                return {url:this.location.locatioUrl+'/qyjg/auth/getImage?fileId='+e.fileId}
            })
        } else {
            this.fileList = []
            this.zps = []
        }
    },
    methods:{
        save(sfwc){
            let params = {
                zgwtbh: this.jdjcData.zgwtbh,
                zgcs: this.jdjcData.zgcs,
                zps: this.jdjcData.zps,
                sfwc:sfwc
            }
            this.$service.popLink.ZxjcSaveData(params).then(res=>{
                if(res.code == 200) {
                    this.$refs.uToast.show({
                        type: 'success',
                        title: '成功主题(带图标)',
                        message: "操作成功",
                    })
                }
            })
        },
        async upLoadAfterRead (event) {
            let lists = [].concat(event.file)
            let fileListLen = this.fileList.length
            lists.map((item) => {
                this.fileList.push({
                    ...item,
                    status: 'uploading',
                    message: '上传中'
                })
            })
            for (let i = 0; i < lists.length; i++) {
                const result = await this.uploadFilePromise(lists[i].url)
                let item = this.fileList[fileListLen]
                this.fileList.splice(fileListLen, 1, Object.assign(item, {
                    status: 'success',
                    message: '',
                    url: result
                }))
                fileListLen++
            }
        },
        upLoadDelete (event) {
            this.zps.splice(event.index, 1);
            this.fileList.splice(event.index, 1);
        },
        uploadFilePromise (url) {
            return new Promise((resolve, reject) => {
                let a = uni.uploadFile({
                    url: this.location.locatioUrl+'/qyjg/common/upOfficeFile',
                    filePath: url,
                    name: 'file',
                    header: {
                        "Authorization": this.token
                    },
                    formData: {
                        type: 'sjyj'
                    },
                    success: (res) => {
                        setTimeout(() => {
                            let data = JSON.parse(res.data);
                            if(data.code == 200) {
                                this.zps.push(data.data)
                                resolve(this.location.locatioUrl+'/qyjg/auth/getImage?fileId='+data.data.fileId)
                            } else {
                                resolve()
                            }
                        }, 1000)
                    },
                    fail: (err) => {
                        console.log(err)
                    }
                });
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.card-box{
    margin-top: 30rpx;
}
.container{
    height: 100vh;
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
    box-sizing: border-box;
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