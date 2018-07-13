<!-- 歌手详情也 -->
<template>
  <div class="singerDetails">
    <v-header :title="singer.name" @back="back"></v-header>
    <div class="bg-img">
      <img :src="singer.picUrl" width="100%" height="100%">
    </div>
    <div class="tab">
      <tab>
        <tab-item selected @on-item-click="onItemClick">音乐</tab-item>
        <tab-item @on-item-click="onItemClick">专辑</tab-item>
        <tab-item @on-item-click="onItemClick">视频</tab-item>
        <tab-item @on-item-click="onItemClick">歌手信息</tab-item>
      </tab>
    </div>
    <div class="singer-content">
      <div v-show="active === 0">
        <singer-hot></singer-hot>
      </div>
      <div v-show="active === 1">
        <singer-album></singer-album>
      </div>
      <div v-show="active === 2">
        <singer-video></singer-video>
      </div>
      <div v-show="active === 3">
        <singer-info></singer-info>
      </div>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/header/header'
import SingerHot from 'components/singer/children/children/singer-hot'
import SingerAlbum from 'components/singer/children/children/singer-album'
import SingerVideo from 'components/singer/children/children/singer-video'
import SingerInfo from 'components/singer/children/children/singer-info'
import { Tab, TabItem } from 'vux'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters(['singer'])
  },
  methods: {
    onItemClick (index) {
      this.active = index
      console.log(index)
    },
    back () {
      this.$router.go(-1)
    }
  },
  components: {
    VHeader,
    Tab,
    TabItem,
    SingerHot,
    SingerAlbum,
    SingerVideo,
    SingerInfo
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
  .singer-content {
    @include wh(100%, 100%);
  }
}
</style>
