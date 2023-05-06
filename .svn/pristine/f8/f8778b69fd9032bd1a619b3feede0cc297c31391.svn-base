<template>
  <view>
    <uni-data-checkbox mode="tag" v-model="radio2" :localdata="sex" @change="select" style="margin:10px 0 0 10px"></uni-data-checkbox>
     <!-- <u--form labelPosition="left" labelWidth="80" :model="queryParams" style="padding:5px 10px 0 10px">
          <u-form-item label="报表时间：" @click="timePicker = true">
             <u--input v-model="queryParams.kssj" suffixIcon="arrow-down" suffixIconStyle="color: #909399" disabled
              disabledColor="#ffffff" placeholder="请选择日期"></u--input>
             </u-form-item>
      </u--form> -->
           <card :titleStyle="titleStyle" style="margin-left:10px;width:94%;margin-top:10px" v-for="(item,index) in reportList" :key="index">
			<view class="item-text" style="display:flex">
			    <text>报表名称：</text>
			    <view class="norwap">{{item.bbmc}}</view>
			</view>
            <view class="item-text">
			    <text>提交时间：</text>
			    <text>{{item.sjc}}</text>
			</view>
			<view class="item-text">
			    <text>报表时间：</text>
			    <text>{{item.createTime}}</text>
			</view>
			<!-- <view class="item-text edit">
			    <view>管理操作：</view>
                <view style="display:flex">
                    <button style="background:rgb(22,155,213)" @click="goDetail">详情</button>
                    <button style="background:rgb(196,196,196)">删除</button>
                </view>
			</view> -->
		</card>
  </view>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
     components: {
        Card
    },
    data(){
        return {
               queryParams: {sjlx:1,pageNo:1,pageSize:10,pkmc:'',pkbh:'',pklx:''},
                 titleStyle: {
                fontSize: '28rpx',
                color: '#2C8BFF',
                textAlign: 'center',
            },
            info:{},
            name:'废气',
              sex: [{
					text: '季报',
					value: 0
				}, {
					text: '年报',
					value: 1
				}],
        radio2:0,
        reportList:[],
        quarter:'quarter',
        year:'year'
        }
    },
    mounted(){
        this.getInfo()
    },
    methods:{
        goDetail(){
            uni.navigateTo({
                url:'report-detail'
            })
        },
        //季度数据
       async getInfo(){
        const res = await  this.$service.statistics.getReportDate({
            bblx:this.quarter
        })
        this.reportList = res.data
        },
        //年数据
        async getYearDate(){
            const res = await  this.$service.statistics.getReportDate({
            bblx:this.year
        })
        },
        select(i){
            if(i.detail.value == 0) {
                this.getInfo()
            }else if(i.detail.value == 1) {
                this.getYearDate()
            }
        },
    }
}
</script>

<style scoped lang='scss'>
    .edit {
        display: flex;
        button {
            height: 30px;
            font-size: 14px;
            margin-left: 10px;
            text-align: center;
            line-height: 30px;
            color: #fff;
        }
    }
    .norwap {
        width: 60%;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
</style>