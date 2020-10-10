<template>
<div class="songlist-box" @Click="goToSongList(info.id)">
  <div class="img-wrapper">
    <img :src="info.coverImgUrl || info.picUrl" alt=" 歌单" />
    <span class="count"><i class="iconfont icon-play-hollow"></i>{{convertCount(info.playCount)}}</span>
    <span class="sub">{{info.updateFrequency}}</span>
  </div>
  <p class="title">{{info.name}}</p>
</div>
</template>

<script>
import {
  defineComponent
} from "vue";
import {
  useRouter
} from "vue-router";
import {
  convertCount
} from '../../utils'

export default defineComponent({
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const router = useRouter();

    const goToSongList = () => {
      router.push("/list_detail");
    }

    return {
      goToSongList,
      convertCount
    }
  }
})
</script>

<style lang="scss">
@import "../../styles/mixin.scss";

.songlist-box {
  display: flex;
  flex-direction: column;
  @include wh(100%, 100%);

  .img-wrapper {
    position: relative;
    border-radius: 8px;
    overflow: hidden;

    .count {
      position: absolute;
      top: 5px;
      right: 5px;
      @include sc($font_small, #fff);
    }

    .sub {
      position: absolute;
      bottom: 5px;
      left: 5px;
      @include sc($font_small, #fff);
    }
  }

  .title {
    @include more;
    @include sc($font_normal, $gray);
    line-height: 1.5;
  }
}
</style>
