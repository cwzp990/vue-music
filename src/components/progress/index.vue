<template>
<!--进度条拖动-->
<div class="m-progress">
  <div class="bar-inner" ref="progressBar" @click="progressClick">
    <div class="progress" ref="progress"></div>
    <div class="progress-btn-wrapper" ref="progressBtn" @touchStart="progressTouchStart" @touchMove="progressTouchMove" @touchEnd="progressTouchEnd">
      <div class="progress-btn"></div>
    </div>
  </div>
</div>
</template>

<script>
const progressBtnWidth = 16

import {
  defineComponent,
  ref,
  watch
} from "vue";

export default defineComponent({
  props: ['percent', 'percentChange'],

  setup(props) {
    const touch = ref({})
    const progressBar = ref(null)
    const progress = ref(null)
    const progressBtn = ref(null)

    const _offset = (offsetWidth) => {
      progress.value.style.width = `${offsetWidth}px`;
      progressBtn.value.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }

    const _changePercent = () => {
      const barWidth = progressBar.value.clientWidth - progressBtnWidth;
      const curPercent = progress.value.clientWidth / barWidth;
      props.percentChange(curPercent);
    }

    const progressClick = (e) => {
      const rect = progressBar.value.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      _offset(offsetWidth);
      _changePercent();
    }

    const progressTouchStart = (e) => {
      const startTouch = {};
      startTouch.initiated = true;
      startTouch.startX = e.touches[0].pageX;
      startTouch.left = progress.value.clientWidth;
      touch.value = startTouch;
    }

    const progressTouchMove = (e) => {
      if (!touch.value.initiated) return;
      const deltaX = e.touches[0].pageX - touch.value.startX;
      const barWidth = progressBar.value.clientWidth - progressBtnWidth;
      const offsetWidth = Math.min(Math.max(0, touch.value.left + deltaX), barWidth);
      _offset(offsetWidth);
    }

    const progressTouchEnd = () => {
      const endTouch = JSON.parse(JSON.stringify(touch.value));
      endTouch.initiated = false;
      touch.value = endTouch;
      _changePercent();
    }

    watch(props, () => {
      if (props.percent >= 0 && props.percent <= 1 && !touch.value.initiated) {
        const barWidth = progressBar.value.clientWidth - progressBtnWidth;
        const offsetWidth = props.percent * barWidth;
        progress.value.style.width = `${offsetWidth}px`;
        progressBtn.value.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
      }
    })

    return {
      progressBar,
      progress,
      progressBtn,
      progressClick,
      progressTouchStart,
      progressTouchMove,
      progressTouchEnd
    }
  }

})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.m-progress {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(255, 255, 255, 0.7);

    .progress {
      position: absolute;
      height: 100%;
      background: $theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      @include wh(30px, 30px);

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        @include wh(16px, 16px);
        border: 3px solid $bgc;
        border-radius: 50%;
        background: $theme;
      }
    }
  }
}
</style>
