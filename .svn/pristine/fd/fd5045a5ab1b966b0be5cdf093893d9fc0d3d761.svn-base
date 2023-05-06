<template>
    <view class="container">
        <u-search v-model="queryParams.key" placeholder="请输入搜索关键字" :show-action="false" bgColor="#fff" searchIconColor="#92939A" placeholderColor="#92939A"></u-search>
        <!-- <u-tabs :list="tabList" @click="click"></u-tabs> -->
        <view class="card-box">
            <card>
                <u--form labelPosition="left" labelWidth="80" :model="form" v-for="item in list" :key="item.yzmc">
                    <u-form-item label="因子名称：">
                        <text>{{yzmc}}</text>
                    </u-form-item>
                    <u-form-item label="报警类型：">
                        <text>{{bjlx}}</text>
                    </u-form-item>
                    <u-form-item label="报警信息：">
                        <text>{{bjxx}}</text>
                    </u-form-item>
                    <u-form-item label="报警时间：">
                        <text>{{bjsj}}</text>
                    </u-form-item>
                    <u-form-item label="处置状态：">
                        <text>{{clzt}}</text>
                    </u-form-item>
                </u--form>
                <!-- <view slot="footer" >
                    <view class="flex-end">
                        <u-button type="primary" @click="handleRectify" plain  size="mini" shape="circle" text="去整改"></u-button>
                        <u-button type="primary" @click="handleAssign" size="mini" shape="circle" text="去分派"></u-button>
                    </view>
                </view> -->
				<u-empty
				v-if='list.length == 0'
				        mode="list"
				        icon="http://cdn.uviewui.com/uview/empty/list.png"
				>
				</u-empty>
            </card>
        </view>
        <WarningRectify ref="warningRectifyRef"></WarningRectify>
    </view>
</template>

<script>
import Card from '@/components/Card.vue'
import WarningRectify from './components/WarningRectify.vue'
export default{
    components:{
        Card,
        WarningRectify
    },
    data(){
        return{
            tabList:[
                {name: '在线预警'},
                {name: '过控预警'},
            ],
            queryParams:{},
            popupShow:false,
            form:{},
			list:[],
			menuType:0,
			pageSize: 10,
			pageNo: 1,
        }
    },
	onLoad(){
	  this.workingList();	
	},
    methods:{
		//菜单切换
		click(item) {
			console.log(item)
		    this.menuType = item.index
		},
		
		async workingList(){
		    const { data } = await this.$service.working.getworkingList({
					pageSize: 100,
					pageNo: 1
				});
				console.log(data,666)
				this.form = data
		},
		
        handleRectify(){
            this.$refs.warningRectifyRef.open()
        },
        handleAssign(){
            uni.navigateTo({
                url:'/pages/working/disposal-warning'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 0 30rpx;
    background: #f9fafa;
}

::v-deep .u-button{
    width: 120rpx !important;
    margin: 0 !important;
}
::v-deep .u-button--plain{
    margin-right: 20rpx !important;
}

.flex-end{
    display: flex;
    justify-content: flex-end;
}
.card-box{
    margin-top: 30rpx;
}

</style>