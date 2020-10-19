<template>
<div class="m-login">
  <div class="m-logo">
    <i class="iconfont icon-logo"></i>
    <i class="pulse"></i>
  </div>
  <div :class="isShow ? 'login-form active' : 'login-form'">
    <div class="username">
      <input v-model="phone" class="input" placeholder="请输入手机号" />
      <span :class="isSend ? 'auth forbid' : 'auth'" @click="getAuth">
        {{ isSend ? `${count} s` : ' 获取验证码' }}
      </span>
    </div>
    <div class="password">
      <input type="password" v-model="password" class="input" placeholder="这里是密码不是验证码！" />
    </div>
    <div class="submit" @click="onSubmit">
      登录
    </div>
    <div class="tips">
      提示：内部某些功能需要登录后方能使用（<em class="theme">如在不登录状态下歌单只会显示前十首歌曲</em>），密码仅用作于和网易云官方验证，不会记录在服务器中，请放心登录～
    </div>
    <span class="no-user" @click="noUser">桔子 <i class="iconfont icon-right"></i></span>
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
import {
  defineComponent,
  ref
} from 'vue'
import {
  useRouter
} from 'vue-router'
import {
  useStore
} from 'vuex'
import Cookies from 'js-cookie'
import api from '../../api'

export default defineComponent({
  setup() {
    const phone = ref('')
    const password = ref('')
    const isSend = ref(false)
    const isShow = ref(false)
    const count = ref(60)

    const router = useRouter()
    const store = useStore()

    const getAuth = () => {
      if (isSend.value || !phone.value) return
      api.getAuthCode(phone.value).then((resp) => {
        if (resp.data.code === 200) {
          isSend.value = true
          const countDown = setInterval(() => {
            if (count.value > 0 && count.value <= 60) {
              count.value--
            } else {
              isSend.value = false
              count.value = 60
              clearInterval(countDown)
            }
          }, 1000)
        }
      })
    }

    const onSubmit = () => {
      if (!phone.value || !password.value) return
      api.getLoginCellphoneResource(phone.value, password.value).then((resp) => {
        if (resp.data.code === 200) {
          const key = [
            'avatarUrl',
            'backgroundUrl',
            'birthday',
            'province',
            'city',
            'followed',
            'followeds',
            'follows',
            'gender',
            'nickname',
            'playlistBeSubscribedCount',
            'playlistCount',
            'signature',
            'userId',
            'userType',
            'vipType',
          ]
          let info = {}
          key.forEach((k) => (info[k] = resp.data.profile[k]))
          store.commit('SET_USERINFO', info)
          Cookies.set('MUSIC_U', resp.data.token)
          router.push('/songlist')
        }
      })
    }

    const showLogin = () => {
      isShow.value = true
    }

    const goHome = () => {
      router.push('/songlist')
    }

    return {
      phone,
      password,
      isSend,
      isShow,
      count,
      getAuth,
      onSubmit,
      showLogin,
      goHome,
    }
  },
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

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
    bottom: 15%;
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

  .login-form {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -260px);
    @include wh(80%, 520px);
    padding: 100px 10px;
    box-sizing: border-box;
    z-index: 1995;
    background: #fff;
    border-radius: 10px;

    .username,
    .password {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include wh(100%, 48px);
      margin-bottom: 40px;
    }

    .auth {
      margin-left: 10px;
      background: $theme;
      @include sc($font_normal, #fff);
      line-height: 45px;
      border-radius: 5px;

      &.forbid {
        padding: 0 15px;
        background: $light-gray;
      }
    }

    .submit {
      background: $theme;
      @include sc($font_normal, #fff);
      line-height: 45px;
      border-radius: 5px;
      text-align: center;
    }

    .tips {
      margin-top: 30px;
      @include sc($font_normal, $gray);
      line-height: 22px;
    }

    .input {
      flex: 1;
      background: $bgc;
      line-height: 48px;
      padding: 0 10px;
      border-radius: 5px;
    }

    .no-user {
      position: absolute;
      right: 10px;
      bottom: 10px;
      @include sc($font_small, $gray);
      line-height: 18px;
    }

    &.active {
      display: block !important;
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
