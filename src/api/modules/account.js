const account = {
    // 获取台账列表
    getAccountData: {
        url: '/qyjg/tzgl/page',
        method: 'get',
    },
    // 获取台账详细数据
    getAccountDetails: {
        url: '/qyjg/tzgl/pageData',
        method: 'get',
    },
    // 获取台账详细
    postDeleteAccountDetails: {
        url: '/qyjg/tzgl/deleteTable',
        method: 'post',
		type:'post',
    },
	
	// 获取台账详细
	pageTable: {
	    url: '/qyjg/tzgl/pageTable',
	    method: 'get',
	},
	
	// 获取台账详情
	getDetail: {
	    url: '/qyjg/tzgl/getDetail',
	    method: 'get',
	},
	
	// 获取台账详情
	pageData: {
	    url: '/qyjg/tzgl/pageData',
	    method: 'get',
	},
	
	// 新增详情
	createData: {
	    url: '/qyjg/tzgl/createData',
	    method: 'post',
	},
	
	// 删除详情
	deleteData: {
	    url: '/qyjg/tzgl/deleteData',
	    method: 'post',
	},
	
	// 更新详情
	updateDatas: {
	    url: '/qyjg/tzgl/updateDatas',
	    method: 'post',
		contentType: 'json'
	},
}
export default account