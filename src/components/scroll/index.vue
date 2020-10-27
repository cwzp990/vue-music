<template>
<div class="pullup">
  <div ref="scrollRef" class="pullup-wrapper">
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

import {
  defineComponent,
  watch
} from 'vue'

export default defineComponent({
  props: ['query'],

  setup(props) {
    const bscroll = ref(null)
    const scrollRef = ref(null)
    const isPullUpLoad = ref(false)

    watch(scrollRef, () => {
      initBscroll()
    })

    const initBscroll = () => {
      bscroll.value = new BScroll(scrollRef.value, {
        pullUpLoad: true
      })

      bscroll.value.on('pullingUp', pullingUpHandler)
    }

    const pullingUpHandler = () => {
      if (!query) return
      isPullUpLoad.value = true
      props.query().then(resp => {
        bscroll.value.finishPullUp()
        bscroll.value.refresh()
        isPullUpLoad.value = false
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.pullup {
  height: 100%;

  .pullup-wrapper {
    height: 100%;
    padding: 0 10px;
    border: 1px solid #ccc;
    overflow: hidden;
  }

  .pullup-list {
    padding: 0;
  }

  .pullup-list-item {
    padding: 10px 0;
    list-style: none;
    border-bottom: 1px solid #ccc;
  }

  .pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }

}
</style>
