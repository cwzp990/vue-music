<!-- 歌手详情也 -->
<template>
  <div class="singerDetails">
    <v-header :title="singer.name" @back="back"></v-header>
    <div class="bg-img">
      <img :src="singer.picUrl" width="100%" height="100%">
    </div>
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
import VHeader from 'components/header/header'
import { Tab, TabItem } from 'vux'
import { mapGetters } from 'vuex'
export default {
  created () {
  },
  computed: {
    ...mapGetters(['singer'])
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    gotoAddress (path) {
      this.$router.push({
        path: path,
        query: {id: this.singer.id}
      })
    }
  },
  components: {
    VHeader,
    Tab,
    TabItem
  }
}
</script>

<style lang='scss' scoped>
@import '../../../style/mixin';
.singerDetails {
  position: fixed;
  top: 0;
  bottom: 1.95rem;
  @include wh(100%, 100%);
  background: #fff;
  z-index: 100;
  .vux-header {
    .svg-icon {
      @include svg(1rem, #fff);
    }
  }
  .bg-img {
    @include allcover;
    z-index: -1;
    @include wh(100%, 40%);
  }
  .tab {
    margin-top: 60%;
  }
}
</style>
