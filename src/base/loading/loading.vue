<template>
  <div class="loading">
    <img class="loading-img" width="24" height="24" src="./loading.png"/>
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width 100%
    text-align center
    .desc
      line-height: 20px
      font-size $font-size-small
      color: $color-text-l
    .loading-img
      display inline
      animation: 1.5s loading linear infinite;
    @keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
