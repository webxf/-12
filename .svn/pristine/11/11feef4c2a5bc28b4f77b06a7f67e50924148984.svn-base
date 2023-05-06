<template>
    <view class="echart-container">
        <l-echart ref="chart" customStyle="{z-index:9}"></l-echart>
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
            dateList:[]
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
                    top: 40,
                    left: 35,
                    right: 20,
                    bottom: 20,
                },
                color:['#2E7CF0','#00CDC4'],
                legend: {
                    icon:'circle',
                    data: ['巡检数', '完成数'],
                    itemWidth: 12, // 图例图形的宽度
                    itemHeight: 12, // 图例图形的高度
                    textStyle:{
                        fontSize:'12'
                    }
                },
                tooltip: {},
                xAxis: {
                    data: [],
                    splitLine:{
                        show:false
                    },
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
                        name: '巡检数',
                        type: 'bar',
                        itemStyle: {
                            borderColor : "#2E7CF0",
                            normal: {
                              //柱形图圆角，初始化效果
                               barBorderRadius:[15, 15, 0, 0]
                            }
                        },
                        barWidth:7,
                        data: []
                    },
                    {
                        name: '完成数',
                        type: 'bar',
                        itemStyle: {
                            borderColor : "#00CDC4",
                            normal: {
                              //柱形图圆角，初始化效果
                               barBorderRadius:[15, 15, 0, 0]
                            }
                        },
                        barGap: '-100%',
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
            const res = await  this.$service.statistics.getPollingList({nf:this.date})
            this.dateList = res.data;
            this.upDataEchart();
        },
        upDataEchart(){ 
            let options={
                xAxis:{
                    data: this.dateList.map(item=>item.name)||['1', '2', '3', '4', '5', '6','7','8','9','10','11','12']
                },
                series:[
                    {   
                        data:this.dateList.map(item=>item.values.xjs)
                    },
                    {   
                        data:this.dateList.map(item=>item.values.wcs)
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