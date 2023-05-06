<template>
    <view class="container">
        <u-sticky bgColor="#fff">
            <u-search v-model="form.dwmc" placeholder="请输入点位名称搜索" :show-action="false" bgColor="#fff" searchIconColor="#92939A" placeholderColor="#92939A"></u-search>
            <u-tabs :list="tabList" @change="tabChange"></u-tabs>
        </u-sticky>
       
        <view class="card" v-for="(item,index) in tableData" :key="index">
            <card>
                <u--form labelPosition="left" labelWidth="80">
                    <u-form-item label="预警来源：">
                        <text>{{ item.bjly || '' }}</text>
                    </u-form-item>
                    <u-form-item label="预警时间：">
                        <text>{{ item.bjsj || '' }}</text>
                    </u-form-item>
                    <u-form-item label="报警点位：">
                        <text>{{ item.bjdw || '' }}</text>
                    </u-form-item>
                    <u-form-item label="报警状态：">
                        <text>{{ item.bjlx || '' }}</text>
                    </u-form-item>
                    <u-form-item label="处置状态：">
                        <text>{{ item.zt || '' }}</text>
                    </u-form-item>
                    <u-form-item label="报警原因：">
                        <text>{{ item.bjyy || '' }}</text>
                    </u-form-item>
                </u--form>
                <view slot="footer" >
                    <view class="flex-end">
                        <u-button type="primary" @click="handleRectify(item)" plain class="btn mar-right" size="mini" shape="circle" text="去整改"></u-button>
                        <!-- <u-button type="primary" @click="handleAssign" class="btn" size="mini" shape="circle" text="去分派"></u-button> -->
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
                {name: '未处理'},
                {name: '已派发'},
                {name: '处理中'},
                {name: '已完成'},
            ],
            tableData:[],
            queryParams:{},
            popupShow:false,
            form:{
                pageSize:10,
                pageNo:1,
                dwmc:'',
                zt:'未处理',
            },
            loadStatus:'loadmore',
        }
    },
    onShow () {
        this.getData()
    },
    methods:{
        tabChange(item){
            this.form.zt = item.name
            this.form.pageNo = 1
            this.getData()
        },
        getData(){
            this.loadStatus = 'loading'
            let params = {
                ...this.form,
            }
            this.$service.popLink.getSjyjPage(params).then(res=>{
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
                this.$service.popLink.getSjyjPage(params).then(res=>{
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
            uni.setStorageSync('sjyjData',item)
            uni.navigateTo({
                url:'/packPages/government-enterprise/warning-rectify?bjbh='+item.bjbh
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
    margin: 0;
}
::v-deep .u-button--plain{
    margin-right: 20rpx !important;
}
.flex-end{
    display: flex;
    justify-content: flex-end;
}
.card{
    margin-top: 30rpx;
}

</style>