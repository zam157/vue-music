import axios from 'axios'
import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp'

export function getTopList () {
  const url = '/api/getTopList'

  const params = {
    data: {
      comm: {
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1
      },
      topList: {
        module: 'musicToplist.ToplistInfoServer',
        method: 'GetAll',
        param: {}
      }
    }
  }

  return axios.get(url, {
    params
  }).then(res => Promise.resolve(res.data))
}

export function getMusicList (topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    page: 'detail',
    type: 'top',
    platform: 'h5',
    needNewCode: 1,
    topid
  })

  return jsonp(url, data, options)
}
