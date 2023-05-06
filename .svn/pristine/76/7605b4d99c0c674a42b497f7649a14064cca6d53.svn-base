/**
 * @description Export All Service Api
 */

import request from '@/utils/request'
import axios from 'axios'
const serviceFiles = require.context('./modules', false, /\.js$/)

const serviceCombine = {}
const service = {}

serviceFiles.keys().forEach(key => {
  const filename = key.replace(/(\.\/|\.js)/g, '')
  serviceCombine[filename] = serviceFiles(key)['default']
})

for (const key in serviceCombine) {
  service[key] = {}
  const apiMap = serviceCombine[key]
  for (const methodName in apiMap) {
    service[key][methodName] = (data, methodUrl = '', interceptorsRequestCallback) => {
      const apiData = apiMap[methodName]
      const url = apiData.isPathParameter ? apiData.url.replace(/^\//, '') + `/${methodUrl}` : methodUrl || apiData.url.replace(/^\//, '')
      const source = axios.CancelToken.source()
      const requestConfig = {
        method: apiData.method || 'get',
        url: url,
        cancelToken: source.token,
        contentType: apiData.contentType,
        responseType: apiData.responseType
      }
      const dataName = requestConfig.method === 'get' ? 'params' : 'data'
      requestConfig[dataName] = data
      // 把 axios  请求token  传出去
      if (typeof interceptorsRequestCallback === 'function') {
        interceptorsRequestCallback(source)
      }
      return request(requestConfig)
    }
  }
}

export default service
