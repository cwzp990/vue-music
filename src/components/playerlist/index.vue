<template>
<transition>
  <div class="m-playerlist" v-show="visible">
    <div className="history">
      <div className="list-title">
        <p>
          <span class="list-tab" :class="{ 'active': type === 1 }" @click="onTab(1)">当前播放</span>
          <span class="list-tab" :class="{ 'active': type === 2 }" @click="onTab(2)">历史播放</span>
        </p>
        <i className="iconfont icon-empty"></i>
      </div>
      <ul className="list-wrapper">
        <li v-for="(song, index) in list" :class="currentIndex===index ? 'item-list current' : 'item-list'" :key="song.id" @click="onPlay(song)">
          <span className="name">{{index + 1}}. {{song.name}}</span>
          <span className="singer">{{getSinger(song.ar)}}</span>
        </li>
      </ul>
      <p className="close" @click="onClose">关闭</p>
    </div>
  </div>
</transition>
</template>

<script>
import {
  ref,
  computed,
  watch,
  defineComponent,
} from 'vue'
import {
  useStore
} from 'vuex'
import {
  getSinger
} from '../../utils'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const list = ref([])
    const type = ref(1)
    const store = useStore()
    const now = computed(() => store.getters.playList)
    const currentIndex = computed(() => store.getters.currentIndex)

    const onPlay = (music) => {
      store.dispatch('addPlay', {
        music
      })
      onClose()
    }

    const onTab = (val) => {
      type.value = val
      if (val === 1) {
        list.value = now.value
      } else {
        list.value = JSON.parse(localStorage.getItem("history")) || []
      }
    }

    const onClose = () => {
      context.emit('close')
    }

    watch(props, () => {
      if (props.visible) {
        onTab(1)
      }
    })

    return {
      currentIndex,
      list,
      now,
      type,
      getSinger,
      onPlay,
      onTab,
      onClose
    }
  }
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.m-playerlist {
  position: fixed;
  left: 0;
  bottom: 0;
  @include wh(100%, 65%);
  z-index: 1995;
  background: #fff;
  border-radius: 8px;

  .history {
    float: left;
    @include wh(100%, 100%);
  }

  .list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    padding: 0 10px;

    .list-tab {
      display: inline-block;
      @include sc($font_normal, $gray);
      margin-right: 10px;

      &.active {
        color: $theme;
      }
    }
  }

  .list-wrapper {
    height: calc(100% - 70px);
    overflow-x: hidden;
    overflow-y: auto;

    .item-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 35px;
      padding: 0 10px;
      border-bottom: 1px solid $bgc;

      .name {
        @include sc($font_small, $black);
      }

      .singer {
        @include sc($font_small, $gray);
      }

      &.current {

        .name,
        .singer {
          color: $theme;
        }
      }
    }
  }

  .close {
    @include sc($font_normal, $black);
    line-height: 35px;
    text-align: center;
  }
}
</style>
