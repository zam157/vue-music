<template>
  <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'

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
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albummid && musicData.pay.payplay === 0) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>

</style>
