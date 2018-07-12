<!-- 歌单详情页 -->
<template>
  <transition name="fade">
    <div class="songList">
      <div class="list-up">
        <!-- 歌单信息 -->
        <v-header title="歌单详情" @back="back"></v-header>
        <div class="info" @click="gotoAddress(songList.id)">
          <div class="img-wrapper">
            <img :src="songList.coverImgUrl" width="100%" height="100%">
            <div class="playCount">
              <svg-icon icon-class="earphone"></svg-icon>
              <span class="number">{{songList.playCount > 99999999 ? (songList.playCount / 100000000).toFixed(1) + '亿': (songList.playCount / 10000).toFixed(0) + '万'}}</span>
            </div>
            <svg-icon icon-class="about"></svg-icon>
          </div>
          <div class="author" @click.stop="authorInfo(songList.creator.userId)">
            <h3 class="title">{{songList.name}}</h3>
            <div class="authorInfo" v-if="songList.creator">
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
            <!-- <li class="item">
              <svg-icon icon-class="collect"></svg-icon>
              <span class="text">{{songList.subscribedCount}}</span>
            </li> -->
            <li class="item" @click="onCommentList">
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
            <li class="item">
              <svg-icon icon-class="select"></svg-icon>
              <span class="text">多选</span>
            </li>
          </ul>
        </div>
        <!-- 背景图片 -->
        <div class="bg-img" v-if="songList.creator">
          <img :src="songList.creator.backgroundUrl" width="100%" height="100%">
        </div>
      </div>
      <div class="list-down">
        <list-details @select="selectItem" @more="selectMore" :data="songList.tracks" :count="songList.trackCount" :collect="songList.subscribedCount"></list-details>
      </div>
      <popupmenu :switchs="show" :song="songInfo" @change="switchsChange"></popupmenu>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import VHeader from 'components/header/header'
import ListDetails from 'components/list-details/list-details'
import Popupmenu from 'components/popupmenu/popupmenu'
import { mapGetters, mapActions } from 'vuex'
import { api } from 'api/index'
export default {
  data () {
    return {
      songList: {},
      show: false,
      songInfo: null
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters(['disc'])
  },
  methods: {
    getData () {
      api.getPlaylistDetailResource(this.disc.id).then(res => {
        if (res.status === 200) {
          this.songList = res.data.playlist
        }
      })
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songList.tracks,
        index: index
      })
    },
    selectMore (item) {
      this.show = true
      this.songInfo = item
    },
    switchsChange (status) {
      this.show = false
    },
    gotoAddress (path) {
      this.$router.push({
        path: `/songList/${path}/details`,
        query: {details: this.songList}
      })
    },
    authorInfo (id) {
      this.$router.push({
        path: `/userinfo/${id}`,
        params: {id: id}
      })
    },
    onCommentList () {
      this.$router.push({
        path: `/comment/list/${this.songList.id}`
      })
    },
    back () {
      this.$router.go(-1)
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    VHeader,
    ListDetails,
    Popupmenu
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.songList {
  position: fixed;
  top: 0;
  bottom: 1.95rem;
  @include wh(100%, 100%);
  .list-up {
    position: relative;
    padding: 0 0.5rem;
    background: rgba(0, 0, 0, .2);
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
          top: 0;
          right: 1.5rem;
          .number {
            position: relative;
            top: -.1rem;
            right: -1.3rem;
            @include sc(0.6rem, #fff);
          }
          .svg-icon {
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
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease
}
.fade-enter, .fade-leave-to {
  transform: translate3d(100%, 0, 0)
}
</style>
