<template>
<div class="m-square">
  <mHeader>
    <template v-slot:title>
      <p class="normal-title">歌单广场</p>
    </template>
  </mHeader>
  <div class="scroll-wrapper">
    <Scroll ref="scrollRef" @load-more="loadMore">
      <div>
        <div class="square-category">
          <div class="cat-wrapper">
            <span v-for="(name, index) in hotCategory" :key="index" :class="category===name? 'current': ''" @click="onSelected(name)">{{
          name
        }}</span>
          </div>
          <i class="iconfont icon-category" @Click="gotoAll"></i>
        </div>
        <div class="m-songlist">
          <Slide :list="banners" :height="240" @sliderClick="goToSongList" />
          <div class="songlist-wrapper">
            <div class="box-wrapper" v-for="list in squareList" :key="list.id">
              <Box :info="list" />
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>

</div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch
} from "vue";
import {
  useRouter
} from "vue-router";
import {
  useStore
} from 'vuex';
import Box from "../../components/box/box.vue";
import mHeader from "../../components/header/index.vue";
import Slide from "../../components/slide/index.vue";
import Scroll from "../../components/scroll/index.vue";
import api from "../../api";

export default defineComponent({
  components: {
    Box,
    mHeader,
    Slide,
    Scroll
  },
  setup() {
    const store = useStore();
    const router = useRouter()
    const hotCategory = ref([]);
    const squareList = ref([]);
    const banners = ref([]);
    const scrollRef = ref(null);
    const category = computed(() => store.getters.category)
    onMounted(() => {
      getHotCategory();
      getSongList()
      getBanners()
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

    const getSongList = (cat, offset) => {
      api.getTopPlaylistResource(cat, offset).then(resp => {
        if (resp.data.code === 200) {
          squareList.value = resp.data.playlists;
        }
      });
    };

    const getBanners = () => {
      banners.value = [{
          id: 5326781559,
          name: '开车必备',
          pic: 'https://p1.music.126.net/viz1oYPl-6E5_4XbOGUL_g==/109951165349970832.jpg'
        },
        {
          id: 5306328734,
          name: '只要你喜欢林俊杰我们就是好朋友',
          pic: 'https://p1.music.126.net/X0EDfXzxMQJiQ-71JFGdZw==/3238061746556733.jpg'
        },
        {
          id: 5260733133,
          name: '周杰伦',
          pic: 'https://p1.music.126.net/1DvWuV2hXOtg3gsP9gYZvg==/109951165055895702.jpg'
        }
      ]
    }

    const onSelected = (name) => {
      store.commit('SET_CATEGORY', name)
    }

    const loadMore = (offset) => {
      let newOffset = offset + 1
      api.getTopPlaylistResource(category.value, newOffset).then(resp => {
        if (resp.data.code === 200) {
          store.commit('SET_OFFSET', newOffset)
          let newList = resp.data.playlists
          squareList.value = [...squareList.value, ...newList]
          scrollRef.value.isLoaded()
        }
      })
    }

    const goToSongList = (item) => {
      router.push({
        path: "/list_detail",
        query: {
          id: item.id
        }
      });
    };

    const gotoAll = () => {};

    return {
      banners,
      hotCategory,
      squareList,
      onSelected,
      category,
      scrollRef,
      loadMore,
      gotoAll,
      goToSongList
    };
  }
});
</script>

<style lang="scss">
@import "../../styles/mixin.scss";

.m-square {
  height: 100%;

  .scroll-wrapper {
    height: calc(100% - 40px);

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
      padding: 0 10px;

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

}
</style>
