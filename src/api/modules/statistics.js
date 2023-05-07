const statistics = {
    // 获取在线预警
    getOnlineWarning: {
        url: '/qyjg/zhzx/zhzx/zxtx',
        method: 'get',
    },
    // 获取申报提醒
    getDeclareWarnList: {
        url: '/qyjg/zhzx/zhzx/sbtx',
        method: 'get'
    },
    // 获取巡检台账信息
    getPollingList: {
        url: '/qyjg/zhzx/zhzx/xjtz',
        method: 'get'
    },
    //获取应急预案信息
    getEmergencyDate:{
        url:'/qyjg/zhzx/xmtx/yjya',
        method: 'get'
    },
    //获取清洁生产信息
    getCleanDate:{
        url:'/qyjg/zhzx/xmtx/qjsc',
        method: 'get'
    },
    //获取总量控制信息
    getSumDate:{
        url:'/qyjg/index/listZlkz',
        method:'get'
    },
    //获取报表信息
    getReportDate:{
        url:'/qyjg/zhzx/qybb/pageQySelf',
        method:'get'
    },
    //获取在线报警数据列表
    getAlarmList:{
        url:'/qyjg/zhzx/dxyj/page',
        method:'get'
    },
    //获取在线报警详情
    getOnlineAlarmDate:{
        url:'/qyjg/zhzx/dxyj/getDetail',
        method:'get'
    },
    //获取巡检详情
    getInspectDate:{
        url:'/qyjg/zhzx/xjcl/pageAlert',
        method:'get'
    },
    //获取巡检详情
    getInspectDetail:{
        url:'/qyjg/zhzx/xjcl/getDetail',
        method:'get'
    },
    //获取档案管理数据
    getdaDate:{
        url:'/qyjg/index/zhzxDagl',
        method:'get'
    },
    //废水气进度
    getWaterDate:{
        url:'/qyjg/index/listZlkz',
        method:'get'
    },
    //台账管理
    gettzDate:{
        url:'/qyjg/index/getTzgl',
        method:'get'
    },
    //获取申报管理
    getsbDate:{
        url:'/qyjg/index/getSbglCount',
        method:'get'
    },
    //上传信息
    postsxjDate:{
        url:'/qyjg/zhzx/xjcl/deal',
        method:'post'
    },
    //政企通
    getzqtDate:{
        url:'/qyjg/index/listZqt',
        method:'get'
    },
    //环保工况数据
    // gethbgkDate:{
    //     url:'/qyjg/index/listZqt',
    //     method:'get'
    // }
    //因子数据
    getyzDate:{
        url:'/qyjg/zhzx/zhzx/ycpkyzcb',
        method:'get' 
    }
}
export default statistics