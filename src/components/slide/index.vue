<template>
<div class="slider-container" ref='slider' :style="sliderStyle" @mouseover="pause()" @mouseout="play()">
  <div class="slider-content" :class="mask ? 'mask' : ''">
    <div class="slider" :ref="el => { if (el) imgRefs[index] = el }" v-for="(item, index) in list" :key="index" :class="setClass(index)" @click="onClick(item, index)" :style="setBGImg(item.pic)">
      <p class="name">{{item.name}}</p>
    </div>
    <i v-show="arrow" class="iconfont icon-left" @click="prev()"></i>
    <i v-show="arrow" class="iconfont icon-right" @click="next()"></i>
  </div>
  <div class="dots" v-if="dots">
    <span v-for="(item, index) in list" :key="index" :style="setActiveDot(index)" @mouseover="currentIndex = index"></span>
  </div>
</div>
</template>

<script>
import {
  ref,
  computed,
  defineComponent,
  onMounted
} from 'vue';

export default defineComponent({
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    imgType: {
      type: String,
      default: 'percentage'
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    dots: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#ffaa20'
    }

  },
  setup(props, context) {
    const currentIndex = ref(0)
    const slider = ref(null)
    const timer = ref(null)
    const imgRefs = ref([])
    const sliderStyle = computed(() => ({
      width: props.width ? props.width + 'px' : '100%',
      height: props.height ? props.height + 'px' : '100%',
      perspective: props.width + 'px',
      backgroundSize: props.imgType == 'percentage' ? '100% 100%' : props.imgType
    }))

    onMounted(() => {
      play()
    })

    const setClass = (i) => {
      let next = currentIndex.value === (props.list.length - 1) ? 0 : currentIndex.value + 1;
      let prev = currentIndex.value === 0 ? props.list.length - 1 : currentIndex.value - 1;
      switch (i) {
        case currentIndex.value:
          return 'active';
        case next:
          return 'next';
        case prev:
          return 'prev';
        default:
          return '';
      }
    }

    const setBGImg = (src) => {
      return {
        backgroundImage: `url(${src})`
      }
    }

    const setActiveDot = (index) => {
      return index === currentIndex.value ? {
        backgroundColor: props.color
      } : {
        backgroundColor: '#ccc'
      }
    }

    const play = () => {
      pause();
      if (props.autoPlay) {
        timer.value = setInterval(() => {
          next();
        }, props.interval)
      }
    }

    const pause = () => {
      clearInterval(timer.value);
    }

    const next = () => {
      currentIndex.value = ++currentIndex.value % props.list.length;
    }

    const prev = () => {
      currentIndex.value = currentIndex.value === 0 ? props.list.length - 1 : currentIndex.value - 1;
    }

    const onClick = (item, index) => {
      if (index === currentIndex.value) {
        context.emit('slider-click', item)
      } else {
        let currentClickClassName = imgRefs.value[index].className.split(' ')[1]
        if (currentClickClassName === 'next') {
          next()
        } else {
          prev()
        }
      }
    }

    return {
      slider,
      sliderStyle,
      pause,
      play,
      setClass,
      onClick,
      setBGImg,
      prev,
      next,
      setActiveDot,
      currentIndex,
      imgRefs
    }
  }
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.slider-container {
  @include wh(100%, 100%);
  text-align: center;
  padding: 10px 0;
  position: relative;

  .slider-content {
    position: relative;
    @include wh(100%, calc(100% - 20px));
    left: 0%;
    top: 0%;
    margin: 0px;
    padding: 0px;
    background-size: inherit;

    .slider {
      position: absolute;
      margin: 0;
      padding: 0;
      top: 0;
      left: 50%;
      @include wh(65%, 100%);
      border-radius: 8px;
      box-shadow: 2px 2px 5px $gray;
      overflow: hidden;
      transition: 500ms all ease-in-out;
      background-color: #fff;
      background-repeat: no-repeat;
      background-position: center;
      background-size: inherit;
      transform: translate3d(-50%, 0, -80px);
      z-index: 1;

      .name {
        position: absolute;
        left: 0;
        bottom: 0;
        @include wh(100%, 24px);
        line-height: 24px;
        text-align: center;
        color: $gray;
        background: #fff;
      }

      &:before {
        position: absolute;
        content: "";
        @include wh(100%, 100%);
        top: 0;
        left: 0;
        border-radius: 8px;
        transition-delay: 100ms !important;
        transition: all 500ms;
        cursor: pointer;
      }

      &.active {
        transform: translate3d(-50%, 0, 0);
        z-index: 20;
      }

      &.prev {
        transform: translate3d(-75%, 0, -100px);
        top: 11%;
        height: 78%;
        z-index: 19;
      }

      &.next {
        transform: translate3d(-25%, 0, -100px);
        top: 11%;
        height: 78%;
        z-index: 18;
      }
    }

    i {
      width: 17.5%;
      display: none;
      position: absolute;
      top: 40%;
      font-size: 22px;
      color: rgba(255, 255, 255, 0.5);
      text-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      z-index: 21;

      &:first-child {
        left: 0;
      }

      &:last-child {
        right: 0;
      }
    }

    &:hover {
      i {
        color: rgba(255, 255, 255, 0.8);
        display: block;
      }
    }

    &.mask {
      .slider {

        &.prev,
        &.next {
          &:before {
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  }

  .dots {
    @include wh(100%, 20px);

    span {
      display: inline-block;
      @include wh(20px, 2px);
      margin: 1px 3px;
      cursor: pointer;
    }
  }
}
</style>
