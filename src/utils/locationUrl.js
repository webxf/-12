// const locatioUrl = process.env.NODE_ENV === 'development' ? '/api' : 'https://xx7x.star7.cn:8090'
const locatioUrl = process.env.NODE_ENV === 'development' ? 'https://xx7x.star7.cn:8090' : 'https://xx7x.star7.cn:8090'
const ImgUrl = process.env.NODE_ENV === 'development' ? 'http://114.55.56.60:9092/tzjsc/upFile/' : locatioUrl + '/tzjsc/upFile/'

// let baseUrl = window.location.protocol+ '//' + window.location.host
export default { locatioUrl, ImgUrl }