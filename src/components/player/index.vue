<template>
<div class="m-player">
  <transition name="normal" appear>
    <div class="normal-player" v-show="showPlayer">
      <div class="bg-img">
        <img v-if="currentMusic.al" :src="currentMusic.al.picUrl" alt />
      </div>
      <mHeader isWhite>
        <template v-slot:title>
          <div>
            <p class="title more">{{currentMusic.name}}</p>
            <p v-if="currentMusic.ar" class="subtitle">{{currentMusic.ar[0].name}}</p>
          </div>
        </template>
        <template v-slot:right></template>
      </mHeader>
      <div class="player-middle" @click="toggleLyric">
        <div class="middle-l" v-if="currentShow==='cd'">
          <div class="cd-wrapper">
            <div class="cd play" :class="isPlaying ? '' : 'pause'">
              <img v-if="currentMusic.al" class="image" :src="currentMusic.al.picUrl" alt />
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">{{playingLyric || 'music~'}}</div>
          </div>

          <div class="operators-wrapper large-icon">
            <span class="btn-wrapper" @click="onLike">
              <i class="iconfont icon-love"></i>
            </span>
            <span class="btn-wrapper" @click.stop="onComment">
              <i class="iconfont icon-comments"></i>
            </span>
          </div>
        </div>

        <div class="middle-r" v-else>
          <Scroll>
            <div class="lyric-wrapper">
              <p class="no-lrc" v-if="!lyric.length">暂无歌词</p>
              <p ref="lyricLine" class="text" :class="{ 'current': currentLine === index }" v-for="(line, index) in lyric" :key="index">{{ line.txt }}</p>
            </div>
          </Scroll>
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
            <progress-bar :percent="percent" :percentChange="percentChange"></progress-bar>
          </div>
          <span class="time time-r">{{ formatPlayTime(duration) }}</span>
        </div>
        <div class="operators-wrapper">
          <span class="btn-wrapper" @click="changeMode">
            <i class="iconfont icon-order" v-if="mode === 0"></i>
            <i class="iconfont icon-loop" v-else-if="mode === 1"></i>
            <i class="iconfont icon-random" v-else></i>
          </span>
          <span class="btn-wrapper" @click="prev">
            <i class="iconfont icon-back"></i>
          </span>
          <span class="btn-wrapper" @click="toggle">
            <i class="iconfont icon-pause" v-if="isPlaying"></i>
            <i class="iconfont icon-play-circle" v-else></i>
          </span>
          <span class="btn-wrapper" @click="next">
            <i class="iconfont icon-next"></i>
          </span>
          <span class="btn-wrapper" @click="showList">
            <i class="iconfont icon-menu"></i>
          </span>
        </div>
      </div>
    </div>
  </transition>
  <audio ref="player" @canplay="ready" @ended="end" @timeupdate="updateTime" @error="urlError"></audio>
</div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  watch
} from 'vue';
import {
  useRouter
} from 'vue-router';
import {
  useStore
} from 'vuex'
import api from "../../api";
import {
  playMode,
  formatPlayTime,
  lyricParser
} from '../../utils/index';
import mHeader from '../../components/header/index.vue';
import Scroll from '../../components/scroll/index.vue';
import progressBar from '../progress/index.vue';
import toast from '../toast'
export default defineComponent({
  components: {
    mHeader,
    Scroll,
    progressBar
  },
  setup() {
    const player = ref(null)
    const currentShow = ref('cd')
    const playingLyric = ref('')
    const lyric = ref([])
    const currentTime = ref(0)
    const currentLine = ref(0)
    const mode = ref(0)
    const isPlaying = ref(false)
    const isReady = ref(false)
    const store = useStore()
    const route = useRouter()

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
      const newTime = duration.value * percent
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
      if (isPlaying.value) {
        store.commit('SET_PLAYER_STATE', false)
        player.value.pause()
      } else {
        store.commit('SET_PLAYER_STATE', true)
        player.value.play()
      }
      isPlaying.value = !isPlaying.value
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
      if (playList.value.length === 1) return
      let index = currentIndex.value - 1
      if (index < 0) {
        store.commit("SET_CURRENTINDEX", playList.value.length - 1)
      }
      store.commit("SET_CURRENTINDEX", index)
      store.commit("SET_CURRENTMUSIC", playList.value[index])
    }
    const next = () => {
      if (!isReady.value) return
      if (playList.value.length === 1) return
      let index = currentIndex.value + 1
      if (index === playList.value.length) index = 0
      store.commit("SET_CURRENTINDEX", index)
      store.commit("SET_CURRENTMUSIC", playList.value[index])
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
    const toggleLyric = () => {
      currentShow.value = currentShow.value === 'cd' ? 'lyric' : 'cd'
    }
    const updateTime = e => {
      currentTime.value = e.target.currentTime
    }
    const onLike = () => {}
    const onComment = () => {
      store.commit('SET_SHOW_PLAYER', false)
      route.push({
        path: '/comment',
        query: {
          id: currentMusic.value.id
        }
      })
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
          let lyrics = lyricParser(resp.data.lrc.lyric)
          lyric.value = lyrics
        }
      })
    }

    const getSongUrl = () => {
      toast('此歌无版权，正在为您切换播放源～')
      if (currentMusic.value && currentMusic.value.id) {
        api.getSongUrl(currentMusic.value.id).then(resp => {
          if (resp.status === 200) {
            if (resp.data.code === 200) {
              player.value.src = resp.data.url
              currentTime.value = 0
              currentLine.value = 0
              playingLyric.value = ''
              isPlaying.value = true
              isReady.value = true
              player.value.play()
            }
          }
        })
      }
    }

    watch(currentMusic, () => {
      if (currentMusic.value) {
        currentTime.value = 0
        currentLine.value = 0
        playingLyric.value = ''
        isPlaying.value = true
        player.value.src = `http://music.163.com/song/media/outer/url?id=${currentMusic.value.id}.mp3`
        getLyric(currentMusic.value.id)
        player.value.play()
      }
    })

    watch(currentTime, () => {
      if (!lyric.value.length || !isPlaying.value) return
      let lyricIndex = 0,
        nowLyric = ''
      for (let i = 0; i < lyric.value.length; i++) {
        if (currentTime.value > lyric.value[i].time) {
          lyricIndex = i
          nowLyric = lyric.value[i].txt
        }
      }
      currentLine.value = lyricIndex
      playingLyric.value = nowLyric
    })

    return {
      player,
      currentShow,
      currentTime,
      currentLine,
      mode,
      changeMode,
      toggleLyric,
      isPlaying,
      isReady,
      showPlayer,
      currentIndex,
      currentMusic,
      playingLyric,
      playList,
      lyric,
      duration,
      percent,
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
      onLike,
      onComment
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
            border: 35px solid #000;
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
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 20px auto 10% auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            @include sc($font_small, #fff);
          }
        }

        .large-icon {
          .iconfont {
            font-size: 24px;
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
      bottom: 40px;
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
        margin: 10px auto;
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
    }

    .operators-wrapper {
      display: flex;
      align-items: center;

      .btn-wrapper {
        flex: 1;
        text-align: center;

        .iconfont {
          @include sc($font_huge, #fff);
        }

      }
    }
  }

  .title {
    @include wh(70%, 24px);
    margin: 0 auto;
    line-height: 24px;
    text-align: center;
    @include sc($font_large, #fff);
  }

  .subtitle {
    line-height: 16px;
    text-align: center;
    @include sc($font_small, #fff);
  }
}
</style>
