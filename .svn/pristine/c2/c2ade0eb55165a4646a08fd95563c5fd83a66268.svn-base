<template>
  <u-tabbar
    :value="value"
    @change="tabbarChange"
    :fixed="true"
    :placeholder="true"
    :safeAreaInsetBottom="true"
  >
    <u-tabbar-item text="企业一览" icon="home" ></u-tabbar-item>
    <u-tabbar-item text="公众服务" icon="grid" ></u-tabbar-item>
  </u-tabbar>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    tabbarChange(e) {
      const url = [
        '/pages/index/index',
        '/pages/service/index'
      ][e]
      uni.reLaunch({
        url: url
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
