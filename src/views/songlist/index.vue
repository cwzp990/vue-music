<template>
  <div class="m-square">
    <div class="square-category">
      <div class="cat-wrapper">
        <span v-for="(name, index) in hotCategory" :key="index">{{
          name
        }}</span>
      </div>
      <i class="iconfont icon-category" @Click="gotoAll"></i>
    </div>
    <div class="m-rank">
      <div class="ranklist-wrapper">
        <div class="box-wrapper" v-for="list in squareList" :key="list.id">
          <Box :info="list" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import Box from "../../components/box/box.vue";
import api from "../../api";

export default defineComponent({
  components: {
    Box
  },
  setup () {
    const hotCategory = ref([]);
    const list = ref([]);

    onMounted(() => {
      getHotCategory();
    });

    watch(
      () => category,
      val => {
        if (val) {
          getSongList(val);
        }
      }
    );

    const getHotCategory = () => {
      api.getCategoryHotPlaylist().then(resp => {
        if (resp.data.code === 200) {
          hotCategory.value = resp.data.tags.map(i => i.name);
        }
      });
    };

    const getSongList = cat => {
      api.getTopPlaylistResource(cat).then(resp => {
        if (resp.data.code === 200) {
          list.value = resp.data.playlists;
        }
      });
    };

    const gotoAll = () => { };

    return {
      hotCategory,
      gotoAll
    };
  }
});
</script>

<style lang="scss">
@import "../../styles/mixin.scss";
.m-square {
  .square-category {
    display: flex;
    margin-bottom: 5px;
    .cat-wrapper {
      display: inline-block;
      white-space: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      span {
        display: inline-block;
        text-align: center;
        @include wh(60px, 100%);
        @include sc($font_normal, $gray);
        line-height: 24px;
        &.current {
          color: $theme;
        }
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .iconfont {
      display: inline-block;
      padding: 5px;
      @include sc($font_huge, $gray);
    }
  }
}
</style>
