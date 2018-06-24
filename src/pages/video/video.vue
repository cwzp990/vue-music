<!-- 首页tab video栏 -->
<template>
  <div class="home-video">
    <x-header>
      <svg-icon icon-class="player" slot="overwrite-left"></svg-icon>
      <svg-icon icon-class="playing" slot="right" :class="{play: playing, pause: !playing}"></svg-icon>
      <span>视频</span>
    </x-header>
    <scroll :probeType="3" direction="horizontal">
      <ul class="classify">
        <li>推荐</li>
        <li>音乐</li>
        <li>showtime</li>
        <li>MV</li>
        <li>二次元</li>
        <li>舞蹈</li>
        <li>游戏</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapGetters } from 'vuex'
import Scroll from 'components/scroll/scroll'
export default {
  computed: {
    ...mapGetters(['userid', 'playing', 'playlist'])
  },
  components: {
    XHeader,
    Scroll
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.home-video {
  @include allcover();
  @include wh(100%, 100%);
  .vux-header {
    background: $juzi;
    .svg-icon {
      @include svg(1rem, #fff);
    }
    .play {
      top: 25%;
      animation: rotate 20s linear infinite;
    }
    .pause {
      animation-play-state: paused;
    }
  }
  .list-wrapper {
    @include wh(100%, 1rem);
    overflow: hidden;
    .classify {
      @include wh(200%, 1rem);
      li {
        float: left;
        height: 1rem;
        padding: 0 .7rem;
        @include font(.7rem, 1rem);
      }
    }
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
