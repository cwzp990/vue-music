<!-- 歌单详情页 -->
<template>
  <div class="songList">
    <x-header :left-options="{backText: ''}">
      歌 单
      <span slot="right">
        <svg-icon icon-class="more"></svg-icon>
        <svg-icon icon-class="playing" style="margin-left: .3rem;"></svg-icon>
      </span>
    </x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { api } from 'api/index'
export default {
  props: {
    songListId: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getPlaylistDetailResource(id).then(res => {
      })
    }
  },
  components: {
    XHeader
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.songList {
  @include allcover();
  @include wh(100%, 100%);
  .vux-header-right {
    .svg-icon {
      @include svg(.9rem, #fff);
    }
  }
}
</style>
