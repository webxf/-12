<template>
  <view class="container">
    <u-search
      v-model="queryParams.key"
      placeholder="请输入搜索关键字"
       :show-action="false" 
       @search="handleSearch" 
       @clickIcon="handleSearch"
      bgColor="#fff"
      searchIconColor="#92939A"
      placeholderColor="#92939A"
    ></u-search>
    <view v-if="list.length > 0">
      <view class="card" v-for="item in list" :key="item.jcbh">
        <card>
          <u--form labelPosition="left" labelWidth="100" :model="item">
            <u-form-item label="检查时间：">
              <text>{{ item.jcsj }}</text>
            </u-form-item>
            <u-form-item label="检查内容：">
              <text>{{ item.jcnr }}</text>
            </u-form-item>
          </u--form>
          <view slot="footer">
            <view class="flex-end">
              <u-button
                type="primary"
                class="btn"
                size="mini"
                shape="circle"
                text="签收"
                v-if="item.zt != '已读'"
                @click="handleSign(item.jcbh)"
              ></u-button>
              <u-button
                type="primary"
                class="btn"
                size="mini"
                shape="circle"
                text="已签收"
                plain
                v-else
              ></u-button>
            </view>
          </view>
        </card>
      </view>
      <view class="more">
        <u-loadmore
          :status="loadStatus ? 'loading' : 'nomore'"
          height="50"
          :line="true"
        />
      </view>
    </view>
    <view class="empty" v-else>
      <u-empty
        mode="list"
        icon="http://cdn.uviewui.com/uview/empty/list.png"
      ></u-empty>
    </view>
  </view>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  components: {
    Card,
  },
  data () {
    return {
      queryParams: {
        pageNo: 1,
        pageSize: 10,
      },
      loadStatus: false,
      total: 0,
      allPage: 1,
      form: {},
      list: [],
    };
  },
  onLoad () {
    this.initData();
  },
  onReachBottom () {
    if (this.queryParams.pageNo < this.allPage) {
      this.queryParams.pageNo += 1;
      this.getJctzList();
    }
  },
  methods: {
    initData () {
      this.getJctzList();
    },
    async getJctzList () {
      this.loadStatus = true;
      const res = await this.$service.governmentEnterprise.getJctzList(this.queryParams);
      this.loadStatus = false;
      this.total = res.total;
      this.allPage = Math.ceil(res.data.total / this.queryParams.pageSize);
      this.list = this.list.concat(res.data);
    },
    reset () {
      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.list = [];
    },
    handleSearch () {
      this.reset();
      this.getJctzList();
    },
    handleSign (jcbh) {
      uni.showModal({
        title: "提示",
        content: "是否确认签收",
        success: (res) => {
          if (res.confirm) {
            this.sign(jcbh);
          }
        },
      });
    },
    async sign (jcbh) {
      const res = await this.$service.governmentEnterprise.postJctxSigon({ jcbh });
      if (res.code == "200") {
        uni.showToast({
          title: res.data,
          icon: "success",
        });
        this.reset();
        this.getJctzList();
      } else {
        uni.showToast({
          title: res.data,
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-end {
  display: flex;
  justify-content: flex-end;
}
::v-deep .u-button {
  width: 120rpx !important;
  margin: 0 !important;
}
.container {
  padding: 30rpx 30rpx 0 30rpx;
  background: #f9fafa;
}
.card {
  margin-top: 30rpx;
}
.empty {
  padding-top: 20%;
}
</style>
