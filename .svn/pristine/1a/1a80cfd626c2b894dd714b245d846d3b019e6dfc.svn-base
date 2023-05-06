<script>
export default {
  onLaunch: function () {
    let accessToken = uni.getStorageSync('token')
    if (accessToken) {
      // 存在登陆状态 刷新登陆状态
      let user_info = JSON.parse(uni.getStorageSync('user_Info'))
      this.$store.dispatch('user/setUserInfo', { user_info, accessToken })
      setTimeout(() => {
        uni.redirectTo({ url: '/pages/index/index' })
      },0)
    }
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {},
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
/*每个页面公共css */
body {
  background: $uni-bg-color;
  color: $uni-text-color;
  font-size: $uni-font-size-base;
}
</style>
