<template>
    <view class="container">
        <view class="list">
            <view class="item" v-for="(item, index) in list" :key="item.menuId + index">
                <u-checkbox-group placement="column" v-if="isBatch && (!item.problemId)">
                    <u-checkbox :checked="selectedList.includes(item.menuId)" shape="circle" @change="(e) => checkChange(e, item.menuId)"></u-checkbox>
                </u-checkbox-group>
                <view class="text">{{ item.menuName }}</view>
                <view @click="handleSingleFill(index)"
                    :class="['btn', item.problemVos.option=='1' ? 'btn_primary' : 'btn_warning']">{{
                            item.problemVos.option=='1' ? '已填报' : '待填报'
                    }}</view>
            </view>
        </view>
        <view class="btn-box" v-if="status!='2'">
            <u-button class="btn" type="primary" shape="circle" plain :text="btnText"
                @click="handleSelecte"></u-button>
            <u-button class="btn" type="primary" shape="circle" text="确 定" @click="handleFill"></u-button>
        </view>
        <ChechTableEdit ref="chechTableEditRef" @confirm="confirm"></ChechTableEdit>
    </view>
</template>

<script>
import ChechTableEdit from './components/ChechTableEdit.vue';
export default {
    components: {
        ChechTableEdit,
    },
    data () {
        return {
            status:'0',
            isBatch: false,
            id: '',
            tableId:null,
            selectedList: [],
            list: {},
            currentParentIndex:0,
            currentIndex: 0,
        }
    },
    computed:{
        btnText(){
            return this.isBatch?'取消':'批量上传'
        }
    },
    onLoad (options) {
        this.id = options.id;
        this.status = options.type;
        
    },
    onShow(){
        this.initData();
    },
    methods: {
        initData () {
            this.getTableDetail();
        },
        async getTableDetail () {
            const res = await this.$service.dailyInspection.getTableDetail({ 'tableId': this.id });
            let list =[]; 
            this.formatList(res.data,list);
            this.tableId = res.data.tableId;
            this.list = list;
        },
        // 多维数组转一维
        formatList(data,arr){
            if(data.menuVos){
                data.menuVos.map(item=>{
                    this.formatList(item,arr);
                })
            }else{
                data.problemVos.map(item=>{
                    arr.push({problemVos:item,menuId:data.menuId,menuName:data.menuName,menuParentId:data.menuParentId});
                });
            }
        },
        checkChange (e, id) {
            if (e) {
                this.selectedList.push(id)
            } else {
                let index = this.selectedList.indexOf(id);
                this.selectedList.splice(index, 1)
            }
        },
        handleSelecte () {
            this.selectedList = [];
            this.isBatch = !this.isBatch;
        },
        handleSingleFill (index) {
            let info = this.list[index].problemVos;
            if(info.option=='1'){
                this.$refs.chechTableEditRef.open({info:info,type:'view'})
            }else{
                this.isBatch = false;
                this.currentIndex = index;
                this.$refs.chechTableEditRef.open({info:info,type:'edit'})
            }
        },
        handleFill () {
            if(this.isBatch&&this.selectedList.length>0){
                this.$refs.chechTableEditRef.open({type:'edit'})
            }else{
                 uni.showToast({
                    title:'请先批量选择',
                    icon:'none'
                })
            }
        },
        confirm (e) {
            // 如果是已完成或者仅查看，则无需保存 直接return；
            if(e.type=='view' || this.status==2){
                return;
            }
            let arr = [];
            if (this.isBatch) {
                // 批量选择，替换所有没有填报过的数据
                this.list.map(item=>{
                    if(this.selectedList.includes(item.menuId)){
                        item.problemVos = e.form;
                        arr.push(item);
                    } 
                })
            } else {
                // 单个批改
                this.list[this.currentIndex].problemVos= e.form;
                arr.push(this.list[this.currentIndex]);
            }
            this.save(arr);
        },
        // 保存巡检表
        async save(arr){
            const res = await this.$service.dailyInspection.postSaveTable({tableId:this.tableId, menuVos:arr});
            uni.showToast({
                title: res.code=='200'?'操作成功':res.data,
                icon: res.code=='200'?'success':'none',
            })
            if(this.isBatch) {
                this.selectedList = [];
                this.isBatch = false;
            }
            if(res.code=='200') this.getTableDetail()
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 120rpx 30rpx;
    background: #F9FAFA;
}

.list {
    .item {
        width: 100%;
        background: #fff;
        border-radius: 24rpx;
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        margin-bottom: 20rpx;
        display: flex;

        .text {
            color: #3E4244;
            font-size: 26rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1;
            font-weight: 500;
        }

        .btn {
            width: 100rpx;
            font-size: 24rpx;
            text-align: end;
        }

        .btn_warning {
            color: #FF6211;
        }

        .btn_primary {
            color: #2C8BFF;
        }
    }
}

.btn-box {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    padding: 0 40rpx 40rpx 40rpx;
    justify-content: space-between;

    ::v-deep .u-button {
        width: 250rpx;
    }
}
</style>