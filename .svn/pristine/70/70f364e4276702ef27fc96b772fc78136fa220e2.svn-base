<template>
    <view class="container">
        <card title="任务状态" value="新增节点" :titleStyle="titleStyle" :valueStyle="titleStyle" @valueClick="addNode()">
            <u--form labelPosition="left" labelWidth="80" :model="form">
                <u-form-item label="项目名称：">
                    <text>{{form.xmmc}}</text>
                </u-form-item>
                <u-form-item label="开始时间：" @click="openTimePicker('xmkssj')">
                    <u--input v-model="form.xmkssj" suffixIcon="arrow-down" suffixIconStyle="color: #909399" disabled disabledColor="#ffffff" placeholder="请选择项目开始时间" ></u--input>
                </u-form-item>
                <u-form-item label="结束时间：" @click="openTimePicker('xmjssj')">
                    <u--input v-model="form.xmjssj" suffixIcon="arrow-down" suffixIconStyle="color: #909399" disabled disabledColor="#ffffff" placeholder="请选择项目结束时间"></u--input> 
                </u-form-item>
            </u--form>
        </card>
        <view class="mar-top" v-for="(item,i) in form.jds" :key="item.jdmc + i">
            <card>
                <u--form labelPosition="left" labelWidth="80" :model="form.jds[i]">
                    <u-form-item label="节点名称：">
                        <text>{{form.jds[i].jdmc}}</text>
                    </u-form-item>
                    <u-form-item label="节点内容：">
                        <u--textarea v-model="form.jds[i].jdnr" placeholder="请输入内容" ></u--textarea>
                    </u-form-item>
                    <u-form-item label="相关附件：">
                        <u-upload :fileList="form.jds[i].fileList" :name="i+''" :maxCount="1" @afterRead="upLoadAfterRead" @delete="upLoadDelete"></u-upload>
                    </u-form-item>
                </u--form>
                <view>
                    <u-button class="btn" type="primary" shape="circle" text="确 定" @click="handleFill(i)"></u-button>
                </view>
            </card>
        </view>
        <!-- <view class="btn-box">
            <u-button class="btn" type="primary" shape="circle" text="确 定" @click="handleFill"></u-button>
        </view> -->
        <AddNode ref="addNodeRef" @confirm="confirm"></AddNode>
        <u-datetime-picker :show="timePicker" @cancel="timePickerClose" @confirm="timePickerConfirm" mode="date"></u-datetime-picker>
    </view>
</template>

<script>
import AddNode from './components/AddNode.vue'
import Card from '@/components/Card.vue'
import location from '@/utils/locationUrl'
import { mapGetters } from 'vuex'
export default{
    components:{
        AddNode,
        Card
    },
    data(){
        return{
            location,
            xmbh:'',
            titleStyle:{
                fontSize:'26rpx',
                color:'#2C8BFF',
                fontWeight:'600'
            },
            form:{
                jds:[{}]
            },
            fileList:[],
            timePickerKey:'',
            timePicker:false
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    onLoad(options){
        this.xmbh = options.xmbh
        this.initData() 
    },
    onShow(){
        
    },
    methods:{
        initData(){
             this.getProjectDetails()
        },
        async getProjectDetails(){
            const res = await this.$service.archives.getProjectDetails({xmbh:this.xmbh})
            let data = res.data;
            if(data && data.jds.length>0){
                res.data.jds.map(item=>{
                    item.fileList = item.fjs.map(iitem=>({url:this.location.locatioUrl +'/qyjg/auth/getImage?fileId='+iitem.fileId,status:'success'}))
                })
            }
            this.form = data;
        },
        openTimePicker(key){
            this.timePickerKey = key;
            this.timePicker = true;
        },
        timePickerClose(){
            this.timePicker = false
        },
        timePickerConfirm(e){
            this.form[this.timePickerKey] = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
            this.timePicker = false
        },
        addNode(){
            this.$refs.addNodeRef.open();
        },
        async confirm(e){
            let obj = {
                jdmc:e.jdmc,
                jdsj:e.jdsj,
                jdnr:"",
                fjs:[],
                fileList:[]
            }
            this.form.jds.push(obj);
            await this.$service.archives.postProjectEdit(this.form);
            this.getProjectDetails();
        },
        async upLoadAfterRead (event) {
            let lists = [].concat(event.file)
            lists.map((item) => {
                this.form.jds[event.name].fileList.push({
                    ...item,
                    status: 'uploading',
                    message: '上传中'
                })
            })
            for (let i = 0; i < lists.length; i++) {
                const result = await this.uploadFilePromise(lists[i].url,event.name)
                let item = this.form.jds[event.name].fileList[0]
                this.form.jds[event.name].fileList.splice(0, 1, Object.assign(item, {
                    status: 'success',
                    message: '',
                    url: result
                }))
            }
        },
        uploadFilePromise (url,index) {
            return new Promise((resolve, reject) => {
                let a = uni.uploadFile({
                    url: this.location.locatioUrl+'/qyjg/common/upOfficeFile',
                    filePath: url,
                    name: 'file',
                    header: {
                        "Authorization": this.token
                    },
                    formData: {
                        type: 'xqfk'
                    },
                    success: (res) => {
                        setTimeout(() => {
                            let data = JSON.parse(res.data);
                            this.form.jds[index].fjs.splice(0,1,data.data)
                            resolve(this.location.locatioUrl+'/qyjg/auth/getImage?fileId='+data.data.fileId)
                        }, 1000)
                    },
                    fail: (err) => {
                        console.log(err)
                    }
                });
            })
        },
        upLoadDelete (event) {
            this.form.jds[event.name].fjs = [];
            this.form.jds[event.name].fileList.splice(0.1);
        },
        async handleFill(i){
            const res = await this.$service.archives.postJdSave(this.form.jds[i]);
            if(res.code==200){
                uni.showToast({
                    title:res.data,
                    icon:'success',
                })
            }else{
                uni.showToast({
                    title:res.data,
                    icon:'none',
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.mar-top{
    margin-top: 30rpx;
}
.container{
    padding: 30rpx 30rpx 130rpx 30rpx;
    background: #F9FAFA;
}
.btn-box {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0 40rpx 40rpx 40rpx;
    background: #F9FAFA;
    // ::v-deep .u-button {
    //     width: 500rpx;
    // }
}
</style>