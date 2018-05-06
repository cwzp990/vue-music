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
    <div class="list-up">
      <!-- 歌单信息 -->
      <div class="info" @click.native="gotoAddress(songList.id)">
        <div class="img-wrapper">
          <img :src="songList.coverImgUrl" width="100%" height="100%">
          <div class="playCount">
            <svg-icon icon-class="earphone"></svg-icon>
            <span class="number">{{songList.playCount}}</span>
          </div>
          <svg-icon icon-class="about"></svg-icon>
        </div>
        <div class="author">
          <h3 class="title">{{songList.name}}</h3>
          <div class="authorInfo">
            <div class="avatar-wrapper">
              <img :src="songList.creator.avatarUrl" width="100%" height="100%">
              <svg-icon icon-class="star"></svg-icon>
            </div>
            <div class="name">{{songList.creator.nickname}}</div>
            <svg-icon icon-class="right"></svg-icon>
          </div>
        </div>
      </div>
      <!-- 功能按钮 -->
      <div class="btn">
        <ul>
          <li class="item">
            <svg-icon icon-class="collect"></svg-icon>
            <span class="text">{{songList.subscribedCount}}</span>
          </li>
          <li class="item">
            <svg-icon icon-class="comment"></svg-icon>
            <span class="text">{{songList.commentCount}}</span>
          </li>
          <li class="item">
            <svg-icon icon-class="share"></svg-icon>
            <span class="text">{{songList.shareCount}}</span>
          </li>
          <li class="item">
            <svg-icon icon-class="download"></svg-icon>
            <span class="text">下载</span>
          </li>
        </ul>
      </div>
      <!-- 背景图片 -->
      <div class="bg-img">
        <img :src="songList.creator.backgroundUrl" width="100%" height="100%">
      </div>
    </div>
    <div class="list-down">
      <list-details :data="songList"></list-details>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import ListDetails from 'components/list-details/list-details'
import { mapGetters } from 'vuex'
import { api } from 'api/index'
export default {
  data () {
    return {
      songList: {}
    }
  },
  props: {
    songListId: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.getData()
  },
  computed: {
    copywriter () {
      return this.disc.copywriter
    },
    ...mapGetters(['disc'])
  },
  methods: {
    getData () {
      api.getPlaylistDetailResource(this.disc.id).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.songList = res.data.result
        }
      })
    },
    gotoAddress (path) {
      alert(1)
      this.$router.push(`/songList/${path}/details`)
    }
  },
  components: {
    XHeader,
    ListDetails
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.songList {
  @include allcover();
  @include wh(100%, 100%);
  .vux-header {
    .vux-header-right {
      .svg-icon {
        @include svg(0.9rem, #fff);
      }
    }
  }
  .list-up {
    position: relative;
    padding: 0 0.5rem;
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .img-wrapper {
        flex: 0 0 5rem;
        position: relative;
        @include wh(5rem, 5rem);
        .playCount {
          position: absolute;
          top: 0.2rem;
          right: 2.2rem;
          .number {
            position: absolute;
            @include sc(0.6rem, #fff);
          }
          .svg-icon {
            top: 0;
            @include svg(0.6rem, #fff);
          }
        }
        .svg-icon {
          position: absolute;
          bottom: 0.2rem;
          right: 0.2rem;
          @include svg(0.7rem, #fff);
        }
      }
      .author {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 0.7rem;
        .title {
          @include sc(0.8rem, #fff);
          margin-bottom: 1rem;
          word-wrap: break-word;
          word-break: normal;
        }
        .authorInfo {
          display: flex;
          align-items: center;
          .avatar-wrapper {
            position: relative;
            @include wh(1.2rem, 1.2rem);
            border-radius: 50%;
            overflow: hidden;
          }
          .name {
            @include sc(0.6rem, #fff);
            margin: 0 0.3rem;
          }
          .svg-icon {
            @include svg(0.6rem, #fff);
          }
        }
      }
    }
    .btn {
      ul {
        display: flex;
        .item {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0.5rem 0;
          @include sc(0.5rem, #fff);
          .svg-icon {
            @include svg(1rem, #fff);
          }
        }
      }
    }
    .bg-img {
      @include allcover();
      z-index: -1;
      opacity: .8;
      filter: blur(10px);
      @include wh(100%, 100%);
    }
  }
}
</style>
