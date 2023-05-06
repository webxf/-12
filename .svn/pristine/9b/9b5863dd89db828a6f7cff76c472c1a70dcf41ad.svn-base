<template>
  <view class="report-detail">
    <uni-data-checkbox mode="tag" v-model="radio2" :localdata="sex" @change="select" style="margin:5px 0 0 5px;width:94%"></uni-data-checkbox>
   <view v-if="radio2 == 0">
     <view style="color:#5E85DE;padding:5px;font-weight:bold;font-size:18px" @click="go">有组织废气主要排放口</view>
       <card :title="info.qymc" :titleStyle="titleStyle" style="margin-left:10px;width:94%">
			<view class="item-text">
			    <text>排口编码:</text>
			    <text>{{info.fddbr}}</text>
			</view>
			<view class="item-text">
			    <text>排口名称:</text>
			    <text>{{info.hbfzr}}</text>
			</view>
			<view class="item-text">
			    <text>污染因子:</text>
			    <text>{{info.lxfs}}</text>
			</view>
			<view class="item-text">
			    <text>实际排放:</text>
			    <text>{{info.tyshxydm}}</text>
			</view>
		</card>
   </view>
   <view v-if="radio2 == 1">
    <view style="color:#5E85DE;padding:5px;font-weight:bold;font-size:18px">有组织废水主要排放口</view>
       <card :title="info.qymc" :titleStyle="titleStyle" style="margin-left:10px;width:94%">
			<view class="item-text">
			    <text>排口编码:</text>
			    <text>{{info.fddbr}}</text>
			</view>
            <view class="item-text">
			    <text>排口方式:</text>
			    <text>{{info.hbfzr}}</text>
			</view>
			<view class="item-text">
			    <text>排口名称:</text>
			    <text>{{info.hbfzr}}</text>
			</view>
			<view class="item-text">
			    <text>污染因子:</text>
			    <text>{{info.tyshxydm}}</text>
			</view>
            <view class="item-text">
			    <text>实际排放:</text>
			    <text>{{info.tyshxydm}}</text>
			</view>
		</card>
   </view>
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
					text: '废气',
					value: 0
				}, {
					text: '废水',
					value: 1
				}],
        radio2:0,
          titleStyle: {
                fontSize: '28rpx',
                color: '#2C8BFF',
                textAlign: 'center',
            },
            info:{}
        }
    },
    methods:{
        select(i){
            console.log(i);
        },
        go(){
            uni.navigateTo({
                url:'report-list'
            })
        }
    }
}
</script>

<style>

</style>