<template>
    <view class="container">
        <u-search placeholder="请输入搜索关键字" :show-action="false" bgColor="#fff" searchIconColor="#92939A" placeholderColor="#92939A" v-model="form.sbptName" @search="getData" @clickIcon="getData"></u-search>
        <view class="card-box" v-for="(item,index) in tableData" :key="index">
            <card>
                <u--form labelPosition="left" labelWidth="80" :model="form">
                    <u-form-item label="系统名称：">
                        <text>{{ item.sbptName }}</text>
                    </u-form-item>
                    <u-form-item label="账号：">
                        <text>{{ item.zh }}</text>
                    </u-form-item>
                    <u-form-item label="密码：">
                        <text>{{ item.mm }}</text>
                    </u-form-item>
                </u--form>
                <view slot="footer" >
                    <view class="flex-end">
                        <u-button type="primary" plain size="mini" shape="circle" text="查 看" @click="openPop(item)"></u-button>
                        <!-- <u-button type="primary" size="mini" shape="circle" text="确 定"></u-button> -->
                    </view>
                </view>
            </card>
        </view>
        <view class="more" @click="loadingMore">
            <u-loadmore :status="loadStatus" height="50" :line="true" />
        </view>

        <PopAccount ref="PopAccountRef" :form="item"></PopAccount>
    </view>
</template>
<script>
import Card from '@/components/Card.vue'
import PopAccount from './components/popAccount.vue'
export default{
    components:{
        Card,
        PopAccount
    },
    data(){
        return{
            form:{
                sbptName:'',
                pageSize: 10,
                pageNo: 1,
            },
            tableData:[],
            queryParams:{
                sbptName:''
            },
            item:{},
            loadStatus: 'loadmore'
        }
    },
    onLoad(){
        this.getData()
    },
    methods:{
        openPop(item){
            this.item = item
            this.$refs.PopAccountRef.open()
        },
        getData(){
            this.form.pageNo = 1
            let params = {
                ...this.form,
            }
            this.loadStatus = 'loading'
            this.$service.declare.getPageSbpt(params).then(res=>{
                if(res.code == 200) {
                    this.tableData = res.data || []
                    if(res.pageNo*res.pageSize>=res.total) {
                        this.loadStatus = 'nomore'
                    } else {
                        this.loadStatus = 'loadmore'
                    }
                }
            })
        },
        loadingMore(){
            if(this.loadStatus != 'nomore') {
                this.form.pageNo++
                this.loadStatus = 'loading'
                let params = {
                    ...this.form,
                }
                this.$service.declare.getPageSbpt(params).then(res=>{
                    if(res.code == 200) {
                        this.tableData.push(...res.data)
                        if(res.pageNo*res.pageSize>=res.total) {
                            this.loadStatus = 'nomore'
                        } else {
                            this.loadStatus = 'loadmore'
                        }
                    }
                })
            }
        },
    }
}
</script>

<style lang="scss" scoped>

.container{
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}

::v-deep .u-button{
    width: 120rpx !important;
    margin: 0 !important;
}
::v-deep .u-button--plain{
    margin-right: 20rpx !important;
}
.flex-end{
    display: flex;
    justify-content: flex-end;
}

.card-box{
    margin-top: 30rpx;
}

</style>