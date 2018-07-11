<template>
  <div class="userinfo">
    <div class="cover">
      <div class="header">
        <svg-icon icon-class="back"></svg-icon>
        <svg-icon icon-class="playing" :class="{play: playing, pause: !playing}"></svg-icon>
      </div>
      <div class="user">
        <div class="avatar">
          <div class="img-wrapper">
            <img :src="user.profile.avatarUrl" width="100%" height="100%">
          </div>
          <svg-icon icon-class="star"></svg-icon>
        </div>
        <p class="name">{{user.profile.nickname}}</p>
        <p class="tips">云音乐达人</p>
        <p class="fans">关注{{user.profile.follows}} | 粉丝{{user.profile.followeds}}</p>
        <p class="tags"></p>
      </div>
      <div class="contact">
        <div>
          <x-button mini type="warn" disabled class="fav" v-show="!user.profile.followed">+关注</x-button>
          <svg-icon icon-class="user" v-show="user.profile.followed"></svg-icon>
        </div>
        <svg-icon icon-class="user"></svg-icon>
      </div>
      <div class="bg-img">
        <img :src="user.profile.backgroundUrl" width="100%" height="100%">
      </div>
    </div>
    <div class="list"></div>
  </div>
</template>

<script>
import { XButton } from 'vux'
import { api } from 'api/index'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      user: {}
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
      api.getUserDetails(this.$route.params.id).then(res => {
        if (res.status === 200) {
          this.user = res.data
          console.log(this.user)
        }
      })
    }
  },
  components: {
    XButton
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
      top: 1.95rem;
      left: .5rem;
      @include wh(50%, 100%);
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
    }
    .contact {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      top: 1.95rem;
      right: .5rem;
      @include wh(50%, 100%);
      .fav {
        @include wh(3rem, 1rem);
      }
    }
    .bg-img {
      @include wh(100%, 100%);
      position: absolute;
      z-index: -1;
      filter: blur(10px);
      opacity: 0.8;
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
