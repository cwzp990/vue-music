<!-- 筛选歌单 -->
<template>
  <transition name="fade">
    <div class="category">
      <x-header :left-options="{backText: ''}">
        筛选歌单
      </x-header>
    </div>
  </transition>
</template>

<script>
import { XHeader } from 'vux'
import { mapMutations } from 'vuex'
import { api } from 'api/index'
export default {
  data () {
    return {
      list: []
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
          console.log(this.list)
        }
      })
    },
    _normalizeData (data) {
      let arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = []
      data.sub.forEach(item => {
        switch (item.category)
        {
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
    XHeader
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
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease
}
.fade-enter, .fade-leave-to {
  transform: translate3d(100%, 0, 0)
}
</style>
