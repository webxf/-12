import Service from '@/api'
const state={
    token:'',
    isLogin:false,
    userInfo:{
        id:'',
        username:'',
        nikeName:'',
    }
}

const mutations={
    SET_TOKEN(state,token){
        state.token = token;
    },
    SET_LOGIN_STATUS(state,status){
        state.isLogin = status;
    }
}

const actions = {
    login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            Service.login.encode({password:userInfo.password}).then((res)=>{
                let params ={
                    ...userInfo,
                    password:res.data
                }
                Service.login.login(params).then(response => {
                    if(response.code === '200'){
                        const { data } = response
                        commit('SET_TOKEN', data.accessToken)
                        commit('SET_LOGIN_STATUS',true) 
                        uni.setStorageSync('token', data.accessToken)
                        uni.setStorageSync('user_Info', JSON.stringify(data.user_info))
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        })
    },
    setUserInfo({commit},data){
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', data.accessToken)
            commit('SET_LOGIN_STATUS',true) 
            resolve()
        })
    },
    loginOut({commit}){
        return new Promise((resolve) => {
            commit('SET_TOKEN', '')
            commit('SET_LOGIN_STATUS','') 
            uni.clearStorageSync();
            uni.reLaunch({
                url:'/pages/login/index'
            })
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
