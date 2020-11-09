<template>
<div class="m-mine">
  <div class="mine-info">
    <div class="info-wrapper">
      <p class="avatar-wrapper">
        <img :src="user.avatarUrl" alt="" />
      </p>
      <p class="nickname">{{user.nickname}}</p>
      <p class="follow">关注{{user.follows}} | 粉丝{{user.followeds}}</p>
      <p>
        <span class="tags age">{{age}}</span> <span class="tags">Lv. {{user.level}}</span>
      </p>
    </div>

    <div class="mine-favorite">
      <div class="favorite-wrapper">
        <div class="icon">
          <i class="iconfont icon-love"></i>
        </div>
        <div>
          <p class="title">我喜欢的音乐</p>
          <p class="subtitle">{{like.length}}首</p>
        </div>
      </div>
    </div>

    <div class="bg-img">
      <img :src="user.backgroundUrl" alt="" />
    </div>
  </div>

  <div class="mine-list">
    <p class="list-tab">
      <span class="tab" :class="{ 'active': type === 1 }" @click="onTab(1)">创建的歌单</span>
      <span class="tab" :class="{ 'active': type === 2 }" @click="onTab(2)">收藏的歌单</span>
    </p>

    <div class="list-main">
      <ul>
        <li class="list-item" v-for="(item, index) in list" :key="index" @click="goToSongList(item.id)">
          <div class="item-cover">
            <img :src="item.coverImgUrl" alt>
          </div>
          <div class="item-info">
            <p class="name">{{item.name}}</p>
            <p class="count">{{item.trackCount}} 首</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  computed,
  ref
} from "vue"
import {
  useRouter
} from "vue-router"
// import {
//   useStore
// } from "vuex"
import api from '../../api'
import toast from '../../components/toast'
export default defineComponent({
  setup() {
    const user = ref({})
    const like = ref([])
    const list = ref([])
    const userInfo = ref("")
    const type = ref(1)
    const router = useRouter()
    // const store = useStore()
    // const userInfo = computed(() => store.getters.userInfo)
    const age = computed(() => {
      let sex = user.value.gender === 1 ? '♂' : '♀'
      let num = String(user.value.year).split('')
      return `${sex} ${num[2]}0后`
    })

    onMounted(() => {
      userInfo.value = JSON.parse(localStorage.getItem("music_user_info"))
      if (!userInfo.value) {
        toast('需要登录!')
        router.push('/')
      } else {
        getUserInfo()
        getUserList()
      }
    })

    const getUserInfo = () => {
      api.getUserDetails(userInfo.value.userId).then(resp => {
        if (resp.data.code === 200) {
          let userResp = resp.data.profile
          userResp.level = resp.data.level
          userResp.year = new Date(resp.data.profile.birthday).getFullYear()
          user.value = userResp
        }
      })
    }

    const getUserList = () => {
      let userId = userInfo.value.userId
      let create = [],
        collect = []
      api.getUserPlaylistResource(userId).then(resp => {
        if (resp.data.code === 200) {
          like.value = resp.data.playlist[0]
          create = resp.data.playlist.filter(i => i.userId === userId).map(i => ({
            id: i.id,
            name: i.name,
            coverImgUrl: i.coverImgUrl,
            trackCount: i.trackCount,
          }))
          collect = resp.data.playlist.filter(i => i.userId !== userId).map(i => ({
            id: i.id,
            name: i.name,
            coverImgUrl: i.coverImgUrl,
            trackCount: i.trackCount,
          }))
          list.value = type.value === 1 ? create : collect
        }
      })
    }

    const goToSongList = (id) => {
      router.push({
        path: "/list_detail",
        query: {
          id
        }
      });
    };

    const onTab = (val) => {
      type.value = val
    }

    return {
      user,
      like,
      list,
      type,
      age,
      goToSongList,
      onTab
    }
  }
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.m-mine {
  @include wh(100%, 100%);

  .mine-info {
    position: relative;
    @include wh(100%, 40%);
    z-index: 1;

    .info-wrapper {
      position: absolute;
      bottom: 80px;
      left: 10px;

      .avatar-wrapper {
        @include avatar(48px, 48px);
        margin-bottom: 13px;
      }

      .nickname {
        @include sc($font_large, #fff);
        font-weight: 700;
        margin-bottom: 13px;
      }

      .follow {
        @include sc($font_small, $light_gray);
        margin-bottom: 13px;
      }

      .tags {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 10px;
        background: $black;
        opacity: 0.8;
        @include sc($font_small, #fff);
      }

      .age {
        background: $blue;
      }
    }

    .mine-favorite {
      position: absolute;
      bottom: 20px;
      left: 10px;
      right: 10px;
      width: calc(100% - 20px);
      background: #fff;
      border-radius: 10px;

      .favorite-wrapper {
        display: flex;
        align-items: center;

        .icon {
          position: relative;
          @include wh(48px, 48px);
          border-radius: 8px;
          margin-right: 10px;

          .iconfont {
            @include center;
            @include sc(36px, $red);
          }
        }

        .title {
          @include sc($font_normal, $black);
          margin-bottom: 6px;
        }

        .subtitle {
          @include sc($font_small, $gray);
        }
      }
    }

    .bg-img {
      position: absolute;
      left: 0;
      top: 0;
      @include wh(100%, 100%);
      z-index: -1;
      opacity: 0.6;
    }
  }

  .mine-list {
    position: relative;
    top: -10px;
    background: #fff;
    border-radius: 15px 15px 0 0;
    padding: 15px 5px;
    z-index: 100;

    .list-tab {
      display: flex;
      justify-content: space-around;

      .tab {
        @include sc($font_normal, $black);
        padding: 0 5px 5px 5px;

        &.active {
          border-bottom: 3px solid $theme;
        }
      }
    }

    .list-item {
      display: flex;
      align-items: center;
      padding: 0 10px;
      margin: 10px 0;

      .item-cover {
        @include wh(48px, 48px);
        border-radius: 8px;
        margin-right: 10px;
        overflow: hidden;
      }

      .item-info {
        .name {
          @include sc($font_normal, $black);
          margin-bottom: 10px;
        }

        .count {
          @include sc($font_small, $gray);
        }
      }
    }
  }
}
</style>
