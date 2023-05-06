<template>
    <view class="container">
        <!-- <u-search v-model="queryParams.key" placeholder="请输入搜索关键字" :show-action="false" bgColor="#fff"
            searchIconColor="#92939A" placeholderColor="#92939A"></u-search> -->
        <view>
            <card :title="queryParams.pkmc" :value="queryParams.pklx" :titleStyle="titleStyle" :valueStyle="titleStyle">
                <u--form labelPosition="left" labelWidth="80" :model="queryParams">
                    <u-form-item label="开始时间：" @click="timePicker = true">
                        <u--input v-model="queryParams.kssj" suffixIcon="arrow-down" suffixIconStyle="color: #909399" disabled
                            disabledColor="#ffffff" placeholder="请选择项目开始时间"></u--input>
                    </u-form-item>
                    <u-form-item label="排口名称：" @click="show = true">
                        <u--input v-model="queryParams.pkmc" suffixIcon="arrow-down" suffixIconStyle="color: #909399" disabled
                            disabledColor="#ffffff" placeholder="请选择项目结束时间"></u--input>
                    </u-form-item>
                </u--form>
            </card>
        </view>
        <view class="tag-box">
            <u-tag text="分均" @click="switchTab(1)" :type="queryParams.sjlx==1?'primary':'info'" plain shape="circle"></u-tag>
            <u-tag text="时均" @click="switchTab(2)" :type="queryParams.sjlx==2?'primary':'info'" plain shape="circle"></u-tag>
            <u-tag text="日均" @click="switchTab(3)" :type="queryParams.sjlx==3?'primary':'info'" plain shape="circle"></u-tag>
        </view>
        <view class="content" v-if="monitorList.length>0">
            <view class="card-box" v-for="(item,index) in monitorList" :key='index'>
                <card :title="queryParams.pkmc" :value="queryParams.pklx" :titleStyle="titleStyle" :valueStyle="titleStyle">
                    <!-- <view slot="header" class="card-header">
                        <view class="card-header-content">
                            <view>监测时间</view>
                            <view>总经（mg/m）</view>
                        </view>
                    </view>
                    <view class="card-body">
                        <view>2022-11-23 11:10:32</view>
                        <view>0.57</view>
                        <view>2022-11-23 11:10:32</view>
                        <view>0.57</view>
                        <view>2022-11-23 11:10:32</view>
                        <view>0.57</view>
                    </view> -->
                    <u--form labelPosition="left" labelWidth="100">
                        <u-form-item :label="iitem.label" v-for="(iitem,iindex) in item" :key="iindex">
                            <text style="text-align:right;">{{iitem.value}}</text>
                        </u-form-item>
                    </u--form>
                </card>
            </view>
            <view class="more">
                <u-loadmore :status="loadStatus ? 'loading' : 'nomore'" height="50"  :line="true" />
            </view>
        </view>
        <view class="empty" v-else>
            <u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png" text="暂无监测数据"></u-empty>
        </view>
        <u-datetime-picker :show="timePicker" mode="date" @cancel="timePickerClose" @confirm="timePickerConfirm"></u-datetime-picker>
        <u-picker :show="show" :columns="outletColumns" keyName="pkmc" @cancel="pickerClose" @confirm="pickerConfirm"></u-picker>
    </view>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
    components: {
        Card
    },
    data () {
        return {
            queryParams: {sjlx:1,pageNo:1,pageSize:10,pkmc:'',pkbh:'',pklx:''},
            outletColumns: [],
            loadStatus:false,
            allPage:1,
            total:0,
            show:false,
            monitorList:[],
            timePicker: false,
            titleStyle: {
                fontSize: '26rpx',
                color: '#2C8BFF',
                fontWeight: '600'
            },
        }
    },
    onLoad(){
        this.initData();
    },
    onReachBottom () {
        if (this.queryParams.pageNo < this.allPage) {
            this.queryParams.pageNo += 1;
            this.getMonitorData();
        }
    },
    methods: {
        initData(){
            this.getOutletColumns();
            this.getMonitorData();
        },
        async getOutletColumns(){
            const res = await this.$service.working.getOutletList();
            this.outletColumns[0] = res.data;
            this.queryParams.pkmc = this.outletColumns[0][0].pkmc;
            this.queryParams.pkbh = this.outletColumns[0][0].pkbh;
            this.queryParams.pklx = this.outletColumns[0][0].pklx;
        },
        async getMonitorData(){
            this.loadStatus = true;
            const res = await this.$service.working.getMonitorData(this.queryParams);
            this.loadStatus = false;
            let data = res.data;
            let titles = res.titleVos;
            this.total = res.total;
            this.allPage = Math.ceil(res.total / this.queryParams.pageSize); 
            let list = data.map(item=>{
                return titles.map((iitem)=>({label:iitem.name,value:item[iitem.prop]}))
            })
            this.monitorList = this.monitorList.concat(list);
        },
        reset () {
            this.queryParams.pageNo = 1;
            this.queryParams.pageSize = 10;
            this.monitorList = [];
        },
        timePickerClose () {
            this.timePicker = false
        },
        timePickerConfirm (e) {
            this.timePicker = false;
            this.queryParams.kssj = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
            this.reset();
            this.getMonitorData();
        },
        pickerConfirm(e){
            this.queryParams.pkbh = e.value[0].pkbh;
            this.queryParams.pkmc = e.value[0].pkmc;
            this.show = false;
            this.reset();
            this.getMonitorData();
        },
        pickerClose(){
            this.show = false;
        },
        switchTab(e){
            this.queryParams.sjlx = e;
            this.reset();
            this.getMonitorData();
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 0 30rpx;
    background: #f9fafa;
}

.card-box {
    margin-top: 30rpx;
}
.tag-box{
    display: flex;
    justify-content: space-between;
    margin: 30rpx;
    ::v-deep .u-tag--medium{
        padding: 0 60rpx;
    }
}
.card-header{
    padding: 8rpx;
}
.card-header-content{
    padding: 20rpx 40rpx;
    background: #F6F7FB;
    border-radius: 24rpx;
    font-size: 26rpx;
    color: #3E4244;
    font-weight: 600;
}
.card-header-content,.card-body{
    display: grid;
    grid-template-columns: 3fr 2fr;
}
.card-body{
    font-size: 24rpx;
    color:#ACACAC;
    padding: 0 20rpx;
}
</style>