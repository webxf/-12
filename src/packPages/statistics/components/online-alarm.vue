<template>
  <view class="online-alarm">
    <!-- <uni-data-checkbox mode="tag" v-model="radio2" :localdata="sex" @change="select" style="padding:10px"></uni-data-checkbox> -->
     <u--form labelPosition="left" labelWidth="40" :model="queryParams" style="display:flex;align-items:center">
          <u-form-item label="时间" @click="timePicker = true" style="margin-left:10px">
             <u--input v-model="queryParams.kssj" suffixIcon="arrow-down" disabled
              disabledColor="#ffffff" placeholder="请选择日期" style="width:240rpx;height:15px"></u--input>
             </u-form-item>
             <u-form-item label="点位" style="margin-left:10px">
              <input placeholder="请输入点位信息" style="border:1px solid #ccc;width:240rpx;height:26px;border-radius:5px;font-size:13px;background:#fff;padding-left:5px"/>
              </u-form-item>
      </u--form>
      <card :titleStyle="titleStyle" class="cardStyle" v-for="(item,index) in alarmList" :key="index">
			<view class="item-text">
			    <text>预警类型：</text>
			    <text>{{item.sjlx}}</text>
			</view>
			<view class="item-text">
			    <text>预警点位：</text>
			    <text>{{item.jcdw}}</text>
			</view>
			<view class="item-text">
			    <text>预警时间：</text>
			    <text>{{item.bjsj}}</text>
			</view>
			<view class="item-text">
			    <text>预警状态：</text>
			    <text>{{item.zt}}</text>
			</view>
			<view class="item-text">
			    <text>预警原因：</text>
			    <text>{{item.ybjyy}}</text>
			</view>
        <view class="item-text">
          <view class="btn" v-for="(i,index) in item.btns" :key="index">
        <button @click="goDispose(item.bjbh)" v-if="i=='xq'">详情</button>
        <button v-if="i=='qs'">签收</button>
        <button v-if="i=='cz'" @click="alarmEdit(item.bjbh)">处置</button>
        <!-- <button @click="show = true">下派</button> -->
         <!-- <button @click="alarmEdit">修改</button> -->
        </view>
        </view>
		</card>
     <!-- <card :title="info.qymc" :titleStyle="titleStyle">
			<view class="item-text">
			    <text>预警类型:</text>
			    <text>{{info.fddbr}}</text>
			</view>
			<view class="item-text">
			    <text>预警点位:</text>
			    <text>{{info.hbfzr}}</text>
			</view>
			<view class="item-text">
			    <text>预警时间:</text>
			    <text>{{info.lxfs}}</text>
			</view>
			<view class="item-text">
			    <text>预警状态：</text>
			    <text>{{info.tyshxydm}}</text>
			</view>
			<view class="item-text">
			    <text>预警原因：</text>
			    <text>{{info.tyshxydm}}</text>
			</view>
        <view class="item-text">
          <view class="btn">
        <button>详情</button>
        <button @click="alarmEdit">修改</button>
        </view>
        </view>
		</card> -->
     <!-- <u-popup :show="show" :round="4" mode="center" @close="close" @open="open" style="width:96%">
		<view class="pop-show">新增巡检</view>
		<view class="ipt"  style="padding:0 0 10px 10px">
        <view class="pop-ipt" style="margin-bottom:10px">派发部门</view>
     <uni-data-select
                   v-model="value"
                   :localdata="range"
                   style="width:96%"
                   ></uni-data-select>
   <view class="pop-ipt" style="margin:10px 0">派发人员</view>
         <uni-data-select
                   v-model="value"
                   :localdata="range"
                   style="width:96%"
                   ></uni-data-select>
   <view class="pop-ipt" style="margin:10px 0">完成时间</view>
        <u--input v-model="queryParams.kssj" suffixIcon="arrow-down" suffixIconStyle="color: #909399" disabled
              disabledColor="#ffffff" placeholder="请选择日期" style="width:90%"></u--input>
              <view style="display:flex;justify-content:center">
              <button class="pop-btn" @click="show = false">取消</button>
              <button class="pop-btn" style="margin-left:20px">下派</button>
              </view>
        </view>
	</u-popup> -->
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
 data(){
        return {
          sex: [{
					text: '全部',
					value: 0
				}, {
					text: '未处理',
					value: 1
				}, {
					text: '已完成',
					value: 2
				}],
        radio2:0,
          titleStyle: {
                fontSize: '28rpx',
                color: '#2C8BFF',
                textAlign: 'center'
            },
            info:{},
            queryParams: {sjlx:1,pageNo:1,pageSize:10,pkmc:'',pkbh:'',pklx:''},
            show:false,
        alarmList:[],
        btns:[],
        timePicker: false,
        outletColumns:[]
        }
    },
    mounted(){
      this.getAlarmList(),
      this.getOutletColumns();
    },
    methods:{
        // close() {
        // this.show = false;
        // },
        //获取数据列表
      async getAlarmList(){
          const res = await  this.$service.statistics.getAlarmList(this.queryParams)
          this.alarmList = res.data
        },
        //点击进入报警处置页面
        goDispose(i){
          uni.navigateTo({
              url:`alarm-dispose?bjbh=${i}`
          })
        },
        //点击进入报警编辑页面
        alarmEdit(i){
           uni.navigateTo({
              url:`alarm-edit?bjbh=${i}`
          })
        },
           async getOutletColumns(){
            const res = await this.$service.working.getOutletList();
            this.outletColumns[0] = res.data;
            this.queryParams.pkmc = this.outletColumns[0][0].pkmc;
            this.queryParams.pkbh = this.outletColumns[0][0].pkbh;
            this.queryParams.pklx = this.outletColumns[0][0].pklx;
        },
          timePickerClose () {
            this.timePicker = false
        },
        timePickerConfirm (e) {
            this.timePicker = false;
            this.queryParams.kssj = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
            this.reset();
            this.getAlarmList();
        },
        pickerConfirm(e){
            this.queryParams.pkbh = e.value[0].pkbh;
            this.queryParams.pkmc = e.value[0].pkmc;
            this.show = false;
            this.reset();
            this.getAlarmList();
        },
        pickerClose(){
            this.show = false;
        },
    }
}
</script>

<style lang="scss" scoped>
  .btn {
        display: flex;
        button {
          height: 30px;
          background-color:rgb(22,155,213);
          color: #fff;
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          margin-left: 10px;
          margin-top: 10px;
        }
        button:first-child{
          margin-left:130rpx
        }
    }
    ::v-deep uni-button {
      margin-left: 0;
      margin-right: 0;
    }
    //  ::v-deep .u-popup__content {
    //     width: 90%;
    //     min-height: 300px;
    // }
    .pop-show {
        padding:15px;
        font-size:18px;
        font-weight: bold;
    }
    .pop-btn {
       width: 30%;
        background-color: #169BD5;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-size:14px;
        margin-top:10px;
        ::v-deep uni-button {
            margin-left: 0;
            margin-right: 0;
        }
    }
    .cardStyle {
          margin-left:10px;
          width:94%;
          margin-top:10px;
    }
    .card-box {
    margin-top: 30rpx;
}
</style>