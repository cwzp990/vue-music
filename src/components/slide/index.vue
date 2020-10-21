<template>
<div class="slide-banner">
  <div class="banner-wrapper">
    <div class="slide-banner-wrapper" ref="slide">
      <div class="slide-banner-content">
        <div v-for="(img,index) in banners" class="slide-page" :key="index">
          <img :src="img.pic">
        </div>
      </div>
    </div>
    <div class="dots-wrapper">
      <span class="dot" v-for="(img, index) in banners" :key="index" :class="{'active': currentPageIndex === index}"></span>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import api from '../../api';

import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref
} from "vue";

BScroll.use(Slide)

export default defineComponent({
  setup() {
    const currentPageIndex = ref(0)
    const BS = ref(null)
    const slide = ref(null)
    const banners = ref([])

    onMounted(() => {
      getBanners()
    })

    onBeforeUnmount(() => {
      BS.value.destroy()
    })

    const getBanners = () => {
      api.getBanner().then(resp => {
        if (resp.data.code === 200) {
          banners.value = resp.data.banners
          init()
        }
      })
    }

    const init = () => {
      BS.value = new BScroll(slide.value, {
        scrollX: true,
        scrollY: false,
        slide: true,
        useTransition: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        probeType: 2
      })
      BS.value.on('scrollEnd', _onScrollEnd)

      BS.value.on('slideWillChange', (page) => {
        currentPageIndex.value = page.pageX
      })
    }
    const _onScrollEnd = () => {
      console.log(BS.value.getCurrentPage())
    }

    return {
      slide,
      banners,
      currentPageIndex
    }
  }

})
</script>

<style lang="scss">
.slide-banner {
  .banner-wrapper {
    position: relative;
  }

  .slide-banner-wrapper {
    min-height: 1px;
    overflow: hidden;
  }

  .slide-banner-content {
    height: 200px;
    white-space: nowrap;
    font-size: 0;

    .slide-page {
      display: inline-block;
      height: 200px;
      width: 100%;
      line-height: 200px;
      text-align: center;
      font-size: 26px;
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
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #eee;

      &.active {
        width: 20px;
        border-radius: 5px;
      }
    }
  }
}
</style>
