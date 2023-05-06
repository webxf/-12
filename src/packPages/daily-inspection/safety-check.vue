<template>
    <view class="container">
        <u-search v-model="queryParams.tableName" placeholder="请输入搜索关键字" @custom="handleSearch" bgColor="#fff"
            searchIconColor="#92939A" placeholderColor="#92939A"></u-search>
        <u-sticky bgColor="#f9fafa">
            <u-tabs :list="tabList" :current="currentIndex" @click="switchTabs"></u-tabs>
        </u-sticky>
        <view v-if="dailyList.length > 0">
            <view class="card-box" v-for="item in dailyList" :key="item.tableId">
                <card title="巡检填报" :value="item.xjzt" :titleStyle="titleStyle" :valueStyle="valueStyle"
                    @valueClick="handleCheck(item)">
                    <u--form labelPosition="left" labelWidth="80" :model="item">
                        <u-form-item label="巡检名称：">
                            <text>{{ item.tableName }}</text>
                        </u-form-item>
                        <u-form-item label="巡检类型：">
                            <text>{{ item.xjlx }}</text>
                        </u-form-item>
                        <u-form-item label="巡检时间：">
                            <text>{{ item.xjsj }}</text>
                        </u-form-item>
                        <u-form-item label="巡检人员：">
                            <text>{{ item.xjry }}</text>
                        </u-form-item>
                        <u-form-item label="巡检状态：">
                            <text>{{ item.xjzt }}</text>
                        </u-form-item>
                    </u--form>
                </card>
            </view>
            <view class="more">
                <u-loadmore :status="loadStatus ? 'loading' : 'nomore'" height="50" :line="true" />
            </view>
        </view>
        <view class="empty" v-else>
            <u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
        </view>
    </view>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
    components: {
        Card,
    },
    data () {
        return {
            tabList: [
                { name: '待巡检', value: '0' },
                { name: '巡检中', value: '1' },
                { name: '已完成', value: '2' },
            ],
            currentIndex: 0,
            loadStatus: false,
            dailyList: [],
            queryParams: {
                pageNo: 1,
                pageSize: 10,
                xjlx: '',
                tableName:''
            },
            allPage: 0,
            total: 0,
            titleStyle: {
                fontSize: '26rpx',
                color: '#2C8BFF',
                fontWeight: '600'
            },
            valueStyle: {
                fontSize: '26rpx',
                color: '#FF6211',
                fontWeight: '600'
            },
        }
    },
    onReachBottom () {
        if (this.queryParams.pageNo < this.allPage) {
            this.queryParams.pageNo += 1;
            this.getDailyList();
        }
    },
    onLoad (options) {
        this.queryParams.xjlx = options.id;
        this.initData();
    },
    methods: {
        initData () {
            this.getDailyList();
        },
        async getDailyList () {
            this.loadStatus = true;
            const res = await this.$service.dailyInspection.getDailyList({ modelType: 1, ...this.queryParams, xjzt: this.tabList[this.currentIndex].value });
            this.loadStatus = false
            console.log(res)
            this.total = res.total;
            this.allPage = Math.ceil(res.data.total / this.queryParams.pageSize);
            this.dailyList = this.dailyList.concat(res.data);
        },
        handleCheck (info) {
            uni.navigateTo({
                url: '/packPages/daily-inspection/check-list?id=' + info.tableId+'&type='+this.tabList[this.currentIndex].value
            })
        },
        reset () {
            this.queryParams.pageNo = 1
            this.queryParams.pageSize = 10
            this.dailyList = []
        },
        switchTabs (e) {
            this.currentIndex = e.index;
            this.reset();
            this.getDailyList();
        },
        handleSearch(){
            console.log('搜索')
            this.reset();
            this.getDailyList();
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 0 30rpx;
    background: #f9fafa;
}

.card-box {
    margin-top: 30rpx
}

.empty {
    padding-top: 20%;
}
</style>