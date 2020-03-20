// import jsonp from 'common/js/jsonp'
import { commonParams } from './config'
import axios from 'axios'
// import jsonp from 'common/js/jsonp'

export function getRecommend () {
  const url = '/api/getRecommend'

  const params = Object.assign({}, commonParams, {
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      focus: {
        module: 'QQMusic.MusichallServer',
        method: 'GetFocus',
        param: {}
      }
    }
  })

  return axios.get(url, {
    params
  }).then(res => Promise.resolve(res.data))
}

export function getDiscList () {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList (disstid) {
  const url = '/api/getSongList'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    urf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then(res => Promise.resolve(res.data))
}
