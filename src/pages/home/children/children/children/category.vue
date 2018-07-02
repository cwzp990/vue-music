<!-- 筛选歌单 -->
<template>
  <transition name="fade">
    <div class="category">
      <x-header :left-options="{backText: ''}">
        筛选歌单
      </x-header>
      <scroll>
        <div class="category-box">
          <div class="all" v-if="list.all">
            {{list.all.name}}
            <svg-icon icon-class="selected-triangle"></svg-icon>
          </div>
          <ul>
            <li>
              <category-box title="语种" :icon="'earth'" :list="list.language"></category-box>
            </li>
            <li>
              <category-box title="风格" :icon="'piano'" :list="list.style"></category-box>
            </li>
            <li>
              <category-box title="场景" :icon="'coffee'" :list="list.scene"></category-box>
            </li>
            <li>
              <category-box title="情感" :icon="'smile'" :list="list.emotion"></category-box>
            </li>
            <li>
              <category-box title="主题" :icon="'classify'" :list="list.theme"></category-box>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { XHeader } from 'vux'
import { mapMutations } from 'vuex'
import Scroll from 'components/scroll/scroll'
import CategoryBox from 'pages/home/children/children/children/children/category-box'
import { api } from 'api/index'
export default {
  data () {
    return {
      list: {}
    }
  },
  props: {
    selected: {
      type: String,
      default: '全部歌单'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getCategoryPlayList().then(res => {
        if (res.status === 200) {
          this.list = this._normalizeData(res.data)
        }
      })
    },
    _normalizeData (data) {
      let arr1 = []
      let arr2 = []
      let arr3 = []
      let arr4 = []
      let arr5 = []
      data.sub.forEach(item => {
        switch (item.category) {
          case 0:
            arr1.push(item)
            break
          case 1:
            arr2.push(item)
            break
          case 2:
            arr3.push(item)
            break
          case 3:
            arr4.push(item)
            break
          case 4:
            arr5.push(item)
            break
        }
      })
      let result = {
        all: data.all,
        language: arr1,
        style: arr2,
        scene: arr3,
        emotion: arr4,
        theme: arr5
      }
      return result
    },
    ...mapMutations({
      setTag: 'SETTAG'
    })
  },
  components: {
    XHeader,
    Scroll,
    CategoryBox
  }
}
</script>

<style lang='scss' scoped>
@import '../../../../../style/mixin';
.category {
  position: fixed;
  top: 0;
  bottom: 1.95rem;
  @include wh(100%, 100%);
  background: #fff;
  z-index: 300;
  .vux-header {
    .vux-header-right {
      .svg-icon {
        @include svg(0.9rem, #fff);
      }
    }
  }
  .list-wrapper {
    @include wh(100%, 100%);
    overflow: hidden;
    .category-box {
      padding: .3rem;
      .all {
        position: relative;
        @include wh(100%, 1.7rem);
        @include font(.6rem, 1.7rem);
        color: #000;
        text-align: center;
        border: .025rem solid $juzi;
        .svg-icon {
          position: absolute;
          bottom: -.4rem;
          right: -.4rem;
          @include svg(1.5rem, $juzi);
        }
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease
}
.fade-enter, .fade-leave-to {
  transform: translate3d(100%, 0, 0)
}
</style>
