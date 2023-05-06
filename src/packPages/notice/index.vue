<template>
  <view accordion class="container">
    <u-collapse :value="[0]">
      <u-collapse-item v-for="item,index in list" :key="item.articleId" :name="index">
        <view slot="title" class="title">
          <u-tag :text="item.keyWords" size="mini" class="tag"></u-tag>
          {{ item.articleName }}
        </view>
        <text class="u-collapse-content">{{ item.articleContent }}</text>
      </u-collapse-item>
    </u-collapse>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  onLoad() {
    this.$service.login.getArticleList().then(res => {
      if (res.data) {
        this.list = res.data || []
      }
    })
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.container {
  ::v-deep .u-collapse {
    .u-cell__body, .u-cell__title-text {
      color: $uni-text-color;
    }
    .u-cell__body {
      background-color: $uni-bg-color-grey;
    }
    .u-collapse-item__content__text {
      color: $uni-text-color;
    }
    .u-line {
      border-color: $uni-border-color !important;
    }
    .u-cell--clickable {
      background-color: $uni-bg-color-grey;
    }
    .title {
      .tag {
        margin-right: 10rpx;
        display: inline-block;
        width: fit-content;
      }
    }
    .u-collapse-content {
      text-indent: 64rpx;
    }
  }
}
</style>
