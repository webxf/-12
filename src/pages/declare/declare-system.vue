<template>
    <view class="container">
        <u-search placeholder="请输入搜索关键字" :show-action="false" bgColor="#fff" searchIconColor="#92939A" placeholderColor="#92939A" v-model="form.xtmc" @search="getData" @clickIcon="getData"></u-search>
        <u-tabs :list="tabList" @change="tabChange"></u-tabs>
        <view class="content">
            <view class="card-box" v-for="(item,index) in tableData" :key="index">
                <card>
                    <u--form labelPosition="left" labelWidth="80">
                        <u-form-item label="系统名称：">
                            <text>{{ item.xtmc }}</text>
                        </u-form-item>
                        <u-form-item label="填报最后期限：">
                            <text>{{ item.tbzhqx }}</text>
                        </u-form-item>
                        <u-form-item label="状态：">
                            <u-radio-group v-model="item.sfyd">
                                <u-radio shape="circle" name='是' label="已完成"></u-radio>
                                <u-radio shape="circle" name='否' :customStyle="{marginLeft: '8px'}" label="未完成"></u-radio>
                            </u-radio-group>
                        </u-form-item>
                    </u--form>
                    <view slot="footer" >
                        <view class="flex-end">
                            <u-button type="primary" size="mini" shape="circle" text="确 定"></u-button>
                        </view>
                    </view>
                </card> 
            </view>
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
        Card
    },
    data(){
        return{
            form:{
                sfyd:'0',
                xtmc:'',
                pageSize: 10,
                pageNo: 1,
            },
            tableData:[],
            queryParams:{
                key:''
            },
            tabList:[
                {name: '需填报'},
                {name: '已填报'},
            ],
            loadStatus: 'loadmore'
        }
    },
    onLoad(){
        this.getData()
    },
    methods:{
        tabChange(e){
            this.form.pageNo = 1
            this.form.sfyd = e.index
            this.getData()
        },
        getData(){
            let params = {
                ...this.form,
            }
            this.loadStatus = 'loading'
            this.$service.declare.getPageSbjl(params).then(res=>{
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
.flex-end{
    display: flex;
    justify-content: flex-end;
}
.content{
    margin-top: 30rpx;
    .card-box{
        margin-bottom: 30rpx;
    }
}
</style>