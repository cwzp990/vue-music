<template>
  <div class="m-login">
    <div class="m-logo">
      <i class="iconfont icon-logo"></i>
      <i class="pulse"></i>
    </div>
    <div class="login-btn">
      <p class="btn" @click="showLogin">
        手机账号登陆
      </p>
      <p class="btn" @click="goHome">
        立即体验
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup () {
    const router = useRouter();
    const goHome = () => {
      router.push("/songlist");
    };
    return {
      goHome
    };
  }
});
</script>

<style lang="scss">
@import "../../styles/mixin.scss";
.m-login {
  position: relative;
  @include wh(100%, 100%);
  background: $theme;

  .m-logo {
    position: relative;
    @include wh(100%, 0);
    padding-bottom: 100%;
    .iconfont {
      @include center;
      @include sc(48px, #fff);
    }

    .pulse {
      position: absolute;
      @include wh(100%, 0);
      padding-bottom: 100%;
      border: 6px solid $bgc;
      border-radius: 50%;
      z-index: 1;
      opacity: 0;
      animation: warn 2s ease-out;
      animation-iteration-count: infinite;
      box-shadow: 1px 1px 30px $bgc;
    }
  }

  .login-btn {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    .btn {
      @include wh(80%, 48px);
      background: #fff;
      color: $theme;
      line-height: 48px;
      text-align: center;
      border-radius: 24px;
      margin: 0 auto;
      &:first-child {
        margin-bottom: 15px;
      }
    }
  }
}

@keyframes warn {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }
  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }
  50% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.3;
  }
  75% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
}
</style>
