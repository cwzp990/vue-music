<!-- 歌手详情也 -->
<template>
  <div class="singerDetails">
    <x-header :left-options="{backText: ''}">{{this.singer.name}}<svg-icon icon-class="playing" slot="right"></svg-icon></x-header>
    <div class="img-wrapper"></div>
    <div class="tab">
      <tab>
        <tab-item selected @on-item-click="gotoAddress(`/singer/${singer.id}/details/hot`)">音乐</tab-item>
        <tab-item @on-item-click="gotoAddress(`/singer/${singer.id}/details/album`)">专辑</tab-item>
        <tab-item @on-item-click="gotoAddress(`/singer/${singer.id}/details/video`)">视频</tab-item>
        <tab-item @on-item-click="gotoAddress(`/singer/${singer.id}/details/info`)">歌手信息</tab-item>
      </tab>
    </div>
    <div class="singer-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['singer'])
  },
  methods: {
    gotoAddress (path) {
      this.$router.push(path)
    }
  },
  components: {
    XHeader
  }
}
</script>

<style lang='scss' scoped>
@import '../../../style/mixin';
.singerDetails {
  @include allcover();
  bottom: 1.95rem;
  @include wh(100%, 100%);
  .vux-header {
    .svg-icon {
      @include svg(1rem, #fff);
    }
  }
}
</style>
