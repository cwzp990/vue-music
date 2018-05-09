<!-- 筛选歌单 -->
<template>
  <div class="category">
    <x-header :left-options="{backText: ''}">
      筛选歌单
    </x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapMutations } from 'vuex'
import { api } from 'api/index'
export default {
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getCategoryPlayList().then(res => {
        if (res.status === 200) {
          console.log(res)
        }
      })
    },
    ...mapMutations({
      setTag: 'SET_TAG'
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
</style>
