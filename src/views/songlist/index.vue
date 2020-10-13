<template>
  <div class="m-square">
    <div class="square-category">
      <div class="cat-wrapper">
        <span v-for="(name, index) in hotCategory" :key="index" @click="onSelected(name)">{{
          name
        }}</span>
      </div>
      <i class="iconfont icon-category" @Click="gotoAll"></i>
    </div>
    <div class="m-songlist">
      <div class="songlist-wrapper">
        <div class="box-wrapper" v-for="list in squareList" :key="list.id">
          <Box :info="list" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useStore } from 'vuex'
import Box from "../../components/box/box.vue";
import api from "../../api";

export default defineComponent({
  components: {
    Box
  },
  setup () {
    const store = useStore();
    const hotCategory = ref([]);
    const squareList = ref([]);
    const category = computed(() => store.getters.category)
    onMounted(() => {
      getHotCategory();
      getSongList()
    });

    watch(
      () => category.value,
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
          squareList.value = resp.data.playlists;
        }
      });
    };

    const onSelected = (name) => {
      store.commit('SET_CATEGORY', name)
    }

    const gotoAll = () => { };

    return {
      hotCategory,
      squareList,
      onSelected,
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

  .m-songlist {
    .songlist-wrapper {
      display: flex;
      flex-wrap: wrap;
      .box-wrapper {
        width: 32%;
        margin-right: 2%;
        margin-bottom: 8px;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
