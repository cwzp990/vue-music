<template>
  <div v-transfer-dom
       class="popupmenu">
    <popup v-model="switchs">
      <!-- group already has a top border, so we need to hide header's bottom border-->
      <popup-header left-text="取消"
                    right-text="确定"
                    :title="current"
                    :show-bottom-border="false"
                    @on-click-left="changeSwitchs"
                    @on-click-right="changeSwitchs"></popup-header>
      <group gutter="0">
        <radio :options="options"></radio>
      </group>
    </popup>
  </div>
</template>

<script>
import { Popup, Group, PopupHeader, Radio, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  props: {
    switchs: {
      type: Boolean,
      default: false
    },
    song: {
      type: Object,
      default: () => { }
    },
    current: {
      type: String,
      default: '默认'
    },
    options: {
      type: Array,
      default: () => [
        '下一首播放',
        '收藏到歌单',
        '下载',
        '评论',
        '分享',
        '歌手：林俊杰',
        '专辑：江南',
        '查看视频'
      ]
    }
  },
  created () {
    console.log(this.current)
  },
  methods: {
    changeSwitchs () {
      this.$emit('change')
    }
  },
  components: {
    Popup,
    Group,
    PopupHeader,
    Radio
  }
}
</script>

<style>
</style>
