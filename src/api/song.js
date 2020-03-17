import { commonParams } from './config'
import axios from 'axios'

export function getLyric (mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid, // 歌曲mid
    pcachetime: +new Date(), // 当前时间戳
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 1965605037,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then(res => Promise.resolve(res.data))
}

/**
 * 请求songmid对应的歌曲url
 * @param {Array} songmidArr songmid的数组
 */
export function getSongUrls (songmidArr) {
  // const url = '/api/getSongUrls'
  const url = `http://${window.location.hostname}:3300/song/urls`
  const params = {
    id: songmidArr.toString()
  }

  return axios.get(url, {params})
    .then((res) => {
      return Promise.resolve(res.data)
    })
}
