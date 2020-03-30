import { getLyric, getSongUrls } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }

  getSongUrl () {
    if (this.url) {
      return Promise.resolve(this.url)
    }

    return new Promise((resolve, reject) => {
      getSongUrls(this.mid).then(res => {
        if (res.data[this.mid]) {
          // this.url = res.data[this.mid]
          resolve(res.data[this.mid])
        } else {
          reject(new Error('获取歌曲链接失败'))
        }
      })
    })
  }
}

export function createSong (musicData, url) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url
  })
}

/**
 * 处理歌手列表
 * @param {Array} singer 歌手列表
 */
export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}

/**
 * 将url添加到ret中, 返回Promise
 * @param {Array} list 原始接口数据
 * @param {Array} songmidArr 歌曲mid数组
 * @param {Array} ret 最终生成的Song对象数组
 */
export function normalizeSongs (list, songmidArr, ret = []) {
  return getSongUrls(songmidArr)
    .then(res => {
      if (res.data) {
        list.forEach(item => {
          let {musicData} = item
          ret.push(createSong(musicData, res.data[musicData.songmid]))
        })
      }
      return Promise.resolve(ret)
    })
}
