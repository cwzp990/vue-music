<template>
  <div class="social">
    <x-header>
      <svg-icon icon-class="add_friend" slot="overwrite-left"></svg-icon>
      <svg-icon icon-class="playing" slot="right" :class="{play: playing, pause: !playing}"></svg-icon>
      <button-tab>
        <button-tab-item selected>动态</button-tab-item>
        <button-tab-item>附近</button-tab-item>
      </button-tab>
    </x-header>
    <div class="content">
      正在开发中
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, ButtonTab, ButtonTabItem } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['playing', 'playlist'])
  },
  methods: {
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
    XHeader,
    ButtonTab,
    ButtonTabItem
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.social {
  @include allcover();
  @include wh(100%, 100%);
  .vux-header {
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
    .vux-button-group {
      margin-top: .2rem;
      border: .025rem solid #fff;
      border-radius: 25px;
      a.vux-button-group-current {
        background: $juzi;
      }
    }
  }
  .content {
    margin-top: 1rem;
    @include sc(.7rem, #000);
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
