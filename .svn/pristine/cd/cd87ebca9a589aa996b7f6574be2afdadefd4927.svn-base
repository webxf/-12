import Vue from 'vue'
import App from './App'
import store from './store'
// uview https://www.uviewui.com/components/npmSetting.html#_5-cli%E6%A8%A1%E5%BC%8F%E9%A2%9D%E5%A4%96%E9%85%8D%E7%BD%AE
import uView from 'uview-ui'
Vue.use(uView)
import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue';
Vue.component('l-echart', LEchart)
// 请求
import Service from './api'
Vue.prototype.$service = Service

// echarts
import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
