<!-- 播放器 -->
<template>
  <div class="player" v-show="fullScreen">
    <div class="normal-player">
      <v-header :title="currentSong.name" :subhead="currentSong.artists" :isPlayer="true" @back="back"></v-header>
      <div class="middle">
        <div class="cd-wrapper">
          <div class="cd" v-if="currentSong.album">
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
        <div class="progress-wrapper">
          <progress-bar></progress-bar>
        </div>
        <div>
          <ul class="btn">
            <li class="btn-item"><svg-icon icon-class="list_loop"></svg-icon></li>
            <li class="btn-item"><svg-icon icon-class="pre"></svg-icon></li>
            <li class="btn-item"><svg-icon icon-class="play"></svg-icon></li>
            <li class="btn-item"><svg-icon icon-class="next"></svg-icon></li>
            <li class="btn-item"><svg-icon icon-class="song_list"></svg-icon></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-img" v-if="currentSong.album">
      <img :src="currentSong.album.blurPicUrl" width="100%" height="100%">
    </div>
  </div>
</template>

<script>
import VHeader from 'components/header/header'
import ProgressBar from 'components/progress-bar/progress-bar'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    back () {
      this.setFullScreen(false)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  },
  computed: {
    ...mapGetters(['fullScreen', 'playlist', 'currentSong'])
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
          .cd-img {
            @include allcover;
            @include wh(100%, 100%);
            border-radius: 50%;
            box-sizing: border-box;
            border: 1.5rem solid rgba(0, 0, 0, 0.7);
          }
          .play {
            animation: rotate 20s linear infinite;
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
</style>
