<template>
    <view class="container">
        <u-search v-model="queryParams.key" placeholder="请输入搜索关键字" :show-action="false" bgColor="#fff" searchIconColor="#92939A" placeholderColor="#92939A"></u-search>
        <u-tabs :list="tabList" @change="tabChange"></u-tabs>
        <view class="card-box" v-for="(item,index) in tableData" :key="index">
            <card>
                <u--form labelPosition="left" labelWidth="80" :model="form">
                    <u-form-item label="问题来源：">
                        <text>{{ item.wtly || '' }}</text>
                    </u-form-item>
                    <u-form-item label="下派时间：">
                        <text>{{ item.tbsj || '' }}</text>
                    </u-form-item>
                    <u-form-item label="执法人员：">
                        <text>{{ item.zfryxm || '' }}</text>
                    </u-form-item>
                    <u-form-item label="问题类型：">
                        <text>{{ item.wtlx || '' }}</text>
                    </u-form-item>
                    <u-form-item label="存在问题：">
                        <text>{{ item.czwt || '' }}</text>
                    </u-form-item>
                </u--form>
                <view slot="footer" >
                    <view class="flex-end">
                        <u-button type="primary" @click="handleRectify(item)" plain size="mini" shape="circle" text="去整改"></u-button>
                        <!-- <u-button type="primary" @click="handleAssign"  size="mini" shape="circle" text="去分派"></u-button> -->
                    </view>
                </view>
            </card>
        </view>
        <view class="more" @click="loadingMore">
            <u-loadmore :status="loadStatus" height="50" :line="true" />
        </view>
    </view>
</template>

<script>
import Card from '@/components/Card.vue'
export default{
    components:{
        Card,
    },
    data(){
        return{
            tabList:[
                {name: '待处理'},
                {name: '进行中'},
                {name: '处理中'},
                {name: '已完成'},
            ],
            queryParams:{},
            popupShow:false,
            form:{
                pageSize:10,
                pageNo:1,
                zgjd:'待处理',
            },
            tableData:[],
            loadStatus:'',
        }
    },
    onLoad(){
        this.getData()
    },
    methods:{
        tabChange(item){
            this.form.zgjd = item.name
            this.form.pageNo = 1
            this.getData()
        },
        getData(){
            this.loadStatus = 'loading'
            let params = {
                ...this.form,
            }
            this.$service.popLink.getZxjcPage(params).then(res=>{
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
                this.$service.popLink.getZxjcPage(params).then(res=>{
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
        handleRectify(item){
            uni.setStorageSync('jdjcData',item)
            uni.navigateTo({
                url:'/packPages/government-enterprise/check-disposition'
            })
        },
        handleAssign(){
            
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 0 30rpx;
    background: #f9fafa;
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