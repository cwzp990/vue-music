<template>
<div className="m-songlist-details">
  <mHeader isWhite>
    <template v-slot:title>
      <p class="normal-title">歌单详情</p>
    </template>
  </mHeader>
  <div className="songlist-info" @click="goToInfo">
    <div className="list-wrapper">
      <div className="cover">
        <img :src="songlist.coverImgUrl" alt="" />
        <span className="count">
          <i className="iconfont icon-play"></i>
          {{convertCount(songlist.playCount)}}
        </span>
      </div>
      <div className="info">
        <p className="title more">{{songlist.name}}</p>
        <p className="creator">
          <span className="avatar-wrapper">
            <img :src="songlist.creator.avatarUrl" alt="" />
          </span>
          <span className="name">
            {{songlist.creator.nickname}}
            <i className="iconfont icon-right"></i>
          </span>
        </p>
        <p className="desc">{{songlist.description}}</p>
      </div>
    </div>

    <div className="bg-img">
      <img :src="songlist.coverImgUrl" alt="" />
    </div>
  </div>
  <div className="songlist-main">
    <List :list="songlist.tracks" :subscribed="songlist.subscribedCount" />
  </div>
</div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted
} from "vue";
import {
  useRouter
} from "vue-router";
import List from '../list/index.vue';
import mHeader from "../../components/header/index.vue";
import api from "../../api";
import {
  convertCount
} from "../../utils";

export default defineComponent({
  components: {
    List,
    mHeader
  },

  setup() {
    const songlist = ref({
      coverImgUrl: '',
      playCount: '',
      name: '',
      creator: '',
      description: '',
      tracks: [],
      subscribedCount: ''
    })
    const route = useRouter()
    const id = route.currentRoute.value.query.id
    onMounted(() => {
      api.getPlaylistDetailResource(id).then((resp) => {
        if (resp.data.code === 200) {
          songlist.value = resp.data.playlist;
        }
      });
    })

    const goToInfo = () => {

    }

    return {
      convertCount,
      songlist,
      goToInfo
    }
  }
})
</script>

<style lang="scss">
@import "../../styles/mixin.scss";

.m-songlist-details {
  position: relative;

  .songlist-info {
    position: relative;
    @include wh(100%, 30%);
    padding: 10px 10px 25px 10px;
    box-sizing: border-box;

    .list-wrapper {
      display: flex;
      justify-content: space-between;

      .cover {
        position: relative;
        @include wh(140px, 140px);
        margin-right: 15px;

        .count {
          position: absolute;
          top: 5px;
          right: 5px;
          @include sc($font_small, #fff);
        }
      }

      .info {
        width: calc(100% - 155px);

        .title {
          @include sc($font_large, #fff);
          font-weight: 700;
          margin-bottom: 20px;
        }

        .creator {
          @include sc($font_small, #fff);
          margin-bottom: 20px;

          .avatar-wrapper {
            display: inline-block;
            vertical-align: middle;
            @include avatar(36px, 36px);
            margin-right: 10px;
          }

          .name {
            display: inline-block;
            vertical-align: middle;
          }
        }

        .desc {
          @include more;
          @include sc($font_small, #fff);
          line-height: 20px;
        }
      }
    }

    .list-title {
      color: #fff !important;
      line-height: 24px;
    }
  }

  .songlist-main {
    position: relative;
    top: -10px;
    background: #fff;
    border-radius: 15px 15px 0 0;
    padding: 15px 10px;
  }
}
</style>
