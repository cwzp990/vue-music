<template>
  <div class="home">
    <div class="header">
      <!-- 头部搜索框 -->
      <div class="svg-wrapper">
        <svg-icon icon-class="micro" style="left: .5rem;"></svg-icon>
      </div>
      <div class="searchbox-wrapper">
        <input placeholder="搜一搜" @focus="gotoAddress('/search')">
        <svg-icon icon-class="search"></svg-icon>
      </div>
      <div class="svg-wrapper" @click="showPlayer">
        <svg-icon icon-class="playing" :class="{play: playing, pause: !playing}"></svg-icon>
      </div>
    </div>
    <!-- 头部tab导航 -->
    <div class="tab">
      <tab>
        <tab-item selected @on-item-click="gotoAddress('/home/music')">音乐</tab-item>
        <tab-item @on-item-click="gotoAddress('/home/video')">视频</tab-item>
        <tab-item @on-item-click="gotoAddress('/home/radio')">电台</tab-item>
      </tab>
    </div>
    <div class="home-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
import { Tab, TabItem } from 'vux'
export default {
  data () {
    return {
      results: [],
      value: ''
    }
  },
  computed: {
    ...mapGetters(['fullScreen', 'playlist', 'playing'])
  },
  methods: {
    gotoAddress (route) {
      this.$router.push(route)
    },
    showPlayer () {
      if (!this.playlist.length) {
        return
      }
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  },
  components: {
    Tab,
    TabItem
  }
}
</script>

<style lang="scss">
@import '../../style/mixin';
.home {
  position: fixed;
  top: 0;
  bottom: 1.95rem;
  @include wh(100%, 100%);
  .header {
    position: relative;
    @include wh(100%, 1.95rem);
    background: $juzi;
    .searchbox-wrapper {
      position: relative;
      @include wh(75%, 70%);
      @include center();
      input {
        @include wh(100%, 100%);
        border-radius: 20px;
        padding: 0 2rem;
        box-sizing: border-box;
        @include sc(0.7rem, #b2b2b2);
      }
      .svg-icon {
        position: absolute;
        top: 0.2rem;
        left: 0.8rem;
        @include svg(1rem, #b2b2b2);
      }
    }
    .svg-wrapper {
      .svg-icon {
        @include ct();
        right: 0.5rem;
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
  }
  .home-container {
    @include wh(100%, 80%);
    overflow: hidden;
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
