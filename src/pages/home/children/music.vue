<!-- 首页tab music栏 -->
<template>
  <div class="home-music">
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper loop auto>
        <swiper-item class="swiper-demo-img" v-for="item in slider" :key="item.targetId">
          <img :src="item.pic" width="100%" height="100%">
        </swiper-item>
      </swiper>
    </div>
    <!-- 中间功能按钮区域 -->
    <div class="list-btn">
      <div class="btn-item">
        <span class="svg-wrapper">
          <svg-icon icon-class="radio"></svg-icon>
        </span>
        私人FM
      </div>
      <div class="btn-item">
        <span class="svg-wrapper">
          <svg-icon icon-class="date"></svg-icon>
        </span>
        每日推荐
      </div>
      <div class="btn-item">
        <span class="svg-wrapper">
          <svg-icon icon-class="list"></svg-icon>
        </span>
        歌单
      </div>
      <div class="btn-item">
        <span class="svg-wrapper">
          <svg-icon icon-class="rank"></svg-icon>
        </span>
        排行榜
      </div>
    </div>
    <!-- 歌单列表 -->
    <div class="recommend-list">
      <recommendList title="独家放送" :data="recommend" number="6" :music="true"></recommendList>
    </div>
    <div class="exclusive-list">
      <recommendList title="独家放送" :data="exclusive" number="2"></recommendList>
    </div>
    <div class="MV-list">
      <recommendList title="推荐MV" :data="MV" number="4"></recommendList>
    </div>
    <div class="DJ-list">
      <recommendList title="主播电台" :data="DJ" number="6" :music="true"></recommendList>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import recommendList from 'components/recommend-list/recommend-list'
import { api } from 'api/index'
export default {
  data () {
    return {
      slider: [],
      recommend: [],
      exclusive: [],
      newSong: [],
      MV: [],
      DJ: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getBanner().then(res => {
        if (res.status === 200) {
          this.slider = res.data.banners
        }
      })
      api.getPersonalized().then(res => {
        if (res.status === 200) {
          this.recommend = res.data.result
        }
      })
      api.getPrivatecontent().then(res => {
        if (res.status === 200) {
          this.exclusive = res.data.result
        }
      })
      api.getNewSong().then(res => {
        if (res.status === 200) {
          this.newSong = res.data.result
        }
      })
      api.getPersonalizedMv().then(res => {
        if (res.status === 200) {
          this.MV = res.data.result
        }
      })
      api.getDjProgram().then(res => {
        if (res.status === 200) {
          this.DJ = res.data.result
        }
      })
    }
  },
  components: {
    Swiper,
    SwiperItem,
    recommendList
  }
}
</script>

<style lang='scss' scoped>
@import '../../../style/mixin';
.home-music {
  .list-btn {
    display: flex;
    @include wh(100%, 4.4rem);
    margin: 0.3rem 0;
    .btn-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      @include sc(0.6rem, #333);
      .svg-wrapper {
        position: relative;
        @include wh(2.3rem, 2.3rem);
        border: 0.025rem solid $juzi;
        border-radius: 50%;
        .svg-icon {
          position: absolute;
          @include center();
          @include svg(1rem, $juzi);
        }
      }
    }
  }
}
</style>
