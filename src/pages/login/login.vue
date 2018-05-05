<template>
  <div class="login">
    <x-header :left-options="{backText: ''}">登 录</x-header>
    <div class="login-container">
      <h1 class="logo">
        <svg-icon icon-class="logo"></svg-icon>
      </h1>
      <div class="userinfo" title="set keyboard=number and is-type=china-mobile">
        <svg-icon icon-class="user"></svg-icon>
        <x-input name="mobile" placeholder="请输入手机号码" wkeyboard="number" is-type="china-mobile"></x-input>
      </div>
      <div class="userinfo" title="enter事件">
        <svg-icon icon-class="lock"></svg-icon>
        <x-input type="password" placeholder="请输入密码" v-model="enterText" @on-enter="onEnter"></x-input>
      </div>
      <x-button plain type="primary" link="/home">登 录</x-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, XInput, XButton } from 'vux'
export default {
  methods: {
  },
  components: {
    XHeader,
    XInput,
    XButton
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .login {
    @include allcover();
    @include wh(100%, 100%);
    background: url('../../assets/recommand.png') no-repeat;
    background-size: 100% 100%;
    .login-container {
      @include ct();
      width: 100%;
      .logo {
        margin-bottom: 5rem;
        .svg-icon {
          @include cl();
          @include svg(3rem, $juzi);
        }
      }
      .userinfo {
        position: relative;
        @include wh(95%, 2rem);
        .svg-icon {
          @include ct();
          left: .5rem;
          @include svg(1rem, #777);
        }
        .vux-x-input {
          @include sc(.8rem, #777);
          margin-left: 1.3rem;
        }
      }
      .weui-btn {
        @include wh(90%, 1.5rem);
        line-height: 1.5rem;
        border-radius: .7rem;
        border: none;
        background: $juzi;
        color: #fff;
      }
    }
  }
</style>
