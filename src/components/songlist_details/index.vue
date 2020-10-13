<template>
    <div className="m-songlist-details">
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
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import List from '../list/index.vue';
import api from "../../api";
import { convertCount } from "../../utils";

export default defineComponent({
  components: {
    List
  },

  setup () {
    const songlist = ref({})
    const route = useRouter()
    const id = route.currentRoute.value.query.id

    onMounted(() => {
      api.getPlaylistDetailResource(id).then((resp) => {
        songlist.value = resp.data.playlist;
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