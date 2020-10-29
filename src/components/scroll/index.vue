<template>
<div class="pullup">
  <div ref="scroll" class="pullup-wrapper">
    <div class="pullup-content">
      <slot></slot>
      <div class="pullup-tips">
        <div v-if="!isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">Pull up and load more</span>
        </div>
        <div v-else class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

export default {
  data() {
    return {
      isPullUpLoad: false,
    }
  },
  props: ['query'],
  mounted() {
    this.initBscroll()
  },
  methods: {
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.scroll, {
        pullUpLoad: true
      })

      this.bscroll.on('pullingUp', this.pullingUpHandler)
    },
    pullingUpHandler() {
      this.isPullUpLoad = true

      this.query().then(resp => {
        console.log(111, resp)
        this.bscroll.finishPullUp()
        this.bscroll.refresh()
        this.isPullUpLoad = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pullup {
  height: 100%;

  .pullup-wrapper {
    height: 100%;
    overflow: hidden;
  }

  .pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>
