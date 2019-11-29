<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import MusicList from 'components/music-list/music-list'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { processSongsUrl, createSong } from 'common/js/song'

  export default {
    components: {
      MusicList
    },
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if(!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if(res.code === ERR_OK) {
            processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then(song => {
              this.songs = song
            })
          }
        })
      },
      _normalizeSongs(list) {
        const ret = []
        list.forEach((musicData) => {
         if(musicData.songid && musicData.albumid) {
           ret.push(createSong(musicData))
         }
        })
        console.log('这里才是数据原图', ret)
        return ret 
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>