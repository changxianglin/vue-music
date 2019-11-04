<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import MusicList from 'components/music-list/music-list'
  export default {
    components: {
      MusicList
    },
    computed: {
      ...mapGetters(['topList']),
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        return this.topList.picUrl
      }
    }
  }
</script>

<style lang="stylus" scoped rel="sytlesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>