<template>
  <div class="singer">
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <listview @select="selectSinger" :data="singers"></listview>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import Listview from 'base/listview/listview'
import {mapMutations} from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          // 遍历筛选出前HOT_SINGER_LEN的热门歌手
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex // 歌手的姓的拼音字母
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }

        // 将歌手信息按字母分类
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 将map转换为数组，得到有序列表
      let hot = []
      let rest = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          rest.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      rest.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(rest)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Listview
  }
}
</script>

<style lang="stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%

  .slide-enter-active, .slide-leave-active
    transition all .3s ease

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
