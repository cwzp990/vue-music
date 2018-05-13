<!-- 播放器 -->
<template>
  <div class="player" v-show="fullScreen">
    <div class="normal-player">
      <v-header :title="currentSong.name" :subhead="currentSong.artists" :isPlayer="true" @back="back"></v-header>
      <div class="middle">
        <div class="cd-wrapper">
          <div class="cd" :class="CDCls" v-if="currentSong.album">
            <img :src="currentSong.album.blurPicUrl" width="100%" height="100%" class="cd-img">
          </div>
        </div>
        <div>
          <ul class="btn">
            <li class="btn-item"><svg-icon icon-class="fav"></svg-icon></li>
            <li class="btn-item"><svg-icon icon-class="download"></svg-icon></li>
            <li class="btn-item"><svg-icon icon-class="comment"></svg-icon></li>
            <li class="btn-item"><svg-icon icon-class="more"></svg-icon></li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <div class="progress-wrapper" v-if="currentSong.mMusic">
          <progress-bar :start="formate(currentTime)" :end="formate(currentSong.mMusic.playTime / 1000)" :percent="percent" @percentChanging="onProgressChange"></progress-bar>
        </div>
        <div>
          <ul class="btn">
            <li class="btn-item"><svg-icon icon-class="list_loop"></svg-icon></li>
            <li class="btn-item" @click="pre"><svg-icon icon-class="pre"></svg-icon></li>
            <li class="btn-item" @click="togglePlaying"><svg-icon :icon-class="playIcon"></svg-icon></li>
            <li class="btn-item" @click="next"><svg-icon icon-class="next"></svg-icon></li>
            <li class="btn-item"><svg-icon icon-class="song_list"></svg-icon></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-img" v-if="currentSong.album">
      <img :src="currentSong.album.blurPicUrl" width="100%" height="100%">
    </div>
    <audio ref="audio" :src="songUrl" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import VHeader from 'components/header/header'
import ProgressBar from 'components/progress-bar/progress-bar'
import { api } from 'api/index'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      songUrl: '',
      songReady: false,
      currentTime: 0
    }
  },
  created () {
    this.getSongUrl()
  },
  methods: {
    getSongUrl () {
      api.getMusicUrlResource(this.currentSong.id).then(res => {
        this.songUrl = res.data.data[0].url
      })
    },
    back () {
      this.setFullScreen(false)
    },
    togglePlaying () {
      this.setPlayingState(!this.playing)
    },
    pre () {
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    next () {
      console.log(this.currentSong.id)
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    ready () {
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    formate (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._padStart(interval % 60)
      return `${minute}:${second}`
    },
    onProgressChange (percent) {
      this.$refs.audio.currentTime = this.currentSong.mMusic.playTime / 1000 * percent
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    _padStart (num, n = 2) {
      let len = num.toString().length
      while (len < 2) {
        num = '0' + num
        len++
      }
      return num
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  computed: {
    playIcon () {
      return this.playing ? 'pause' : 'play'
    },
    CDCls () {
      return this.playing ? 'play' : 'play pause'
    },
    disableCls () {
      return this.songReady ? '' : 'disable'
    },
    percent () {
      return this.currentTime / (this.currentSong.mMusic.playTime / 1000)
    },
    ...mapGetters(['fullScreen', 'playlist', 'currentIndex', 'currentSong', 'playing'])
  },
  watch: {
    currentSong () {
      let that = this
      that.$nextTick(() => {
        that.$refs.audio.play()
      })
    },
    playing (newPlaying) {
      const audio = this.$refs.audio
      let that = this
      that.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  components: {
    VHeader,
    ProgressBar
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.player {
  position: fixed;
  top: 0;
  bottom: 0;
  @include wh(100%, 100%);
  z-index: 500;
  background: rgb(57, 77, 87);
  .normal-player {
    .middle {
      position: absolute;
      top: 1.95rem;
      bottom: 6rem;
      @include wh(100%, 100%);
      .cd-wrapper {
        @include center;
        top: 9rem;
        box-sizing: border-box;
        @include wh(13rem, 13rem);
        .cd {
          @include wh(100%, 100%);
          border-radius: 50%;
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
          .cd-img {
            @include allcover;
            @include wh(100%, 100%);
            border-radius: 50%;
            box-sizing: border-box;
            border: 1.5rem solid rgba(0, 0, 0, 0.7);
          }
        }
      }
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        @include cl;
        bottom: 8rem;
        @include wh(80%, 3rem);
        .btn-item {
          flex: 1;
          text-align: center;
          .svg-icon {
            @include svg(1.5rem, #fff);
          }
        }
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
      @include wh(100%, 6rem);
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        @include cl;
        @include wh(100%, 3rem);
        .btn-item {
          flex: 1;
          text-align: center;
          .svg-icon {
            @include svg(1.5rem, #fff);
          }
        }
      }
    }
  }
  .bg-img {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
    @include wh(100%, 100%);
    filter: blur(20px);
    opacity: 0.6;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
