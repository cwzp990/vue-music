<!-- 首页tab radio栏 -->
<template>
  <scroll ref="scroll" class="scroll">
    <div class="radio-music">
      <!-- 轮播图 -->
      <div class="swiper">
        <swiper loop auto>
          <swiper-item class="swiper-demo-img" v-for="(item, index) in slider" :key="index">
            <img :src="item.picUrl" width="100%" height="100%">
          </swiper-item>
        </swiper>
      </div>
      <!-- 中间功能按钮区域 -->
      <div class="list-btn">
        <div class="btn-item" @click="gotoAddress('/home/radioCategory')">
          <span class="svg-wrapper">
            <svg-icon icon-class="classify"></svg-icon>
          </span>
          电台分类
        </div>
        <div class="btn-item">
          <span class="svg-wrapper">
            <svg-icon icon-class="radio_rank"></svg-icon>
          </span>
          电台排行
        </div>
        <div class="btn-item">
          <span class="svg-wrapper">
            <svg-icon icon-class="crown"></svg-icon>
          </span>
          付费精品
        </div>
        <div class="btn-item">
          <span class="svg-wrapper">
            <svg-icon icon-class="rank"></svg-icon>
          </span>
          占位
        </div>
      </div>
      <!-- 歌单列表 -->
      <!-- <div class="recommend-list">
        <recommendList title="推荐歌单" :data="this.list.recommend" number="6" :music="true"></recommendList>
      </div>
      <div class="exclusive-list">
        <recommendList title="独家放送" :data="this.list.exclusive" number="2"></recommendList>
      </div>
      <div class="MV-list">
        <recommendList title="推荐MV" :data="this.list.MV" number="4" :video="true"></recommendList>
      </div>
      <div class="DJ-list">
        <recommendList title="主播电台" :data="this.list.DJ" number="6"></recommendList>
      </div> -->
    </div>
  </scroll>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
// import RecommendList from 'components/recommend-list/recommend-list'
import Scroll from 'components/scroll/scroll'
import { api } from 'api/index'
export default {
  data () {
    return {
      slider: [],
      categories: [],
      list: {
      }
    }
  },
  created () {
    this.getData()
  },
  computed: {
  },
  methods: {
    getData () {
      api.getBanner().then(res => {
        if (res.status === 200) {
          this.slider = res.data.banners
        }
      })
      // api.getDjRecommend().then(res => {
      //   if (res.status === 200) {
      //     this.list.recommend = res.data.djRadios
      //     console.log(this.list.recommend)
      //   }
      // })
    },
    gotoAddress (path) {
      this.$router.push(path)
    }
  },
  components: {
    Swiper,
    SwiperItem,
    // RecommendList,
    Scroll
  }
}
</script>

<style lang='scss' scoped>
@import '../../../style/mixin';
.scroll {
  height: 100%;
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
      position: relative;
      @include sc(0.6rem, #333);
      .svg-wrapper {
        position: relative;
        @include wh(2.3rem, 2.3rem);
        border: 0.025rem solid $juzi;
        border-radius: 50%;
        .svg-icon {
          position: absolute;
          @include center();
          @include svg(1.3rem, $juzi);
        }
      }
    }
  }
}
</style>
