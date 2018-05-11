<!-- 每日推荐 -->
<template>
  <transition name="fade">
    <div class="list">
      <x-header :left-options="{backText: ''}">
        每日推荐
        <svg-icon icon-class="playing" slot="right"></svg-icon>
      </x-header>
    </div>
  </transition>
</template>

<script>
import { XHeader } from 'vux'
import { api } from 'api/index'
export default {
  data () {
    return {
      songList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getRecommendSongsResource().then(res => {
        console.log(res)
      })
    }
  },
  components: {
    XHeader
  }
}
</script>

<style lang='scss' scoped>
@import '../../../../style/mixin';
.list {
  position: fixed;
  top: 0;
  bottom: 1.95rem;
  @include wh(100%, 100%);
  background: #fff;
  z-index: 100;
  .vux-header {
    .vux-header-right {
      .svg-icon {
        @include svg(0.9rem, #fff);
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease
}
.fade-enter, .fade-leave-to {
  transform: translate3d(100%, 0, 0)
}
</style>
