<template>
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {getSongUrls} from 'api/song'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getDetail()
  },
  methods: {
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this._normalizeSongs(res.data.list)
            .then(ret => {
              this.songs = ret
            })
        }
      })
    },
    _normalizeSongs (list) {
      let ret = [] // Song对象数组
      let songmidArr = []

      list.forEach(item => {
        let {musicData} = item
        songmidArr.push(musicData.songmid)
      })
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
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"
</style>
