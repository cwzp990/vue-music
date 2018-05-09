<!-- 歌手专辑 -->
<template>
  <div class="singerAlbum">歌手专辑</div>
</template>

<script>
import { api } from 'api/index'
export default {
  data () {
    return {
      singerId: this.$route.params.id,
      albumList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getArtistAlbumResource(this.singerId).then(res => {
        if (res.status === 200) {
          this.albumList = res.data.hotAlbums
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
