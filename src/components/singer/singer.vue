<!-- 歌手列表 -->
<template>
  <div class="singer">
    <x-header :left-options="{backText: ''}">
      热门歌手
      <svg-icon icon-class="playing" slot="right"></svg-icon>
    </x-header>
    <ul>
      <li v-for="item in singerList" :key="item.id" class="list-item vux-1px-b" @click.native="selectItem(item)">
        <div class="img-wrapper">
          <img :src="item.picUrl" width="100%" height="100%">
        </div>
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { mapMutations } from 'vuex'
import { api } from 'api/index'
export default {
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getTopArtistsResource().then(res => {
        if (res.status === 200) {
          this.singerList = res.data.artists
          console.log(this.singerList)
        }
      })
    },
    selectItem (item) {
      this.$reouter.push({
        path: `/singer/${item.id}/details`
      })
      this.setSinger(item)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    XHeader
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.singer {
  @include allcover();
  bottom: 1.95rem;
  @include wh(100%, 100%);
  .vux-header {
    .svg-icon {
      @include svg(1rem, #fff);
    }
  }
  .list-item {
    display: flex;
    height: 3rem;
    margin: .5rem 0;
    padding: 0 .5rem;
    line-height: 3rem;
    @include sc(.8rem, #000);
    .img-wrapper {
      @include wh(3rem, 3rem);
      margin-right: 1rem;
    }
  }
}
</style>
