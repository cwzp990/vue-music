<!-- 歌手专辑 -->
<template>
  <div class="singerAlbum">
    <ul>
      <li v-for="item in albumList" :key="item.id" class="list-item">
        <div class="img-wrapper">
          <div class="circle"></div>
          <img :src="item.picUrl" width="100%" height="100%">
        </div>
        <div class="right vux-1px-b">
          <h4 class="name">{{item.name}}</h4>
          <p class="brief"><span class="date">{{item.publishTime | dateFormat}}</span><span>{{item.size}}首</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
import { api } from 'api/index'
export default {
  data () {
    return {
      singerId: this.$route.params.id,
      albumList: []
    }
  },
  filters: {
    dateFormat
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getArtistAlbumResource(this.singerId).then(res => {
        if (res.status === 200) {
          this.albumList = res.data.hotAlbums
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../../../style/mixin';
.singerAlbum {
  padding: 0 .5rem;
  .list-item {
    display: flex;
    @include wh(100%, 3rem);
    margin-bottom: .3rem;
    .img-wrapper {
      position: relative;
      @include wh(3rem, 3rem);
      flex: 0 0 3rem;
      margin-right: 1rem;
      .circle {
        @include wh(2.7rem, 2.7rem);
        border-radius: 50%;
        background: rgba(0, 0, 0, .8);
        overflow: hidden;
        position: absolute;
        top: .1rem;
        right: -.5rem;
        z-index: -1;
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
      }
      .brief {
        @include sc(.5rem, #777);
        .date {
          margin-right: .3rem;
        }
      }
    }
  }
}
</style>
