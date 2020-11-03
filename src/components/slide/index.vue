<template>
<div class="slide-banner" v-if="imgList.length">
  <div class="banner-wrapper">
    <div class="slide-banner-wrapper" ref="slideRef">
      <div class="slide-banner-content">
        <div v-for="(item, index) in imgList" class="slide-page" :key="index">
          <img :src="item.pic" alt />
        </div>
      </div>
    </div>
    <div class="dots-wrapper">
      <span class="dot" v-for="(item, index) in imgList" :key="index" :class="{'active': currentPageIndex === index}"></span>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

import {
  defineComponent,
  onUnmounted,
  ref,
  watch
} from 'vue'

export default defineComponent({
  props: {
    imgList: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const slide = ref(null)
    const slideRef = ref(null)
    const currentPageIndex = ref(0)

    onUnmounted(() => {
      slide.value = null
    })

    watch(slideRef, () => {
      init()
    })

    const init = () => {
      slide.value = new BScroll(slideRef.value, {
        scrollX: true,
        scrollY: false,
        slide: true,
        useTransition: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        probeType: 2
      })
      slide.value.on('scrollEnd', _onScrollEnd)

      slide.value.on('slideWillChange', (page) => {
        currentPageIndex.value = page.pageX
      })
    }

    const _onScrollEnd = () => {
      console.log(slide.value.getCurrentPage())
    }

    return {
      slideRef,
      currentPageIndex,
    }
  }
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.slide-banner {
  margin-bottom: 10px;

  .banner-wrapper {
    position: relative;

    .slide-banner-wrapper {
      min-height: 1px;
      overflow: hidden;

      .slide-banner-content {
        height: 200px;
        white-space: nowrap;
        font-size: 0;

        .slide-page {
          display: inline-block;
          @include wh(100%, 100%);
        }
      }
    }

    .dots-wrapper {
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);

      .dot {
        display: inline-block;
        margin: 0 4px;
        @include wh(8px, 8px);
        border-radius: 50%;
        background: #eee;

        &.active {
          width: 20px;
          border-radius: 5px;
        }
      }
    }
  }

  .btn-wrap {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    button {
      margin: 0 10px;
      padding: 10px;
      color: #fff;
      border-radius: 4px;
      background-color: #666;
    }
  }
}
</style>
