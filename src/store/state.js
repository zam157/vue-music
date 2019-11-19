import {playMode} from 'common/js/config'

const state = {
  singer: {}, // 歌手信息
  playing: false, // 播放状态
  fullScreen: false, // 全屏状态
  playList: [], // 播放列表
  sequenceList: [], // 随机播放列表
  mode: playMode.sequence, // 播放模式（顺序：1，循环：2，随机：3）
  currentIndex: -1 // 当前播放歌曲索引
}

export default state
