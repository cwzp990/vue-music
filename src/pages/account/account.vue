<template>
  <div class="account">
    <x-header :left-options="{backText: ''}">
      账 号
      <svg-icon icon-class="playing" slot="right"></svg-icon>
    </x-header>
    <div class="userinfo">
      <div class="user">
        <div class="avatar-wrapper">
          <img :src="userinfo.avatarUrl" width="100%" height="100%">
        </div>
        <div class="text">
          <p class="name">{{userinfo.nickname}}</p>
          <p class="grade">Lv.7</p>
        </div>
      </div>
      <div class="sign-in">
        签到
      </div>
    </div>
    <div class="message">
      <div class="msg-item">动态 <span class="num">1</span></div>
      <div class="msg-item">关注 <span class="num">1</span></div>
      <div class="msg-item">粉丝 <span class="num">1</span></div>
      <div class="msg-item"><span><svg-icon icon-class="pencil"></svg-icon></span>我的资料</div>
    </div>
    <div class="list">
      <ul>
        <li class="list-item"><div class="left"><svg-icon icon-class="email"></svg-icon>我的消息</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="vip"></svg-icon>VIP会员</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="cart"></svg-icon>商城</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="net"></svg-icon>在线听歌免流量</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="setting"></svg-icon>设置</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="scan"></svg-icon>扫一扫</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="clothes"></svg-icon>个性换肤</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="bulb"></svg-icon>夜间模式</div><div class="right"></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="time"></svg-icon>定时关闭</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="clock"></svg-icon>音乐闹钟</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="car"></svg-icon>驾驶模式</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="ticket"></svg-icon>优惠券</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="share"></svg-icon>分享</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
        <li class="list-item"><div class="left"><svg-icon icon-class="about"></svg-icon>关于Juzi Music</div><div class="right"><svg-icon icon-class="right"></svg-icon></div></li>
      </ul>
    </div>
    <div class="logOut"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, XButton } from 'vux'
import { mapGetters } from 'vuex'
export default {
  created () {
    console.log(this.userinfo)
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  methods: {
  },
  components: {
    XHeader,
    XButton
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .account {
    @include allcover();
    @include wh(100%, 100%);
    .svg-icon {
      @include svg(1rem, #fff);
    }
    .userinfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .5rem;
      height: 4rem;
      border-bottom: .025rem solid #777;
      .user {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar-wrapper {
          @include wh(2.5rem, 2.5rem);
          border-radius: 50%;
          overflow: hidden;
          margin-right: .5rem;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            @include sc(.8rem, #000);
            margin-bottom: .2rem;
          }
          .grade {
            @include sc(.45rem, #777);
            padding: .2rem;
            border-radius: .2rem;
            border: .025rem solid #777;
          }
        }
      }
      .sign-in {
        @include sc(.6rem, $juzi);
        padding: .3rem;
        border-radius: .3rem;
        border: .025rem solid $juzi;
      }
    }
    .message {
      display: flex;
      .msg-item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        padding: .3rem 0;
        line-height: 1rem;
        @include sc(.7rem, #777);
      }
    }
    .list {
      .list-item {
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;
        height: 2rem;
        padding: 0 .5rem;
        @include sc(.8rem, #000);
      }
      .left {
        .svg-icon {
          @include svg(.8rem, #000);
          margin-right: .5rem;
        }
      }
    }
  }
</style>
