<!-- 歌手视频 -->
<template>
  <div class="singerVideo">
    <ul>
      <li v-for="item in videoList" :key="item.id" class="list-item">
        <div class="img-wrapper">
          <img :src="item.imgurl" width="100%" height="100%">
          <div class="playCount">
            <svg-icon icon-class="player"></svg-icon>
            <span class="number">{{item.playCount > 99999 ? (item.playCount / 10000).toFixed(0) + '万': item.playCount}}</span>
          </div>
        </div>
        <div class="right">
          <h4 class="name">{{item.name}}</h4>
          <p class="date">{{item.publishTime}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { api } from 'api/index'
export default {
  data () {
    return {
      singerId: this.$route.params.id,
      videoList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getArtistMvResource(this.singerId).then(res => {
        if (res.status === 200) {
          this.videoList = res.data.mvs
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../../../style/mixin';
.singerVideo {
  padding: 0 .5rem;
  .list-item {
    display: flex;
    @include wh(100%, 3rem);
    margin-bottom: .3rem;
    .img-wrapper {
      position: relative;
      @include wh(4.5rem, 3rem);
      flex: 0 0 4.5rem;
      margin-right: .5rem;
      .playCount {
        @include allcover;
        right: 0;
        @include sc(.5rem, #fff);
        .svg-icon {
          @include svg(.5rem, #fff);
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      .name {
        @include sc(.7rem, #000);
        margin-bottom: .5rem;
        width: 90%;
        @include nowrap;
      }
      .date {
        @include sc(.5rem, #777);
      }
    }
  }
}
</style>
