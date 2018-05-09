<template>
  <div class="progress-bar">
    <div class="bar-inner" ref="progressBar" @click="progressClick">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper"
           @touchstart.prevent="touchStart"
           @touchmove.prevent="touchMove"
           @touchend="touchEnd"
           ref="progressBtn">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {prefixStyle} from 'utils/dom'
const transform = prefixStyle('transform')
const progressBtnWidth = 16
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    setProgressOffset (percent) {
      if (percent >= 0 && !this.touch.initiated) {
        let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        let offsetWidth = barWidth * percent
        this.$_offset(offsetWidth)
      }
    },
    touchStart (e) {
      this.touch.initiated = true
      this.touch.x1 = e.touches[0].pageX
      this.touch.progressWidth = this.$refs.progress.clientWidth
    },
    touchMove (e) {
      let moveWidth = e.touches[0].pageX - this.touch.x1
      let progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      let progressWidth = this.touch.progressWidth + moveWidth
      let offsetWidth = Math.max(0, Math.min(progressBarWidth, progressWidth))
      this.$_offset(offsetWidth)
      this.$emit('percentChanging', this.$_getPercent())
    },
    touchEnd () {
      this.touch.initiated = false
      this.$_triggerPercent()
    },
    progressClick (e) {
      let rect = this.$refs.progressBar.getBoundingClientRect()
      let offsetWidth = e.pageX - rect.x
      this.$_offset(offsetWidth)
      this.$_triggerPercent()
    },
    $_triggerPercent () {
      this.$emit('percentChange', this.$_getPercent())
    },
    $_getPercent () {
      let progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      return this.$refs.progress.clientWidth / progressBarWidth
    },
    $_offset (width) {
      this.$refs.progress.style.width = `${width}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${width}px,0,0)`
    }
  },
  watch: {
    percent (newPercent) {
      this.setProgressOffset(newPercent)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/mixin';
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    height: 4px;
    top: 13px;
    background: rgba(0,0,0,.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $juzi;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      height: 30px;
      width: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 3px solid $juzi;
        background: $juzi;
      }
    }
  }
}
</style>
