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
				sbDate:{}
			}
		},
		mounted() {
			this.$refs.chart.init(echarts, chart=> {
				let option = {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					series: [
						{
							type: 'pie',
							radius: ['40%', '70%'],
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: 'center'
							},
							emphasis: {
								label: {
									show: true,
									fontSize: '40',
									fontWeight: 'bold'
								}
							},
							labelLine: {
								show: false
							},
							data: [
								{value: 1048, name: '搜索引擎'},
								{value: 735, name: '直接访问'},
								{value: 580, name: '邮件营销'},
								{value: 484, name: '联盟广告'},
								{value: 300, name: '视频广告'}
							]
						}
					]
				}
				chart.setOption(option);
				
			});
			this.getDate()
		},
		methods:{
			async getDate(){
				 const res = await this.$service.statistics.getsbDate()
				 this.sbDate = res.data
				 
			}
		}
	}
</script>