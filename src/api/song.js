import axios from 'axios'

/**
 * 请求songmid对应的歌曲url
 * @param {Array} songmidArr songmid的数组
 */
export function getSongUrls (songmidArr) {
  const url = '/api/getSongUrls'
  const params = {
    id: songmidArr
  }

  return axios.get(url, {params})
    .then((res) => {
      return Promise.resolve(res.data)
    })
}
