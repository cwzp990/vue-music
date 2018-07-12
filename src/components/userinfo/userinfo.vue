<template>
  <div class="userinfo">
    <div class="cover">
      <div class="header">
        <span class="svg-wrapper" @click="back"><svg-icon icon-class="back"></svg-icon></span>
        <svg-icon icon-class="playing" :class="{play: playing, pause: !playing}"></svg-icon>
      </div>
      <div class="user">
        <div class="avatar">
          <div class="img-wrapper" v-if="user.profile">
            <img :src="user.profile.avatarUrl" width="100%" height="100%">
          </div>
          <svg-icon icon-class="star"></svg-icon>
        </div>
        <div class="infos" v-if="user.profile">
          <p class="name">{{user.profile.nickname}}</p>
          <p class="tips">云音乐达人</p>
          <p class="fans">关注{{user.profile.follows}} | 粉丝{{user.profile.followeds}}</p>
          <p class="tags">
            <span class="tags-box1">音乐包</span>
            <span class="sex">
              <i v-show="user.profile.gender === 1" class="tags-box2">♂</i>
              <i v-show="user.profile.gender === 2" class="tags-box3">♀</i>
            </span>
            <span class="tags-box4">Lv{{user.level}}</span>
          </p>
        </div>
      </div>
      <div class="contact">
        <div class="friends" v-if="user.profile">
          <x-button mini type="warn" disabled class="fav" v-show="!user.profile.followed">+关注</x-button>
        </div>
        <svg-icon icon-class="email" class="email"></svg-icon>
      </div>
      <div class="bg-img" v-if="user.profile">
        <img :src="user.profile.backgroundUrl" width="100%" height="100%">
      </div>
    </div>
    <div class="list">
      <tab v-if="user.profile">
        <tab-item selected @on-item-click="onItemClick">音乐</tab-item>
        <tab-item @on-item-click="onItemClick">动态{{user.profile.eventCount}}</tab-item>
        <tab-item @on-item-click="onItemClick">关于TA</tab-item>
      </tab>
    </div>
    <div class="main-container">
      <div v-show="active === 0" class="music-list">
        <p class="title" v-if="user.profile">
          <span>歌单({{user.profile.playlistCount}})</span>
          <span>共被收藏{{user.profile.playlistBeSubscribedCount > 9999 ? (user.profile.playlistBeSubscribedCount / 10000).toFixed(1) + '万' : user.profile.playlistBeSubscribedCount}}次</span>
        </p>
        <ul>
          <li class="list-item" v-for="item in songlist" :key="item.id" @click="selectItem(item)">
            <div class="img-wrapper">
              <img :src="item.coverImgUrl" width="100%" height="100%">
            </div>
            <div class="content vux-1px-b">
              <h4 class="name">{{item.name}}</h4>
              <span class="brief">{{item.trackCount}}首, 播放{{item.playCount}}次</span>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="active === 1" class="event-list">
        <event-list :list="events"></event-list>
      </div>
      <div v-show="active === 2" class="aboutme">
        <div>
          <h3 class="title">认证信息</h3>
          <p class="stars"><svg-icon icon-class="star"></svg-icon>达人</p>
          <p style="display:inline-block">音乐</p>
          <p style="display:inline-block" v-if="user.profile">(<span v-for="(item, index) in user.profile.expertTags" :key="index">{{item}} </span>)</p>
        </div>
        <div>
          <h3 class="title">个人信息</h3>
          <p>等级：Lv{{user.level}}</p>
          <p v-if="user.profile">性别：{{user.profile.gender == 1 ? '男' : '女'}}</p>
        </div>
        <div>
          <h3 class="title">个人简介</h3>
          <p v-if="user.profile">{{user.profile.signature}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton, Tab, TabItem } from 'vux'
import EventList from 'components/event-list/event-list'
import { api } from 'api/index'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      user: {},
      songlist: [],
      events: [],
      active: 0
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters(['userid', 'playing', 'playlist'])
  },
  methods: {
    getData () {
      api.getUserDetails(this.$route.query.id).then(res => {
        if (res.status === 200) {
          this.user = res.data
        }
      })
      api.getUserPlaylistResource(this.$route.query.id).then(res => {
        if (res.status === 200) {
          this.songlist = res.data.playlist
        }
      })
      api.getUserEvent(this.$route.query.id).then(res => {
        if (res.status === 200) {
          this.events = res.data.events
        }
      })
    },
    onItemClick (index) {
      this.active = index
    },
    back () {
      this.$router.go(-1)
    }
  },
  components: {
    XButton,
    Tab,
    TabItem,
    EventList
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.userinfo {
  position: absolute;
  top: 0;
  bottom: 1.95rem;
  @include wh(100%, 100%);
  .cover {
    position: relative;
    @include wh(100%, 40%);
    background: #888;
    opacity: .7;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      box-sizing: border-box;
      padding: 0 .5rem;
      @include wh(100%, 1.95rem);
      .svg-icon {
        @include svg(1rem, #fff);
      }
    }
    .user {
      position: absolute;
      top: 3rem;
      left: .5rem;
      .avatar {
        position: relative;
        .img-wrapper {
          @include wh(2.5rem, 2.5rem);
          border-radius: 50%;
          overflow: hidden;
        }
        .svg-icon {
          position: absolute;
          left: 1.7rem;
          bottom: 0;
          @include svg(.6rem, #fff);
          border-radius: 50%;
          overflow: hidden;
          @include wh(.8rem, .8rem);
          background: #FFD700;
        }
      }
      .infos {
        margin-top: .5rem;
        @include sc(.5rem, #fff);
        line-height: 1rem;
        .name {
          font-size: .7rem;
        }
        .tags {
          font-size: .4rem;
          .tags-box1 {
            display: inline-block;
            padding: 0 .2rem;
            border-radius: 10px;
            background: $juzi;
          }
          .sex {
            .tags-box2 {
              display: inline-block;
              padding: 0 .2rem;
              border-radius: 10px;
              background: #79C3EB;
            }
            .tags-box3 {
              display: inline-block;
              padding: 0 .5rem;
              border-radius: 10px;
              background: #F699B4;
            }
          }
          .tags-box4 {
            display: inline-block;
            padding: 0 .4rem;
            border-radius: 10px;
            background: #b2b2b2;
          }
        }
      }
    }
    .contact {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      top: 1.95rem;
      right: .5rem;
      .fav {
        @include wh(3rem, 1rem);
      }
      .email {
        display: inline-block;
        padding: .1rem .5rem;
        background: #d2d2d2;
        @include svg(.7rem, #fff);
        margin-top: .15rem;
        margin-left: .3rem;
      }
    }
    .bg-img {
      @include wh(100%, 100%);
      position: absolute;
      z-index: -1;
      opacity: .7;
      filter: blur(10px);
    }
  }
  .main-container {
    .music-list {
      .title {
        display: flex;
        justify-content: space-between;
        @include wh(100%, .7rem);
        box-sizing: border-box;
        padding: 0 .5rem;
        background: #d2d2d2;
        @include sc(.4rem, #000);
        line-height: .7rem;
      }
      .list-item {
        display: flex;
        .img-wrapper {
          flex: 0 0 2.7rem;
          @include wh(2.7rem, 2.7rem);
        }
        .content {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 1;
          margin-left: 0.5rem;
          .name {
            @include sc(0.7rem, #333);
          }
          .brief {
            @include sc(0.4rem, #b2b2b2);
          }
        }
      }
    }
    .aboutme {
      @include sc(.5rem, #000);
      line-height: 1rem;
      padding: 0 .5rem;
      .stars {
        display: inline-block;
        background: #FFD700;
        padding: 0 .3rem;
        border-radius: 10px;
        color: #fff;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
