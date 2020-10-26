<template>
<div class="m-search">
  <div class="m-search-input">
    <div class="search-main">
      <input class="search-box" v-model="key" placeholder="随便搜搜吧┑(￣Д ￣)┍" @input="onQuery" />
      <i class="iconfont icon-search search"></i>
    </div>
    <div class="singer">
      <i class="iconfont icon-person" @click="goToSinger"></i>
    </div>
  </div>
  <div class="m-search-list" v-if="result.length">
    <p class="title">搜索 "{{ key }}"</p>
    <ul class="result-wrapper">
      <li class="item-result" v-for="item in result" :key="item.id" @click="onPlay(item.id)">
        <i class="iconfont icon-search"></i>
        <span>{{ item.name }}</span><span v-if="item.artists"> - {{item.artists[0].name}}</span>
      </li>
    </ul>
  </div>
  <div class="container" v-else>
    <div class="search-history">
      <p class="title">
        <span class="history">搜索历史</span>
        <i class="iconfont icon-empty" @click="onEmpty"></i>
      </p>
      <ul class="history-wrapper">
        <li class="item-search" v-for="item in history" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="search-hot">
      <p class="hot">热搜榜</p>
      <ul class="hot-wrapper">
        <li class="item-hot" v-for="(item, index) in hotKeys" :key="index" @click="onSelected(item.searchWord)">
          <p :class="item < 4 ? 'index red' : 'index'">{{ index + 1 }}</p>
          <p class="main">
            <span>
              <em class="name">{{ item.searchWord }}</em>
              <i :class="item.iconType === 1 ? 'icon-HOT iconfont red' : 'icon-NEW iconfont blue'"></i>
            </span>
            <span class="sub more">{{ item.content }}</span>
          </p>
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
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
import api from '../../api'
export default defineComponent({
  setup() {
    const key = ref('')
    const result = ref([])
    const hotKeys = ref([])
    const history = ref([])
    const store = useStore()

    onMounted(() => {
      history.value = JSON.parse(localStorage.getItem('_search_')) || []
      getHotKeys()
    })

    const onEmpty = () => {
      localStorage.clear()
    }

    const getHotKeys = () => {
      api.getHotKeys().then((resp) => {
        if (resp.data.code === 200) {
          hotKeys.value = resp.data.data
        }
      })
    }

    const onSelected = (val) => {
      key.value = val
      const isHas = history.value.indexOf(val) > -1
      if (isHas) return
      history.value.push(val)
      localStorage.setItem('_search_', JSON.stringify(history.value))
    }

    const onQuery = () => {
      if (!key.value) {
        result.value = []
        return
      }
      api.getSearchResource(key.value).then((resp) => {
        if (resp.data.code === 200) {
          result.value = resp.data.result.songs
        }
      })
    }

    const onPlay = (id) => {
      api.getSongDetails(id).then(resp => {
        if (resp.data.code === 200) {
          let music = resp.data.songs[0]
          store.dispatch('addPlay', {
            music
          })
        }
      })
    }

    return {
      key,
      result,
      hotKeys,
      history,
      onEmpty,
      onQuery,
      onSelected,
      onPlay
    }
  },
})
</script>

<style lang="scss">
@import '../../styles/mixin.scss';

.m-search {

  .history,
  .hot {
    @include sc($font_huge, $black);
    line-height: 24px;
  }

  .search-history {
    margin: 10px 0;

    .title {
      display: flex;
      justify-content: space-between;
      line-height: 30px;

      .icon-empty {
        @include sc($font_large, $light_gray);
      }
    }

    .history-wrapper {
      display: flex;
      flex-wrap: wrap;

      .item-search {
        padding: 5px 8px;
        margin: 0 10px 10px 0;
        border-radius: 5px;
        background: $bgc;
        @include sc($font_normal, $gray);
      }
    }
  }

  .search-hot {
    .hot-wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item-hot {
        display: flex;
        align-items: center;
        width: 50%;
        margin-bottom: 10px;

        .index {
          @include sc($font_huge, $gray);
          margin-right: 10px;
        }

        .main {
          display: flex;
          flex-direction: column;
          width: 90%;

          .name {
            display: inline-block;
            @include sc($font_large, $black);
            line-height: 24px;
            margin-right: 3px;
          }

          .iconfont {
            @include sc($font_large);
          }

          .sub {
            @include sc($font_small, $light_gray);
          }
        }
      }
    }
  }
}

.m-search-list {
  .title {
    line-height: 36px;
    @include sc($font_normal, $blue);
  }

  .result-wrapper {
    display: flex;
    flex-direction: column;

    .item-result {
      line-height: 36px;
      border-bottom: 1px solid $bgc;
      @include sc($font_normal, $black);

      .iconfont {
        display: inline-block;
        @include sc($font_normal, $light_gray);
        margin-right: 10px;
      }
    }
  }
}

.m-search-input {
  display: flex;
  align-items: center;
  @include wh(100%, 35px);

  .search-main {
    position: relative;
    width: 92%;

    .search-box {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      padding: 0 10px;
      line-height: 30px;
      background: $bgc;
      border-radius: 10px;
    }

    .iconfont {
      position: absolute;
      top: 5px;
      right: 5px;
      @include sc($font_huge, $light_gray);
    }
  }

  .singer {
    width: 8%;
    text-align: center;

    .iconfont {
      @include sc($font_large, $gray);
    }
  }

}
</style>
