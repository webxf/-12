<template>
  <view class="container">
    <view>
      <card title="档案管理" :titleStyle="titleStyle">
        <view slot="header">
          <view class="title-box">
            <view class="text">档案管理</view>
            <!-- <u-icon
              name="eye"
              color="#808080"
              size="20"
              style="margin-left: 5px"
              @click="mangerClick"
            ></u-icon> -->
          </view>
        </view>
        <view>
          <view v-for="(item, index) in daDate" :key="index">
            <view>{{ item.name }}</view>
            <view style="display: flex; align-items: center">
              <u-line-progress
                :percentage="Number(item.rate)"
                activeColor="#FBBB8B"
                style="width: 60%"
              ></u-line-progress>
            </view>
          </view>
          <view>总量控制</view>
          <uni-data-select
            v-model="value"
            :localdata="range"
            @change="changeSum"
            :clear="false"
          ></uni-data-select>
          <view>
            <view v-for="(item, index) in waterDate" :key="index">
              <view style="margin-right: 10px">{{ item.yzmc }}</view>
              <u-line-progress
                :percentage="Number(item.pfzl)"
                activeColor="#FBBB8B"
              ></u-line-progress>
            </view>
          </view>
        </view>
      </card>
    </view>
    <view class="card-box">
      <card title="申报提醒" :titleStyle="titleStyle">
        <view slot="header">
          <view class="title-box">
            <view class="text">环保工况</view>
            <uni-data-checkbox
              mode="tag"
              v-model="radio2"
              :localdata="sex"
              style="margin: 5px 0 0 5px; width: 84%"
            ></uni-data-checkbox>
            <!-- <u-icon name="eye" color="#808080" size="16"></u-icon> -->
          </view>
          <!-- <view class="charts-box" v-if="radio2 == 0">
            <qiun-data-charts
              type="column"
              :opts="optshbgk"
              :chartData="chartDatahbgk"
            />
          </view> -->
          <view class="charts-box" v-if="radio2 == 1">
            <qiun-data-charts
              type="column"
              :opts="optsyz"
              :chartData="chartDatayz"
            />
          </view>
        </view>
      </card>
    </view>
    <view class="card-box">
      <card title="申报管理" :titleStyle="titleStyle">
        <view slot="header">
          <view class="title-box">
            <view class="text">申报管理</view>
            <!-- <u-icon
              name="eye"
              color="#808080"
              size="20"
              style="margin-left: 5px"
            ></u-icon> -->
          </view>
          <!-- <Manger /> -->
          <view class="charts-box">
            <qiun-data-charts type="pie" :opts="opts" :chartData="chartData" />
          </view>
        </view>
        <!-- <polling class="echart-box" :date="dateParams.polling" ref="pollingRef"></polling> -->
      </card>
    </view>

    <view class="card-box">
      <card title="台账管理" :titleStyle="titleStyle">
        <view slot="header">
          <view class="title-box">
            <view class="text">台账管理</view>
            <!-- <u-icon
              name="eye"
              color="#808080"
              size="20"
              style="margin-left: 5px"
            ></u-icon> -->
          </view>
          <!-- <Ledger /> -->
          <view class="charts-box">
            <qiun-data-charts
              type="column"
              :opts="optsTz"
              :chartData="chartDataTz"
            />
          </view>
        </view>
      </card>
    </view>
    <view class="card-box">
      <card title="政企通" :titleStyle="titleStyle">
        <view slot="header">
          <view class="title-box">
            <view class="text">政企通</view>
            <!-- <u-icon
              name="eye"
              color="#808080"
              size="20"
              style="margin-left: 5px"
            ></u-icon> -->
          </view>
          <!-- <Manger /> -->
          <view
            style="display: flex; justify-content: center; margin-bottom: 20rpx"
            >政务通知</view
          >
          <view class="charts-boxs">
            <qiun-data-charts
              type="pie"
              :opts="optszytz"
              :chartData="chartDatazytz"
            />
          </view>
          <!-- 政策法规 -->
          <view
            style="display: flex; justify-content: center; margin-bottom: 20rpx"
            >政策法规</view
          >
          <view class="charts-boxsfg">
            <qiun-data-charts
              type="pie"
              :opts="optsfg"
              :chartData="chartDatafg"
            />
          </view>
          <!-- 市局预警 -->
          <view
            style="display: flex; justify-content: center; margin-bottom: 20rpx"
            >市局预警</view
          >
          <view class="charts-boxsjyj">
            <qiun-data-charts
              type="pie"
              :opts="optssjyj"
              :chartData="chartDatasjyj"
            />
          </view>
          <!-- 监督检查 -->
          <view
            style="display: flex; justify-content: center; margin-bottom: 20rpx"
            >监督检查</view
          >
          <view class="charts-boxjdjc">
            <qiun-data-charts
              type="pie"
              :opts="optsjdjc"
              :chartData="chartDatajdjc"
            />
          </view>
          <!-- 需求反馈 -->
          <view
            style="display: flex; justify-content: center; margin-bottom: 20rpx"
            >需求反馈</view
          >
          <view class="charts-boxxqfk">
            <qiun-data-charts
              type="pie"
              :opts="optsxqfk"
              :chartData="chartDataxqfk"
            />
          </view>
        </view>
      </card>
    </view>
    <u-datetime-picker
      mode="year"
      :show="yearsPicker"
      @cancel="yearsPicker = false"
      @confirm="yearPickeConfirm"
    ></u-datetime-picker>
    <u-datetime-picker
      mode="date"
      :show="datePicker"
      @cancel="datePicker = false"
      @confirm="datePickeConfirm"
    ></u-datetime-picker>
  </view>
</template>

<script>
import Card from '@/components/Card.vue';
import Warning from '../components/warning.vue';
import Analyse from '../components/analyse.vue';
import Polling from '../components/polling.vue';
import EveryMonth from '../components/every-month.vue';
import Factor from '../components/factor.vue';
import Ledger from '../components/Ledger.vue';
import Manger from '../components/Manger.vue';
export default {
  components: {
    Card,
    Warning,
    Analyse,
    Polling,
    EveryMonth,
    Factor,
    Ledger,
    Manger,
  },
  data() {
    return {
      zytzDateName: [],
      zytzDate: [],
      zytzDateSers: [],
      zcfgDate: [],
      sjyjDate: [],
      jdjcDate: [],
      xqfkDate: [],
      chartData: {},
      chartDatafg: {},
      chartDatajdjc: {},
      chartDataxqfk: {},
      chartDatahbgk: {},
      chartDatayz: {},
      yzDate: [],
      optsfg: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: '#FFFFFF',
          },
        },
      },
      optsjdjc: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: '#FFFFFF',
          },
        },
      },
      optsxqfk: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: '#FFFFFF',
          },
        },
      },
      optsyz: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [15, 15, 0, 5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          data: [
            {
              min: 0,
            },
          ],
        },
        extra: {
          column: {
            type: 'group',
            width: 30,
            activeBgColor: '#000000',
            activeBgOpacity: 0.08,
          },
        },
      },
      optszytz: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: '#FFFFFF',
          },
        },
      },
      chartDatasjyj: {},
      optssjyj: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: '#FFFFFF',
          },
        },
      },
      objKeys: [],
      sbDate: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: '#FFFFFF',
          },
        },
      },
      optshbgk: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [15, 15, 0, 5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          data: [
            {
              min: 0,
            },
          ],
        },
        extra: {
          column: {
            type: 'group',
            width: 30,
            activeBgColor: '#000000',
            activeBgOpacity: 0.08,
          },
        },
      },
      chartDataTz: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      optsTz: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [15, 15, 0, 5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          data: [
            {
              min: 0,
            },
          ],
        },
        extra: {
          column: {
            type: 'group',
            width: 30,
            activeBgColor: '#000000',
            activeBgOpacity: 0.08,
          },
        },
      },
      tzDate: {},
      newArrMonth: [], //月份
      tzArr: [],
      chartDatazytz: {},
      optsyz: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          gridType: 'dash',
          dashLength: 2,
        },
        extra: {
          line: {
            type: 'straight',
            width: 2,
            activeType: 'hollow',
          },
        },
      },
      dateParams: {
        warning: '',
        analyse: '',
        polling: '',
      },
      inputIconStyle: {
        fontSize: '14px',
      },
      inputStyle: {
        padding: '5rpx 10rpx !important',
        height: '20px',
      },
      titleStyle: {
        fontSize: '26rpx',
        color: '#2C8BFF',
        fontWeight: '600',
      },
      checkedKey: '',
      datePicker: false,
      yearsPicker: false,
      value: 0,
      range: [
        { value: 0, text: '废水' },
        { value: 1, text: '废气' },
      ],
      sex: [
        // {
        //   text: '每月报警',
        //   value: 0,
        // },
        {
          text: '因子报警',
          value: 1,
        },
      ],
      radio2: 0,
      mangerShow: false,
      daDate: [],
      waterDate: [],
      powerDate: [],
    };
  },
  mounted() {
    // this.init();
    this.getDadate(), this.getwaterdate();
    this.getzqtDate();
    this.getyzDate();
  },
  onLoad() {
    this.getDate();
    this.gettzDate();
  },
  onReady() {
    this.getServerData();
    this.getServerDataTz();
    this.getServerDatazytz();
    this.getServerDatasjyj();
    this.getServerDatafg();
    this.getServerDatajdjc();
    this.getServerDataxqfk();
    this.getServerDatahbgk();
    this.getServerDatayz();
  },
  methods: {
    getTime() {
      let date = new Date();
      let y = date.getFullYear();
      return {
        year: y,
      };
    },
    init() {
      let date = this.getTime();
      this.dateParams.warning = date.year;
      this.dateParams.analyse = date.year;
      this.dateParams.polling = date.year;
      this.$refs.warningRef.initEchart();
      this.$refs.analyseRef.initEchart();
      this.$refs.pollingRef.initEchart();
    },
    openYearPicker(key) {
      this.checkedKey = key;
      this.yearsPicker = true;
    },
    openTimePicker(key) {
      this.checkedKey = key;
      this.datePicker = true;
    },
    yearPickeConfirm(e) {
      let y = this.$u.timeFormat(e.value, 'yyyy');
      this.dateParams[this.checkedKey] = y;
      this.$nextTick(() => {
        this.$refs[this.checkedKey + 'Ref'].getData();
      });
      this.yearsPicker = false;
    },
    datePickeConfirm(e) {
      this.dateParams[this.checkedKey] = this.$u.timeFormat(
        e.value,
        'yyyy-mm-dd'
      );
      this.datePicker = false;
    },
    mangerClick() {
      this.mangerShow = true;
    },
    async getDadate() {
      const res = await this.$service.statistics.getdaDate();
      this.daDate = res.data;
    },
    //点击选择进行筛选
    changeSum(value) {
      if (value == 0) {
        this.getwaterdate();
      } else if (value == 1) {
        this.getpowerdate();
      } else {
        this.getNodate();
      }
    },
    getNodate() {
      this.waterDate = [];
    },
    //废水
    async getwaterdate() {
      const res = await this.$service.statistics.getWaterDate({
        yzlb: '废水',
      });
      this.waterDate = res.data;
    },
    //废气
    async getpowerdate() {
      const res = await this.$service.statistics.getWaterDate({
        yzlb: '废气',
      });
      this.waterDate = res.data;
      console.log(this.waterDate);
    },
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          series: [
            {
              data: this.objKeys,
            },
          ],
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    //台账
    getServerDataTz() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: this.newArrMonth,
          series: this.tzArr,
        };
        this.chartDataTz = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    async getDate() {
      const res = await this.$service.statistics.getsbDate();
      this.sbDate = res.data;
      for (let i = 0; i < Object.keys(this.sbDate).length; i++) {
        this.objKeys.push({
          value: Number(this.sbDate[Object.keys(this.sbDate)[i]]),
          name: Object.keys(this.sbDate)[i],
        });
      }
      this.objKeys = this.objKeys.splice(1);
      this.objKeys = this.objKeys.map((item) => {
        if (item.name === 'xtb') {
          item.name = '需填报';
        }
        if (item.name === 'ytb') {
          item.name = '已填报';
        }
        return item;
      });
    },
    //台账数据
    async gettzDate() {
      const res = await this.$service.statistics.gettzDate({
        nf: '2023',
      });
      this.tzDate = res.data;
      this.tzDate.map((item) => {
        this.newArrMonth.push(item.name);
      });
      var arr = this.tzDate.map((item) => {
        return Number(Object.values(item.values)[0]);
      });
      var arr1 = this.tzDate.map((item) => {
        return Number(Object.values(item.values)[0]);
      });
      var arr2 = this.tzDate.map((item) => {
        return Number(Object.values(item.values)[1]);
      });
      this.tzArr = [
        {
          name: '台账数量',
          data: arr,
        },
        {
          name: '巡检量',
          data: arr1,
        },
        {
          name: '发现问题数',
          data: arr2,
        },
      ];
    },
    //政务通知
    getServerDatazytz() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          series: [
            {
              data: this.zytzDate,
            },
          ],
        };
        this.chartDatazytz = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    //政策法规
    getServerDatafg() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          series: [
            {
              data: this.zcfgDate,
            },
          ],
        };
        this.chartDatafg = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    //市局预警
    getServerDatasjyj() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          series: [
            {
              data: this.sjyjDate,
            },
          ],
        };
        this.chartDatasjyj = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    //监督检查
    getServerDatajdjc() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          series: [
            {
              data: this.jdjcDate,
            },
          ],
        };
        this.chartDatajdjc = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    //需求反馈
    getServerDataxqfk() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          series: [
            {
              data: this.xqfkDate,
            },
          ],
        };
        this.chartDataxqfk = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    //获取政务通知所有数据
    async getzqtDate() {
      const res = await this.$service.statistics.getzqtDate();
      this.zytzDate = res.data[3].vos;
      this.zcfgDate = res.data[0].vos;
      this.sjyjDate = res.data[2].vos;
      this.jdjcDate = res.data[4].vos;
      this.xqfkDate = res.data[1].vos;
      this.zytzDate = this.zytzDate.map((item) => {
        return (item = JSON.parse(
          JSON.stringify(item).replace(/count/g, 'value')
        ));
      });
      this.zcfgDate = this.zcfgDate.map((item) => {
        return (item = JSON.parse(
          JSON.stringify(item).replace(/count/g, 'value')
        ));
      });
      this.sjyjDate = this.sjyjDate.map((item) => {
        return (item = JSON.parse(
          JSON.stringify(item).replace(/count/g, 'value')
        ));
      });
      this.jdjcDate = this.jdjcDate.map((item) => {
        return (item = JSON.parse(
          JSON.stringify(item).replace(/count/g, 'value')
        ));
      });
      this.xqfkDate = this.xqfkDate.map((item) => {
        return (item = JSON.parse(
          JSON.stringify(item).replace(/count/g, 'value')
        ));
      });
    },
    //环保工况
    getServerDatahbgk() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
          series: [
            {
              name: '目标值',
              data: [35, 36, 31, 33, 13, 34],
            },
            {
              name: '完成量',
              data: [18, 27, 21, 24, 6, 28],
            },
          ],
        };
        this.chartDatahbgk = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    //环保工况因子
    getServerDatayz() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: this.zytzDateName,
          series: [
            {
              data: this.zytzDateSers,
            },
          ],
        };
        this.chartDatayz = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    //获取因子数据
    async getyzDate() {
      const res = await this.$service.statistics.getyzDate();
      console.log(res);
      // this.zytzDate = res.data;
      this.zytzDate = [
        {
          jcyz: '总烃',

          bybjs: 9,

          sybjs: 0,

          tbsy: '900%',
        },
        {
          jcyz: '非甲烷总烃折算',

          bybjs: 9,

          sybjs: 0,

          tbsy: '900%',
        },
        {
          jcyz: '非甲烷总烃',

          bybjs: 18,

          sybjs: 0,

          tbsy: '1800%',
        },
      ];
      this.zytzDate.map((item) => {
        this.zytzDateName.push(item.jcyz);
        this.zytzDateSers.push(item.bybjs);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 30rpx 50rpx 30rpx;
  background: #f9fafa;
}
.echart-box {
  width: 100%;
  /* min-height: 500rpx; */
}
.card-box {
  margin-top: 20rpx;
}
.title-box {
  line-height: 80rpx;
  font-size: 35rpx;
  position: relative;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  &::after {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid #f5f6f8;
  }
  .text {
    font-size: 26rpx;
    color: #2c8bff;
    font-weight: 600;
    margin-left: 20rpx;
  }
  .picker {
    width: 160rpx;
    margin-right: 20rpx;
  }
}
.charts-box {
  width: 100%;
  height: 250px;
}
.charts-boxs {
  width: 100%;
  height: 200px;
}
.charts-boxsfg {
  width: 100%;
  height: 200px;
}
.charts-boxsjyj {
  width: 100%;
  height: 200px;
}
.charts-boxjdjc {
  width: 100%;
  height: 200px;
}
.charts-boxxqfk {
  width: 100%;
  height: 200px;
}
</style>
