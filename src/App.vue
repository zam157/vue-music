<template>
    <div id="app">
        <m-header></m-header>
        <tab></tab>
        <router-view>
          <recommend></recommend>
        </router-view>
    </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Recommend from 'components/recommend/recommend'

export default {
  components: {
    MHeader,
    Tab,
    Recommend
  }
}
</script>

<style scoped lang="stylus" rel="">
    @import "~common/stylus/variable";
</style>
