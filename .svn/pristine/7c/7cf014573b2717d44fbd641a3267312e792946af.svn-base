<template>
    <u-popup :show="show" mode="center" round="12" :safeAreaInsetBottom="false" @close="close">
        <view class="popup-content">
            <view class="popup-body">
                <u--form labelPosition="left" labelWidth="80" :model="form">
                    <u-form-item label="是 否">
                        <u-radio-group v-model="form.sfcz" :disabled="type==='view'">
                            <u-radio label="是" name="0"></u-radio>
                            <u-radio label="否" name="1"></u-radio>
                        </u-radio-group>
                    </u-form-item>
                    <u-form-item label="情况说明">
                        <u--textarea placeholder="请输入情况说明" :disabled="type==='view'" border="surround" v-model="form.qksm"></u--textarea>
                    </u-form-item>
                    <u-form-item label="附件上传">
                        <u-upload :fileList="fileList" :disabled="type==='view'" multiple @afterRead="upLoadAfterRead" @delete="upLoadDelete"
                            :maxCount="1" width="50" height="50" accept="image"></u-upload>
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
import location from '@/utils/locationUrl'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            location,
            type:'edit',
            fileList: [],
            form: {
                fjs:[]
            },
            show: false,
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    methods: {
        open (data) {
            this.fileList = [];
            this.show = true;
            // 判断是否为批量操作 info 为undefined 则为批量
            if(data.info){
                this.type = data.type;
                this.form = data.info;
            }else{
                this.form={
                    fjs:[],
                    option:'0',
                    problemId:null,
                    qksm:'',
                    sfcz:'1'
                };
            }
            if(data.type==='view'){
                data.info.fjs.map(item=>{
                    this.fileList.push({ status: 'success',url: this.location.locatioUrl +'/qyjg/auth/getImage?fileId='+item.fileId})
                });
            }
        },
        cancel () {
            this.$emit('cancel')
            this.show = false;
        },
        confirm () {
            this.form.option = 1;
            this.$emit('confirm', {type:this.type,form:this.form})
            this.show = false
        },
        async upLoadAfterRead (event) {
            let lists = [].concat(event.file);
            let fileListLen = this.fileList.length;
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
        upLoadDelete () {
            this.form.fjs = [];
            this.fileList.splice(0, 1);
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
                        type: 'xqfk',
                    },
                    success: (res) => {
                        setTimeout(() => {
                            let data = JSON.parse(res.data);
                            this.form.fjs.splice(0,1,data.data);
                            resolve(this.location.locatioUrl+data.data.realName);
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
.popup-content {
    width: 600rpx;
}

.popup-body {
    padding: 20rpx 40rpx;
    box-sizing: border-box;
}

.popup-footer {
    display: flex;
    border-top: 1px solid #EBEDF0;

    .cancel,
    .confirm {
        flex: 1;
        text-align: center;
        line-height: 90rpx;
    }

    .interval {
        width: 1px;
        height: 90rpx;
        background: #EBEDF0;
    }

    .confirm {
        color: #1985FE;
    }
}

::v-deep .u-safe-area-inset-bottom {
    padding-bottom: 0px !important;
}
</style>