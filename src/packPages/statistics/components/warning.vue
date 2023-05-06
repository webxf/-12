<template>
    <view class="echart-container">
        <l-echart ref="chart" ></l-echart>
    </view>
</template>
<script>
export default {
    props:{
        date:{
            type: [String,Number],
            default: ''
        }
    },
    data(){
        return{
            chartInstance:null,
            dataList:[]
        }
    },

    mounted() {
        // this.initEchart();
    },
    methods:{
        initEchart(){
            // 绘制图表
           let options={
                grid:{
                    top: 20,
                    left: 35,
                    right: 20,
                    bottom: 20,
                },
                color:['#2E7CF0'],
                tooltip: {},
                xAxis: {
                    data: [],
                    axisTick:{
                        show:false
                    }
                },
                yAxis: {
                    axisLine:{
                        show:true
                    },
                    splitLine:{
                        show:false
                    },
                },
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        itemStyle: {
                            borderColor : "'#2E7CF0",
                            normal: {
                              //柱形图圆角，初始化效果
                               barBorderRadius:[15, 15, 0, 0]
                            }
                        },
                        barWidth:7,
                        data: []
                    }
                ]
            };
            this.$refs.chart.init(this.$echarts, chart => {
				chart.setOption(options);
                this.getData(); 
			});
        },
        async getData(){
            const res = await this.$service.statistics.getOnlineWarning({nf:this.date});
            this.dataList = res.data;
            this.upDataEchart();
        },
        upDataEchart(){
            let options={
                xAxis: {
                    data:this.dataList.map(item=>item.name) || ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12']
                },
                series:[
                    {   
                        data:this.dataList.map(item=>item.data)
                    }
                ]
            };
            this.$refs.chart.setOption(options)
        }
    }

}
</script>
<style scoped>
.echart-container{
    height: 350rpx;
}
</style>