<template>
  <div class="home">
    <div class="header">
      <search
        @result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="value"
        position="absolute"
        auto-scroll-to-top
        top="46px"
        @on-focus="onFocus"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        ref="search">
      </search>
    </div>
    <div class="tab">
      <tab>
        <tab-item selected @on-item-click="onItemClick">音乐</tab-item>
        <tab-item @on-item-click="onItemClick">视频</tab-item>
        <tab-item @on-item-click="onItemClick">电台</tab-item>
      </tab>
    </div>
    <div class="swiper">
      <swiper loop auto>
        <swiper-item class="swiper-demo-img" v-for="item in slider" :key="item.targetId">
          <img :src="item.pic" width="100%" height="100%">
        </swiper-item>
      </swiper>
    </div>
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
    <div class="recommend-list">
      <h3>推荐歌单</h3>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item class="list-item" :span="1/3" v-for="(item, index) in recommend" v-if="index < 6" :key="item.id">
          <p class="playCount">
            <svg-icon icon-class="earphone"></svg-icon>
            {{item.playCount}}
          </p>
          <img :src="item.picUrl" width="100%" height="100%">
          <p class="title">{{item.name}}</p>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="exclusive-list">
      <h3>独家放送</h3>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item class="list-item" :span="1/2" v-for="(item, index) in exclusive" v-if="index < 2" :key="item.id">
          <div class="svg-wrapper">
            <svg-icon icon-class="player"></svg-icon>
          </div>
          <img :src="item.picUrl" width="100%" height="100%">
          <p class="title">{{item.name}}</p>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Search, Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem } from 'vux'
import { api } from '../../api/index'
export default {
  data () {
    return {
      slider: [],
      recommend: [],
      exclusive: [],
      newSong: []
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
    }
  },
  components: {
    Search,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .home {
    @include allcover();
    bottom: 1.95rem;
    @include wh(100%, 100rem);
    .header {
      @include wh(100%, 1.95rem);
    }
    .tab {
      .vux-tab-selected {
        color: $juzi;
      }
    }
    .list-btn {
      display: flex;
      @include wh(100%, 4.4rem);
      margin: .3rem 0;
      .btn-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        @include sc(.6rem, #333);
        .svg-wrapper {
          position: relative;
          @include wh(2.3rem, 2.3rem);
          border: .025rem solid $juzi;
          border-radius: 50%;
          .svg-icon {
            position: absolute;
            @include center();
            @include svg(1rem, $juzi);
          }
        }
      }
    }
    .recommend-list {
      h3 {
        @include sc(.8rem, #000);
        line-height: 1.5rem;
      }
      .list-item {
        position: relative;
        margin-bottom: .5rem;
        .playCount {
          position: absolute;
          top: 0;
          right: 0;
          @include sc(.5rem, #fff);
          .svg-icon {
            @include svg(.7rem, #fff);
          }
        }
        .title {
          text-align: center;
          @include sc(.6rem, #777);
          @include nowrap();
        }
      }
    }
    .exclusive-list {
      h3 {
        @include sc(.8rem, #000);
        line-height: 1.5rem;
      }
      .list-item {
        position: relative;
        margin-bottom: .5rem;
        .svg-wrapper {
          @include allcover();
          left: .3rem;
          @include wh(1rem, 1rem);
          background: #b2b2b2;
          border-radius: 50%;
          border: .025rem solid #fff;
          .svg-icon {
            @include center();
            @include svg(.7rem, #fff);
          }
        }
        .title {
          text-align: center;
          @include sc(.6rem, #777);
          @include nowrap();
        }
      }
    }
  }
</style>
