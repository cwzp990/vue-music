<template>
<div className="m-list">
  <div className="title">
    <p>
      <i className="iconfont icon-play"></i>
      <span className="all">播放全部</span>
      <span className="count"> (共 {{ list.length }} 首)</span>
    </p>
    <p className="collect" v-if="subscribed">+ 收藏 ({{ subscribed }})</p>
  </div>
  <ul className="list-wrapper">
    <li className="item-song" v-for="(song, index) in list" :key="song.id" @click="onPlay(index)">
      <div className="item-left">
        <p className="index">{{ index + 1 }}</p>
        <p className="song-name">
          <span className="name">{{ more(song.name, 20) }}</span>
          <span className="singer">
            {{ song.ar[0].name }} - {{ more(song.al.name, 25) }}
          </span>
        </p>
      </div>
      <span className="play">
        <i className="iconfont icon-play-circle"></i>
      </span>
    </li>
  </ul>
</div>
</template>

<script>
import {
  defineComponent
} from "vue";
import {
  useStore
} from 'vuex';
import {
  more
} from "../../utils";

export default defineComponent({
  props: ['list', 'subscribed'],
  setup(props) {
    const store = useStore();

    const onPlay = (index) => {
      store.dispatch('setAllPlay', {
        playList: props.list,
        currentIndex: index
      })
    }

    return {
      more,
      onPlay,
    }
  }
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.m-list {
  .title {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;

    .all {
      margin-left: 10px;
      @include sc($font_large, $black);
    }

    .count {
      @include sc($font_small);
    }

    .collect {
      padding: 8px 5px;
      background: $theme;
      @include sc($font_small, #fff);
      border-radius: 10px;
    }
  }

  .list-wrapper {
    margin-top: 10px;

    .item-song {
      display: flex;
      justify-content: space-between;
      height: 48px;

      .item-left {
        width: 90%;

        .index {
          display: inline-block;
          @include sc($font_normal, $gray);
          margin-right: 15px;
        }

        .song-name {
          display: inline-flex;
          flex-direction: column;

          .name {
            @include sc($font_normal, $black);
            line-height: 1.5;
          }

          .singer {
            @include sc($font_small, $gray);
            line-height: 1.5;
          }
        }
      }

      .play {
        @include sc($font_huge, $black);
      }
    }
  }
}
</style>
