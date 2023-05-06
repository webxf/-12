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
			 option: {
					xAxis: {
						type: 'category',
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130,110,110,110,110,110],
						type: 'bar'
					}]
				}
			}
		},
		mounted() {
			this.$refs.chart.init(echarts, chart=> {
				chart.setOption(this.option);
				
			});
		}
	}
</script>

<style>

</style>