<!-- 歌手信息 -->
<template>
  <div class="singerInfo">
    <h3>歌手简介</h3>
    {{brief}}
  </div>
</template>

<script>
import { api } from 'api/index'
export default {
  data () {
    return {
      singerId: this.$route.params.id,
      brief: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getArtistDescResource(this.singerId).then(res => {
        if (res.status === 200) {
          this.brief = res.data.briefDesc
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../../../style/mixin';
.singerInfo {
  @include sc(.6rem, #000);
  line-height: 1rem;
}
</style>
