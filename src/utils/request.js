import axios from 'axios'
import qs from 'qs'
import axiosAdapterUniapp from 'axios-adapter-uniapp'
import store from '@/store'
/**
 * @description 基于axios的二次封装
 */
const Instance = axios.create({
    // #ifdef  MP-WEIXIN
    baseURL: 'https://xx7x.star7.cn:8090',
    // baseURL: 'http://192.168.40.94:8896',
    // #endif
    // #ifndef  MP-WEIXIN
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://xx7x.star7.cn:8090',
    //   baseURL: process.env.NODE_ENV === 'development' ? '/api': 'http://192.168.40.96:8896',
    // #endif
    timeout: 60 * 1000,
    adapter: axiosAdapterUniapp,
})
Instance.interceptors.request.use(
    (config) => {
        if (config.url.indexOf('sso3') > -1) {
            // #ifdef  MP-WEIXIN
            config.baseURL = 'https://xx7x.star7.cn:8090'
            // #endif
            // #ifndef  MP-WEIXIN
            config.baseURL =
                process.env.NODE_ENV === 'development'
                    ? '/sso'
                    : 'https://xx7x.star7.cn:8090'
            // #endif
        }
        // 如果已登录 则获取token
        if (store.getters.isLogin) {
            let token = store.getters.token
            config.headers['Authorization'] = token
            // token 不存在 则退出登录
            !token && store.dispatch('user/loginOut')
        }
        console.log()
        if (config.method === 'post') {
            if (config.contentType === 'json') {
                config.headers['Content-Type'] = 'application/json;charset=UTF-8'
            } else {
                config.data = qs.stringify(config.data)
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }
        } else if (config.method === 'get') {
            config.params = {
                ...config.params,
            }
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
const successCode = [200, 'success']
Instance.interceptors.response.use(
    (response) => {
        const { code, message } = response.data
        if (successCode.includes(code) || typeof code !== 'number') {
            return response.data
        } else if (response.responseType == 'blob') {
            return response.data
        } else {
            return Promise.resolve(response.data)
        }
    },
    (error) => {
        if (error.message !== 'cancel http') {
            console.log('服务异常，请稍后再试')
        }
        return Promise.reject(error)
    }
)

export default Instance
