<template>
    <view class="container">
        <u-search placeholder="请输入搜索关键字" :show-action="false" @search="handleSearch" @clickIcon="handleSearch" bgColor="#fff" searchIconColor="#92939A" placeholderColor="#92939A" v-model="queryParams.xmmc"></u-search>
        <!-- <u-tabs :list="tabList"></u-tabs> -->
        <view v-if="list.length > 0">
            <view class="card-box" v-for="item in list" :key="item.xmbh">
                <card class="card" title="任务状态" value="节点填报" :titleStyle="titleStyle" :valueStyle="titleStyle" @valueClick="handleFill(item.xmbh)">
                    <u--form labelPosition="left" labelWidth="100" :model="item">
                        <u-form-item label="项目名称：">
                            <text>{{item.xmmc}}</text>
                        </u-form-item>
                        <!-- <u-form-item label="项目联系人：">
                            <text>张兴</text>
                        </u-form-item>
                        <u-form-item label="联系电话：">
                            <text>{{item.}}</text>
                        </u-form-item> -->
                        <u-form-item label="服务单位：">
                            <text>{{item.fwdwmc}}</text>
                        </u-form-item>
                        <u-form-item label="项目内容：">
                            <text>{{item.xmnr}}</text>
                        </u-form-item>
                    </u--form>
                </card>
            </view>
            <view class="more">
                <u-loadmore :status="loadStatus ? 'loading' : 'nomore'" height="50" :line="true" />
            </view>
        </view>
        <view class="empty" v-else>
            <u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
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
            queryParams:{
                xmmc:'',
                pageNo: 1,
                pageSize: 10,
                sffy:1
            },
            list:[],
            total:0,
            allPage:1,
            loadStatus:false,
            form:{},
            tabList:[
                {name: '需填报'},
                {name: '已填报'},
            ],
            titleStyle:{
                fontSize:'26rpx',
                color:'#2C8BFF',
                fontWeight:'600'
            },
        }
    },
    onShow(){
        this.getProjectList()
    },
    onReachBottom () {
        if (this.queryParams.pageNo < this.allPage) {
            this.queryParams.pageNo += 1;
            this.getProjectList();
        }
    },
    methods:{
        async getProjectList(){
            this.loadStatus = true
            const res = await this.$service.archives.getProjectList(this.queryParams)
            this.loadStatus = false
            this.total = res.total;
            this.allPage = Math.ceil(res.data.total / this.queryParams.pageSize);
            this.list = this.list.concat(res.data);
        },
        reset () {
            this.queryParams.pageNo = 1;
            this.queryParams.pageSize = 10;
            this.list = [];
        },
        handleSearch(){
            this.reset();
            this.getProjectList();
        },
        handleFill(xmbh){
            uni.navigateTo({
                url:'/pages/archives/node-fill?xmbh='+xmbh
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}
.flex-end{
    display: flex;
    justify-content: flex-end;
}
.card-box{
    margin-top: 30rpx;
}
.btn{
    width: 120rpx !important;
    margin: 0 !important;
}
.empty {
    padding-top: 20%;
}
</style>