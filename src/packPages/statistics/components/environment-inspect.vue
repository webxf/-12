<template>
  <view>
    <u--form
      labelPosition="left"
      labelWidth="40"
      :model="queryParams"
      style="display: flex; align-items: center"
    >
      <u-form-item
        label="时间"
        @click="timePicker = true"
        style="margin-left: 10px"
      >
        <u--input
          v-model="queryParams.kssj"
          suffixIcon="arrow-down"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择日期"
          style="width: 240rpx; height: 15px"
        ></u--input>
      </u-form-item>
      <u-form-item label="状态" style="margin-left: 10px">
        <input
          placeholder="请输入状态"
          style="
            border: 1px solid #ccc;
            width: 240rpx;
            height: 26px;
            border-radius: 5px;
            font-size: 13px;
            background: #fff;
            padding-left: 5px;
          "
        />
      </u-form-item>
    </u--form>
    <card
      :titleStyle="titleStyle"
      style="margin-left: 10px; margin-top: 10px; width: 94%"
      v-for="item in inspectDate"
      :key="item.alertId"
    >
      <view class="item-text">
        <text>巡检名称：</text>
        <text>{{ item.wtmc }}</text>
      </view>
      <view class="item-text">
        <text>巡检类型：</text>
        <text>{{ item.xjlx }}</text>
      </view>
      <view class="item-text">
        <text>巡查时间：</text>
        <text>{{ item.fssj }}</text>
      </view>
      <view class="item-text">
        <text>巡查人员：</text>
        <text>{{ item.xjry }}</text>
      </view>
      <view class="item-text">
        <text>巡检状态：</text>
        <text>{{ item.xjzt }}</text>
      </view>
      <view class="item-text edit">
        <view>巡查操作：</view>
        <view
          style="display: flex"
          v-for="(i, index) in item.btns"
          :key="index"
        >
          <button
            style="background: rgb(22, 155, 213)"
            @click="goDetail(item.alertId)"
            v-if="i == 'xq'"
          >
            详情
          </button>
          <!-- <button style="background:rgb(22,155,213)" @click="goDetail" v-if="i == 'xp'">下派</button> -->
          <button
            style="background: rgb(22, 155, 213)"
            @click="edit(item.alertId)"
            v-if="i == 'cz'"
          >
            处置
          </button>
          <!-- <button style="background:rgb(196,196,196)">删除</button> -->
        </view>
      </view>
    </card>
    <u-popup
      :show="show"
      :round="4"
      mode="center"
      @close="close"
      @open="open"
      style="width: 96%"
    >
      <view class="pop-show">新增巡检</view>
      <view class="ipt" style="padding: 0 0 10px 10px">
        <view class="pop-ipt" style="margin-bottom: 10px">新增巡检</view>
        <view class="add">
          <input border="surround" v-model="value" @change="change" />
        </view>
        <view class="pop-ipt" style="margin: 10px 0">巡检类型</view>
        <!-- <uni-data-select
          v-model="value"
          :localdata="range"
          style="width: 96%"
        ></uni-data-select> -->
        <view class="pop-ipt" style="margin: 10px 0">巡检时间</view>
        <u--input
          v-model="queryParams.kssj"
          suffixIcon="arrow-down"
          suffixIconStyle="color: #909399"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择日期"
          style="width: 90%"
        ></u--input>
      </view>
    </u-popup>
    <u-datetime-picker
      :show="timePicker"
      mode="date"
      @cancel="timePickerClose"
      @confirm="timePickerConfirm"
    ></u-datetime-picker>
    <u-picker
      :show="show"
      :columns="outletColumns"
      keyName="pkmc"
      @cancel="pickerClose"
      @confirm="pickerConfirm"
    ></u-picker>
  </view>
</template>

<script>
import Card from '@/components/Card.vue';
export default {
  components: {
    Card,
  },
  data() {
    return {
      queryParams: {
        sjlx: 1,
        pageNo: 1,
        pageSize: 10,
        pkmc: '',
        pkbh: '',
        pklx: '',
      },
      timePicker: false,

      titleStyle: {
        fontSize: '28rpx',
        color: '#2C8BFF',
        textAlign: 'center',
      },
      info: {},
      show: false,
      value: '',
      inspectDate: [],
      outletColumns: [],
    };
  },
  mounted() {
    this.getInspectDate();
  },
  methods: {
    open() {
      // console.log('open');
    },
    close() {
      this.show = false;
      // console.log('close');
    },
    change(e) {
      console.log('change', e);
    },
    //点击跳转到详情
    goDetail(i) {
      uni.navigateTo({
        url: `environment-detail?alertId=${i}`,
      });
    },
    //点击跳转到编辑
    edit(i) {
      uni.navigateTo({
        url: `edit-patrol?alertId=${i}`,
      });
    },
    //获取巡检数据
    async getInspectDate() {
      const res = await this.$service.statistics.getInspectDate();
      this.inspectDate = res.data;
    },
    timePickerConfirm(e) {
      this.timePicker = false;
      this.queryParams.kssj = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
      this.reset();
      this.getInspectDate();
    },
    pickerConfirm(e) {
      this.queryParams.pkbh = e.value[0].pkbh;
      this.queryParams.pkmc = e.value[0].pkmc;
      this.show = false;
      this.reset();
      this.getInspectDate();
    },
    pickerClose() {
      this.show = false;
    },
  },
};
</script>

<style scoped lang="scss">
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
.btn {
  width: 30%;
  height: 40px;
  background-color: rgb(22, 155, 213);
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  bottom: 20px;
  left: 35%;
}
.contain {
  width: 90%;
  height: 100px;
  background-color: #fff;
}
// ::v-deep .u-popup__content {
//   width: 90%;
//   height: 300px;
// }
.pop-show {
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
}
.add {
  ::v-deep .uni-input-input {
    width: 96%;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 40px;
  }
}
</style>
