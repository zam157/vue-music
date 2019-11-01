import originJSONP from 'jsonp'

/**
 * Promise化jsonp方法
 * @param {String} url
 * @param {Object} data
 * @param {Object} option
 */
export default function jsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 将data中的数据当做get请求url中的参数
 * @param {Object} data jsonp请求参数
 * @return {String} 拼接好的url请求字符串
 */
function param (data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : '' // 如果所遍历属性值为undefined则设置该参数为空
    url += `&${k}=${encodeURIComponent(value)}` // 拼接url
  }
  return url ? url.substring(1) : ''
}
