import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

/**
 * 获取关键词接口
 */
export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function search (query, page, zhida, perpage = 20) {
  const url = '/api/search'

  const params = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    perpage,
    n: perpage,
    zhidaqu: 1,
    platform: 'h5',
    needNewCode: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    remoteplace: 'txt.mqq.all',
    format: 'json'
  })

  return axios.get(url, {params})
    .then(res => Promise.resolve(res.data))
}
