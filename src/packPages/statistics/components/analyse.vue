<template>
    <view class="echart-container">
        <view class="card-content">
            <view class="echart">
                <l-echart ref="chart"></l-echart>
            </view>
            <view class="legend">
                <view class="item-legend" v-for="(item,index) in dateList" :key="item.name + index">
                    <view class="dot" :style="'background:'+item.color"></view>
                    <view class="content">
                        <view>{{item.name}}</view>
                        <view>{{item.value}}</view>
                    </view>
                </view>
            </view>
        </view>
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
            colorList:['#2E7CF0','#FF9900','#21DD00','#FFA9A4','#00CEC3'],
            legend:[
                {
                    name:'环评审批',
                    value:'20次',
                    color:'#2E7CF0'
                },
                {
                    name:'排污许可',
                    value:'20次',
                    color:'#FF9900'
                },
                {
                    name:'重固废系统',
                    value:'20次',
                    color:'#21DD00'
                },
                {
                    name:'应急系统',
                    value:'20次',
                    color:'#FFA9A4'
                },
                {
                    name:'应急系统',
                    value:'20次',
                    color:'#00CEC3'
                }
            ],
            dateList:[]
        }
    },
    mounted() {
		// this.initEchart();
        // this.getData();
    },
    methods:{
        initEchart(){
            // 绘制图表
            let options = {
                tooltip: {
                    trigger: 'item',
                    position: ['5%', '5%']
                },
                color:this.colorList,
                grid: {
					left: 20,
					right: 20,
					bottom: 20,
					top: 20,
					containLabel: true
				},
                series: [
                    {
                        type: 'pie',
                        radius: ['60%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
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
            const res = await  this.$service.statistics.getDeclareWarnList({nf:this.date})
            res.data.length>=1 && res.data
            this.dateList = res.data.length>=1 && res.data.map((item,index)=>({name:item.name,value:item.data,color:this.colorList[index]}));
            this.upDataEchart();
        },
        upDataEchart(){
            let options={
                series:[
                    {
                        data:this.dateList
                    }
                ]
            };
            this.$refs.chart.setOption(options)
        }
    }

}
</script>
<style lang="scss" scoped>
.echart-container{
    height: 350rpx;
}
.card-content{
    display: flex;
    height: 100%;
    .echart{
        flex: 1;
        height: 100%;
    }
    .legend{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-legend{
            display:flex;
            align-items: center;
            
           .dot{
                width: 20rpx;
                height:20rpx;
                border-radius: 50%;
                background: #2E7CF0;
                margin-right: 20rpx;
           }
           .content{
                flex: 1;
                font-size: 24rpx;
                color: #666666;
                display: flex;
                justify-content: space-between;
           } 
        }
    }
}
</style>