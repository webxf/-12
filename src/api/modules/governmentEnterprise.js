const governmentEnterprise = {
    // 获取检查通知列表
    getJctzList: {
        url: '/qyjg/zqt/jctz/page',
        method: 'get',
    },
    // 检查通知 签收
    postJctxSigon: {
        url: '/qyjg/zqt/jctz/qs',
        method: 'post'
    }
}
export default governmentEnterprise