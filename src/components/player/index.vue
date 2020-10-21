<template>
<div class="m-player">
  <transition name="normal" appear>
    <div class="normal-player" v-show="showPlayer">
      <div class="bg-img">
        <img v-if="currentMusic.al" :src="currentMusic.al.picUrl" alt />
      </div>
      <div class="player-nav">
        <div class="back" @click="back">
          <i class="iconfont icon-left"></i>
        </div>
        <p class="title more">{{currentMusic.name}}</p>
        <p v-if="currentMusic.ar" class="subtitle">{{currentMusic.ar[0].name}}</p>
      </div>
      <div class="player-middle">
        <div class="middle-l" ref="middleL">
          <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd">
              <img v-if="currentMusic.al" class="image" :src="currentMusic.al.picUrl" alt />
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric"></div>
          </div>
        </div>

        <div>
          <div class="lyric-wrapper">
            <div>
              <!-- <p class="no-lrc" v-if="!lyric.length">暂无歌词</p> -->
              <p ref="lyricLine" class="text" :class="{ 'current': currentLine === index }" v-for="(line, index) in lyric" :key="item + index">{{ line.txt }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="player-footer">
        <div class="dot-wrapper">
          <span class="dot" :class="{ 'active': currentShow === 'cd' }"></span>
          <span class="dot" :class="{ 'active': currentShow === 'lyric' }"></span>
        </div>
        <div class="progress-wrapper">
          <span class="time time-l">{{ formatPlayTime(currentTime) }}</span>
          <div class="progress-bar-wrapper">
            <progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
          </div>
          <span class="time time-r">{{ formatPlayTime(duration) }}</span>
        </div>
        <div class="operators-wrapper">
          <span className="btn-wrapper" @click="changeMode">
            <i className="iconfont icon-order" v-if="mode === 0"></i>
            <i className="iconfont icon-loop" v-else-if="mode === 1"></i>
            <i className="iconfont icon-random" v-else></i>
          </span>
          <span className="btn-wrapper" @click="prev">
            <i className="iconfont icon-back"></i>
          </span>
          <span className="btn-wrapper" @click="toggle">
            <i className="iconfont icon-pause" v-if="isPlaying"></i>
            <i className="iconfont icon-play-circle" v-else></i>
          </span>
          <span className="btn-wrapper" @click="next">
            <i className="iconfont icon-next"></i>
          </span>
          <span className="btn-wrapper" @click="showList">
            <i className="iconfont icon-menu"></i>
          </span>
        </div>
      </div>
    </div>
  </transition>
  <audio ref="player" :src="songUrl" @canplay="ready" @ended="end" @timeupdate="updateTime" @error="urlError"></audio>
</div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  watchEffect
} from 'vue';
import {
  useStore
} from 'vuex'
import api from "../../api";
import {
  playMode,
  formatPlayTime,
  lyricParser
} from '../../utils/index';
export default defineComponent({
  setup() {
    const player = ref(null)
    const currentShow = ref('cd')
    const lyric = ref([])
    const currentTime = ref(0)
    const currentLine = ref(0)
    const mode = ref(0)
    const isPlaying = ref(false)
    const isReady = ref(false)
    const songUrl = ref('')
    const store = useStore()

    const showPlayer = computed(() => store.getters.showPlayer)
    const currentIndex = computed(() => store.getters.currentIndex)
    const currentMusic = computed(() => store.getters.currentMusic)
    const playList = computed(() => store.getters.playList)
    const duration = computed(() => currentMusic.value.dt / 1000)
    const percent = computed(() =>
      isNaN(currentTime.value / duration.value) ?
      0 :
      currentTime.value / duration.value
    )

    const percentChange = (percent) => {
      const newTime = currentMusic.value.duration * percent.value
      player.value.currentTime = newTime
      currentTime.value = newTime
      if (!isPlaying.value) {
        store.commit('SET_PLAYER_STATE', true)
      }
    }
    const back = () => {
      store.commit('SET_SHOW_PLAYER', false)
    }
    const toggle = () => {
      isPlaying.value = !isPlaying.value
      if (isPlaying.value) {
        store.commit('SET_PLAYER_STATE', false)
        player.value.pause()
      } else {
        store.commit('SET_PLAYER_STATE', true)
        player.value.play()
      }
    }
    const ready = () => {
      isReady.value = true
    }
    const loop = () => {
      currentTime.value = 0
      isPlaying.value = true
      player.value.play()
      if (lyric.value.length) {
        currentLine.value = 0
      }
    }
    const prev = () => {
      if (!isReady.value) return
      if (playList.value.length === 1) {
        loop()
        return
      } else {
        let index = currentIndex.value - 1
        if (index === -1) {
          index = playList.value.length - 1
        }
        currentIndex.value = index
        if (!isPlaying.value) {
          toggle()
        }
      }
    }
    const next = () => {
      if (!isReady.value) return
      if (playList.value.length === 1) {
        loop()
        return
      } else {
        let index = currentIndex.value + 1
        if (index === playList.value.length) {
          index = 0
        }
        currentIndex.value = index
        if (!isPlaying.value) {
          toggle()
        }
      }
    }
    const end = () => {
      if (mode.value === playMode.loop) {
        loop()
      } else {
        next()
      }
    }
    const changeMode = () => {
      let newMode = (mode.value + 1) % 3
      mode.value = newMode
    }
    const updateTime = e => {
      currentTime.value = e.target.currentTime
    }
    const urlError = () => {
      getSongUrl()
    }

    const getLyric = id => {
      api.getLyricResource(id).then(resp => {
        if (resp.data.code === 200) {
          if (resp.data.nolyric) {
            lyric.value = []
            return
          }
          let lyric = resp.data.lrc.lyric
          let lyrics = lyricParser(lyric)
          lyric.value = lyrics
        }
      })
    }

    const getSongUrl = () => {
      if (currentMusic.value && currentMusic.value.id) {
        api.getSongUrl(currentMusic.value.id).then(resp => {
          if (resp.status === 200) {
            if (resp.data.code === 200) {
              songUrl.value = resp.data.url
              currentTime.value = 0
              currentLine.value = 0
              isPlaying.value = true
              isReady.value = true
              player.value.play()
            }
          }
        })
      }

    }

    watchEffect(() => {
      if (currentMusic.value && currentMusic.value.id && isReady.value) {
        currentTime.value = 0
        currentLine.value = 0
        isPlaying.value = true
        songUrl.value = `http://music.163.com/song/media/outer/url?id=${currentMusic.value.id}.mp3`
        getLyric(currentMusic.value.id)
        player.value.play()
      }
    })

    return {
      player,
      currentShow,
      currentTime,
      currentLine,
      mode,
      changeMode,
      isPlaying,
      isReady,
      showPlayer,
      currentIndex,
      currentMusic,
      playList,
      lyric,
      duration,
      percent,
      songUrl,
      percentChange,
      back,
      toggle,
      prev,
      next,
      ready,
      end,
      updateTime,
      urlError,
      formatPlayTime,
    }
  },
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.m-player {
  .normal-player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1994;
    background: $black;

    .bg-img {
      position: absolute;
      left: 0;
      top: 0;
      @include wh(100%, 100%);
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .player-nav {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .iconfont {
          display: inline-block;
          padding: 9px;
          @include sc($font_large, #fff);
        }
      }

      .title {
        @include wh(70%, 40px);
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include sc($font_large, #fff);
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        @include sc($font_small, #fff);
      }
    }

    .player-middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 155px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        @include wh(100%, 0);
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          @include wh(80%, 100%);

          .cd {
            @include wh(100%, 100%);
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;

            .image {
              position: absolute;
              left: 0;
              top: 0;
              @include wh(100%, 100%);
              border-radius: 50%;
            }

            &.play {
              animation: rotate 20s linear infinite;
            }

            &.pause {
              animation-play-state: paused;
            }
          }

          .playing-lyric-wrapper {
            width: 80%;
            margin: 20px auto 0 auto;
            overflow: hidden;
            text-align: center;

            .playing-lyric {
              height: 20px;
              line-height: 20px;
              @include sc($font_small, #fff);
            }
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            @include sc($font_small, #fff);

            &.current {
              color: $theme;
            }
          }

          .no-lrc {
            margin-top: 150px;
            line-height: 32px;
            @include sc($font_small, #fff);
          }
        }
      }
    }

    .player-footer {
      position: absolute;
      bottom: 35px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          @include wh(8px, 8px);
          border-radius: 50%;
          background: $bgc;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $theme;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          @include sc($font_small, #fff);
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators-wrapper {
        display: flex;
        align-items: center;

        .btn-wrapper {
          flex: 1;
          text-align: center;

          .iconfont {
            @include sc($font_huge, #fff);

            &.disabled {
              color: $gray;
            }
          }

        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0) 100%;
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
