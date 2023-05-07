<template>
  <view style="height: 750rpx">
    <l-echart ref="chart"></l-echart>
  </view>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      sbDate: {},
      objKeys: [],
    };
  },
  mounted() {
    this.$refs.chart.init(echarts, (chart) => {
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['01月', '02月', '03月', '04月', '05月', '06月'],
            ['台账数量', 43.3, 85.8, 93.7],
            ['巡检量', 83.1, 73.4, 55.1],
            ['发现问题数', 86.4, 65.2, 82.5],
          ],
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
      };
      chart.setOption(option);
    });
    this.gettzDate();
  },
  methods: {
    async gettzDate() {
      const res = await this.$service.statistics.gettzDate({
        nf: '2023',
      });
      this.sbDate = res.data;
    },
  },
};
</script>
