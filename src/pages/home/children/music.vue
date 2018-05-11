<!-- 首页tab music栏 -->
<template>
  <scroll :probeType="3">
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
        <div class="btn-item" @click="gotoAddress('/home/daily')">
          <span class="svg-wrapper">
            <svg-icon icon-class="date"></svg-icon>
          </span>
          每日推荐
        </div>
        <div class="btn-item" @click="gotoAddress('/home/list')">
          <span class="svg-wrapper">
            <svg-icon icon-class="list"></svg-icon>
          </span>
          歌单
        </div>
        <div class="btn-item" @click="gotoAddress('/home/rank')">
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
  </scroll>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import RecommendList from 'components/recommend-list/recommend-list'
import Scroll from 'components/scroll/scroll'
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
    },
    gotoAddress (path) {
      this.$router.push(path)
    }
  },
  components: {
    Swiper,
    SwiperItem,
    RecommendList,
    Scroll
  }
}
</script>

<style lang='scss' scoped>
@import '../../../style/mixin';
.home-music {
  @include wh(100%, 100%);
  overflow: hidden;
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
