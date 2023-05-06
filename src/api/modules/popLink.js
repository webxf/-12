
const popLink = {
    // 获取市局预警列表
    getSjyjPage: {
        url: '/qyjg/ybjgl/sjyj/page',
        method: 'get',
    },
    // 获取市局预警详情
    getSjyjDetail: {
        url: '/qyjg/ybjgl/sjyj/getDetail',
        method: 'get',
    },
    // 获取市局预警处置
    SjyjDeal: {
        url: '/qyjg/ybjgl/sjyj/deal',
        method: 'post',
        contentType: 'json'
    },
    // 获取监督检查列表
    getZxjcPage: {
        url: '/qyjg/zqt/zxjc/page',
        method: 'get',
    },
    // 获取监督检查保存、完成任务
    ZxjcSaveData: {
        url: '/qyjg/zqt/zxjc/saveData',
        method: 'post',
        contentType: 'json'
    },
    
    // 获取检查通知列表
    getJctzPage: {
        url: '/qyjg/zqt/jctz/page',
        method: 'get',
    },
}   

export default popLink