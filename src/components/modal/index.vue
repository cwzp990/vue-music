<template>
<div class="m-modal" v-show="visible">
  <div class="loading-wrapper">
    <p class="play"><i class="iconfont icon-loading"></i></p>
    <p class="text">正在加载...</p>
  </div>
</div>
</template>

<script>
import {
  defineComponent
} from 'vue'
export default defineComponent({
  props: {
    visible: Boolean
  },
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.m-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $black;
  opacity: 0.9;
  color: #fff;
  z-index: 1996;

  .loading-wrapper {
    @include center;
    text-align: center;

    .play {
      animation: rotate 2s linear infinite;

      .iconfont {
        @include sc(36px, #fff);
      }
    }

    .text {
      @include sc($font_large, #fff);
      margin-top: 10px;
    }
  }
}
</style>
