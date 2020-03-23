<template>
  <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { getSongUrls } from 'api/song'

export default {
  computed: {
    title () {
      return this.topList.title
    },
    bgImage () {
      return this.topList.mbFrontPicUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  created () {
    this._getMusicList()
  },
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  methods: {
    _getMusicList () {
      if (!this.topList.topId) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.topId).then(res => {
        if (res.code === ERR_OK) {
          this._normalizeSongs(res.songlist)
            .then(res => {
              this.songs = res
            })
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      let songmidArr = []

      list.forEach(item => {
        const musicData = item.data
        songmidArr.push(musicData.songmid)
        // if (musicData.songid && musicData.albummid) {
        //   ret.push(createSong(musicData))
        // }
      })
      return getSongUrls(songmidArr)
        .then(res => {
          if (res.data) {
            list.forEach(item => {
              const musicData = item.data
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

<style lang="stylus" scoped>

</style>
