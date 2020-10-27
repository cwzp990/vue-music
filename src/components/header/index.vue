<template>
<div class="m-header" :class="isWhite ? 'white': ''">
  <div class="header-back" @click="back">
    <slot name="left">
      <i class="iconfont icon-left"></i>
    </slot>
  </div>
  <div class="header-title">
    <slot name="title"></slot>
  </div>
  <div class="header-player">
    <slot name="right">
      <div class="player-wrapper play" v-if="currentMusic.al" :class="playerState ? '' : 'pause'" @click="onShowPlayer">
        <img :src="currentMusic.al.picUrl" alt />
      </div>
      <div class="no-music" v-else>
        <i class="iconfont icon-rank"></i>
      </div>
    </slot>
  </div>
</div>
</template>

<script>
import {
  defineComponent,
  computed
} from 'vue'
import {
  useRouter
} from 'vue-router'
import {
  useStore
} from 'vuex'

export default defineComponent({
  props: {
    isWhite: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const showPlayer = computed(() => store.getters.showPlayer)
    const playerState = computed(() => store.getters.playerState)
    const currentMusic = computed(() => store.getters.currentMusic)

    const back = () => {
      if (showPlayer.value) {
        store.commit('SET_SHOW_PLAYER', false)
      } else {
        router.go(-1)
      }
    }

    const onShowPlayer = () => {
      store.commit('SET_SHOW_PLAYER', true)
    }

    return {
      playerState,
      currentMusic,
      onShowPlayer,
      back
    }
  }
})
</script>

<style lang="scss">
@import "../../styles/mixin.scss";

.m-header {
  position: relative;
  height: 40px;

  .header-back {
    position: absolute;
    top: 0;
    left: 0;

    .iconfont {
      display: inline-block;
      padding: 8px;
      @include sc(24px, $black);
    }
  }

  .normal-title {
    line-height: 40px;
  }

  .header-title {
    @include wh(70%, 40px);
    margin: 0 auto;
    text-align: center;
    @include sc($font_large, $black);
  }

  .header-player {
    position: absolute;
    top: 8px;
    right: 8px;

    .player-wrapper {
      @include wh(26px, 26px);
      border-radius: 50%;
      overflow: hidden;

      &.play {
        animation: rotate 20s linear infinite;
      }

      &.pause {
        animation-play-state: paused;
      }
    }
  }

  .no-music {
    .iconfont {
      @include sc(24px, $black);
    }
  }
}

.white {

  .iconfont,
  .normal-title,
  .title,
  .subtitle {
    color: #fff !important;
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
