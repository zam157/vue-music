<template>
  <div class="singer-detail"></div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {getSongUrls} from 'api/song'
import {createSong} from 'common/js/song'

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
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
              console.log(ret)
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
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background

</style>
