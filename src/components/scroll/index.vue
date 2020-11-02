<template>
<div class="pullup">
  <div ref="scrollRef" class="pullup-wrapper">
    <div class="pullup-content">
      <slot></slot>
      <div class="pullup-tips">
        <div v-if="!isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">Pull up and load more</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import {
  defineComponent,
  computed,
  onMounted,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'

BScroll.use(Pullup)

export default defineComponent({
  setup(props, context) {
    const store = useStore()
    const bscroll = ref(null)
    const scrollRef = ref(null)
    const isPullUpLoad = ref(false)
    const offset = computed(() => store.getters.offset)

    onMounted(() => {
      initBscroll()
    })

    const initBscroll = () => {
      bscroll.value = new BScroll(scrollRef.value, {
        pullUpLoad: true
      })

      bscroll.value.on('pullingUp', pullingUpHandler)
    }

    const pullingUpHandler = () => {
      isPullUpLoad.value = true
      context.emit('load-more', offset.value)
    }

    const isLoaded = () => {
      isPullUpLoad.value = false
      if (!bscroll.value) return
      bscroll.value.finishPullUp()
      bscroll.value.refresh()
      bscroll.value.isLoaded()
    }

    return {
      bscroll,
      scrollRef,
      isPullUpLoad,
      isLoaded
    }

  }
})
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
