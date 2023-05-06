<template>
    <view class="container">
        <u-toast ref="uToast"></u-toast>
        <!-- <u-tabs :list="tabList"></u-tabs> -->
        <view class="card">
            <card>
                <u--form labelPosition="left" labelWidth="100" :model="form">
                    <u-form-item label="预警来源：">
                        <text>{{ sjyjData.bjly }}</text>
                    </u-form-item>
                    <u-form-item label="报警时间：">
                        <text>{{ sjyjData.bjsj }}</text>
                    </u-form-item>
                    <u-form-item label="预警点位：">
                        <text>{{ sjyjData.bjdw }}</text>
                    </u-form-item>
                    <u-form-item label="报警内容：">
                        <!-- <u--textarea v-model="form.name" placeholder="请输入内容" ></u--textarea> -->
                        <text>{{ sjyjData.bjyy }}</text>
                    </u-form-item>
                    <view  v-for="(item,index) in details.logs" :key="index">
                        <u-form-item :label="`整改进度${index+1}：`">
                            <u--textarea v-if="item.type=='new'" v-model="item.clnr" placeholder="请输入内容" ></u--textarea>
                            <text v-else>{{ item.log }}</text>
                        </u-form-item>
                        <u-form-item label="相关附件：">
                            <u-upload v-if="item.type=='new'" :fileList="fileList" multiple @afterRead="(res)=>upLoadAfterRead(index,res)" @delete="(eve)=>upLoadDelete(index,eve)" accept="image" width="70" height="70"></u-upload>
                            <u-album v-if="item.type!='new'&&item.fileInfoVos" :urls="item.fileInfoVos.map(e=>{
                                return {url:location.locatioUrl+'/qyjg/auth/getImage?fileId='+e.fileId}
                            })" keyName="url"></u-album>
                        </u-form-item>
                    </view>
                    <u-form-item>
                        <u-checkbox-group
                            v-model="sfwc"
                            placement="column"
                            @change="checkboxChange"
                        >
                            <u-checkbox
                                :customStyle="{marginBottom: '8px'}"
                                label="勾选代表任务处置完成"
                                :name="1"
                            >
                            </u-checkbox>
                        </u-checkbox-group>
                    </u-form-item>
                </u--form>
            </card> 
        </view>
        <view style="margin-top: 25px;" v-if="details.sfwc!='1'">
            <u-button type="primary" plain text="+ 添加进度" @click="addJd"></u-button>
        </view>
        <view class="btn-box" v-if="details.sfwc!='1'">
            <!-- <u-button class="btn" type="primary" shape="circle" plain text="保存数据"></u-button> -->
            <u-button class="btn" type="primary" shape="circle" text="确定" @click="save"></u-button>
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
            sjyjData:{},
            details:{
                logs:[],
            },
            sfwc:[],
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    onLoad(obj){
        this.sjyjData = uni.getStorageSync('sjyjData')
        this.getDetails(obj)
    },
    methods:{
        getDetails(obj){
            let params = {
                bjbh: obj.bjbh
            }
            this.$service.popLink.getSjyjDetail(params).then(res=>{
                if(res.code == 200) {
                    this.details = res.data || {}
                    if(this.details.sfwc == '1') {
                        this.sfwc = [1]
                    }
                }
            })
            
        },
        addJd(){
            this.details.logs.push({
                clnr:'', fileInfoVos:[], type:'new' 
            })
        },
        save(){
            this.details.logs.forEach(e=>{
                if(e.type == 'new') {
                    let params = {
                        bjbh: this.sjyjData.bjbh,
                        clnr: e.clnr,
                        fileInfoVos: e.fileInfoVos
                    }
                    this.$service.popLink.SjyjDeal(params).then(res=>{
                        if(res.code == 200) {
                            this.getDetails(this.sjyjData)
                            this.$refs.uToast.show({
                                type: 'success',
                                title: '成功主题(带图标)',
                                message: "操作成功",
                            })
                        }
                    })
                }
            })
            if(this.sfwc.length>=1) {
                let params = {
                    bjbh: this.sjyjData.bjbh,
                    clnr: '任务处置完成',
                    sfwc: 1,
                }
                this.$service.popLink.SjyjDeal(params).then(res=>{
                    if(res.code == 200) {
                        this.getDetails(this.sjyjData)
                    }
                })
            }
        },
        checkboxChange(){
        },
        async upLoadAfterRead (index,event) {
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
                const result = await this.uploadFilePromise(index,lists[i].url)
                let item = this.fileList[fileListLen]
                this.fileList.splice(fileListLen, 1, Object.assign(item, {
                    status: 'success',
                    message: '',
                    url: result
                }))
                fileListLen++
            }
        },
        upLoadDelete (index,event) {
            this.details.logs[index].fileInfoVos.splice(event.index, 1);
            this.fileList.splice(event.index, 1);
        },
        uploadFilePromise (index,url) {
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
                                this.details.logs[index].fileInfoVos.push(data.data)
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
.card{
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
    margin-top: 80rpx;
    // position: fixed;
    // left: 0;
    // bottom: 0;
    display: flex;
    padding: 0 40rpx 40rpx 40rpx;
    justify-content: space-between;
    ::v-deep .u-button{
        width: 250rpx;
    }
}
</style>