<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { processSongsUrl, createSong } from 'common/js/song'
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
        if(this.songs.length) {
          return this.songs[0].image
        }  
        return ''
      }
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getTopList()
    },
    methods: {
      _getTopList() {
        if(!this.topList.id) {
          this.$router.push('/rank')
          return 
        }
        getMusicList(this.topList.id).then((res) => {
          if(res.code === ERR_OK) {
            processSongsUrl(this._normalizeSongs(res.songlist)).then(song => {
               this.songs = song
            })
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let musicData = item.data
          if(musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
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