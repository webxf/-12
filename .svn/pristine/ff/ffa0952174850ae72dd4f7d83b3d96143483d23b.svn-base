<template>
    <view class="container">
        <view v-if="list.length > 0">
            <view :class="index>0?'card-box':''" v-for="(item,index) in list" :key="index">
                <card>
					<view class="tit_box">{{item.tzmc}}</view>
					<view class="tit">录入时间：{{item.lrsj}}</view>
					<view class="tit">录入人员：{{item.lrry}}</view>
					<view class="tit">上传凭证：
					   <text>上传文件</text>
					</view>
					<view class="tit">审核人员：{{item.tzmc}}</view>
                    <view slot="footer">
                        <view class="flex-end">
                            <u-button type="primary" size="mini" shape="circle" text="详情" @click="particulars(item)"></u-button>
                            <u-button type="error" size="mini" shape="circle" text="删除" @click="handleDelete(item)"></u-button>
                        </view>
                    </view>
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
import ChechTableEdit from './components/ChechTableEdit.vue';
export default{
    components:{
        Card,
		ChechTableEdit
    },
    data(){
        return{
            queryParams:{
                pageNo: 1,
                pageSize: 10,
                diyId:0
            },
            list:[],
            total:0,
            allPage:1,
            loadStatus:false,
        }
    },
    onReachBottom () {
        if (this.queryParams.pageNo < this.allPage) {
            this.queryParams.pageNo += 1;
            this.getAccountDetails();
        }
    },
    onLoad(options){
        this.queryParams.diyId = options.id;
        this.initData();
    },
    methods:{
        initData(){
            this.getAccountDetails();
        },
        async getAccountDetails(){
            this.loadStatus = true;
            const res = await this.$service.account.pageTable(this.queryParams);
            this.loadStatus = false;
            let data = res.data;
            let titles = res.titleVos;
            this.total = res.total;
            // this.allPage = Math.ceil(res.total / this.queryParams.pageSize);
            // let list = data.map(item=>{
            //     return titles.map((iitem)=>({label:iitem.name,value:item[iitem.prop].dataData,tableId:item[iitem.prop].tableId,hs:item.hs}))
            // })
            // this.list = this.list.concat(list);
			this.list = data
			console.log(this.list,'this.list')
        },
        async handleDelete(item){
			console.log(66,item)
            const res = await this.$service.account.postDeleteAccountDetails({tableId:item.tableId});
            uni.showToast({
                title:res.code==200?'操作成功':res.data,
                icon:res.code==200?'success':'none'
            });
            if(res.code ==200){
                this.reset();
                this.getAccountDetails();
            }
        },
        reset(){
            this.queryParams.pageNo=1;
            this.queryParams.pageSize=10;
            this.list = [];
        },
		
		particulars(item){
			uni.navigateTo({
				url:'/pages/account/particulars?diyId='+ item.diyId + '&tableId='+ item.tableId
			})
		},
		
		
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}
.card-box{
    margin-top: 30rpx;
}
::v-deep .u-button{
    width: 120rpx !important;
    margin: 0 20rpx !important;
	font-size: 20rpx;
}
.tit_box{
	font-weight: 600;
}
.flex-end{
    display: flex;
    justify-content: flex-end;
}
.item-text{
    display: flex;
    font-size: 26rpx;
    & text:first-child{
        color: #3E4244;
        min-width: 25%;
        font-weight: 600;
        text-align: right;
    }
    & text:last-child{
        color:#ACACAC
    }
}
</style>