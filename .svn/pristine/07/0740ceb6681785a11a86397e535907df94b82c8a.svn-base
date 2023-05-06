<template>
    <view class="container">
        <view >
			<view class="but">
				<u-button type="primary" text="新增" size="small" @click="increased()" style="margin-bottom: 20rpx;"></u-button>
			</view>
            <view :class="index>0?'card-box':''" v-for="(item,index) in list" :key="index">
                <card>
                    <u--form labelPosition="left" labelWidth="100">
                        <u-form-item :label="iitem.label" v-for="(iitem,iindex) in item" :key="iindex">
                            <u--input
                              v-model="iitem.value"
							  placeholder="请输入"
                              border="none"
                          ></u--input>
						  
                        </u-form-item>
                    </u--form>
					<view class="del">
						<u-button type="primary" text="保存" size="small" @click="preserve(item)" style="margin-bottom: 20rpx;"></u-button>
						<u-button type="warning" text="删除" size="small" @click="deleteData(item)" ></u-button>
					</view>
			    </card>
            </view>
            <view class="more">
                <u-loadmore :status="loadStatus ? 'loading' : 'nomore'" height="50" :line="true" />
            </view>
        </view>
    </view>
</template>
<script>
export default{ 
    data(){ 
        return{
            queryParams:{
                pageNo: 1,
                pageSize: 10,
                diyId:0,
				tableId:'',
            },
            list:[],
            total:0,
            allPage:1,
            loadStatus:false,
        }
    },
    onReachBottom () {
        if (this.queryParams.pageNo < this.allPage) {
            this.queryParams.pageNo += 1;
        }
    },
    onLoad(options){
        this.queryParams.tableId = options.tableId;
        this.queryParams.diyId = options.diyId;
		this.getAccountDetails();
    },
    methods:{

        async getAccountDetails(){
            this.loadStatus = true;
            const res = await this.$service.account.pageData(this.queryParams);
            this.loadStatus = false;
            // let data = res;
            // let titles = res.titleVos;
            // this.total = res.total;
			
			let data = res.data;
			let titles = res.titleVos;
			this.total = res.total;
			this.allPage = Math.ceil(res.total / this.queryParams.pageSize);
			let list = data.map(item=>{
			    return titles.map((iitem)=>({label:iitem.name,value:item[iitem.prop].dataData,dataId:item[iitem.prop].dataId,tableId:item[iitem.prop].tableId,hs:item.hs}))
			})
			this.list = this.list.concat(list);
			// this.list = data;
			console.log(this.list,'this.list')
        },
		
        async handleDelete(item){
			console.log(66,item)
            const res = await this.$service.account.postDeleteAccountDetails({tableId:item.tableId});
            uni.showToast({
                title:res.code==200?'操作成功':res.data,
                icon:res.code==200?'success':'none'
            });
            if(res.code ==200){
                this.reset();
                this.getAccountDetails();
            }
        },
        reset(){
            this.queryParams.pageNo=1;
            this.queryParams.pageSize=10;
            this.list = [];
        },
		
		particulars(item){
		   	
		},
		
		//新增
		async increased(){
		    const res = await this.$service.account.createData({tableId:this.queryParams.tableId});
			uni.showToast({
		        title:res.code==200?'操作成功':res.data,
		        icon:res.code==200?'success':'none'
		    });
		    if(res.code ==200){
		        this.reset();
		        this.getAccountDetails();
		    }
		},
		
	    async deleteData(val){
		    const res = await this.$service.account.deleteData({tableId:val[0].tableId,hs:val[0].hs});
				uni.showToast({
				    title:res.code==200?'操作成功':res.data,
				    icon:res.code==200?'success':'none'
				})
				if(res.code ==200){
				    this.reset();
				    this.getAccountDetails();
				}
		},
		
		//保存
		async preserve(arr){
			var list = [];
			for (let i = 0; i < arr.length; i++) {
					
				let join = {
					tableId:arr[i].tableId,
					dataId:arr[i].dataId,
					data:arr[i].value
				}
				list.push(join)
			}
			
			const res = await this.$service.account.updateDatas(list);
			uni.showToast({
			    title:res.code==200?'操作成功':res.data,
			    icon:res.code==200?'success':'none'
			})
			if(res.code ==200){
			    this.reset();
			    this.getAccountDetails();
			}
		},
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}
.but{
	display: flex;
	margin-bottom: 30rpx;
}
.del{
	display: flex;
	padding-top: 20rpx;
	justify-content: flex-end;
	border-top: 2px solid #f9f9f9;
}
.card-box{
    margin-top: 30rpx;
}
::v-deep .u-button{
    width: 120rpx !important;
    margin: 0 20rpx !important;
	font-size: 20rpx;
}
.tit_box{
	font-weight: 600;
}
.flex-end{
    display: flex;
    justify-content: flex-end;
}
.item-text{
    display: flex;
    font-size: 26rpx;
    & text:first-child{
        color: #3E4244;
        min-width: 25%;
        font-weight: 600;
        text-align: right;
    }
    & text:last-child{
        color:#ACACAC
    }
}
::v-deep .u-form-item{
	border-bottom:1px dashed transparent;
	  background: linear-gradient(#fff,#fff) padding-box, 
						repeating-linear-gradient(-45deg,#999 0, #999 0.3em, #fff 0,#fff 0.6em);
}
::v-deep .u-form-item__body{
	margin: 0;
	white-space: nowrap;
}
::v-deep .u-form-item__body__left{
		width: 128px !important;
}
</style>