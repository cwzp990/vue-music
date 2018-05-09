<!-- 歌手视频 -->
<template>
  <div class="singerVideo">歌手视频</div>
</template>

<script>
import { api } from 'api/index'
export default {
  data () {
    return {
      singerId: this.$route.params.id,
      videoList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getArtistMvResource(this.singerId).then(res => {
        if (res.status === 200) {
          this.albumList = res.data.mvs
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
