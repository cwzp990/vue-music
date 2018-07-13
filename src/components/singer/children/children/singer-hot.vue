<!-- 歌手热门 -->
<template>
  <div class="singerHot">
    <list-details @select="selectItem" :data="songList" :count="songList.length" :vtop="true"></list-details>
  </div>
</template>

<script>
import ListDetails from 'components/list-details/list-details'
import { api } from 'api/index'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      singerId: this.$route.params.id,
      songList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      api.getArtistsResource(this.singerId).then(res => {
        if (res.status === 200) {
          this.songList = res.data.hotSongs
        }
      })
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songList.tracks,
        index: index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    ListDetails
  }
}
</script>

<style lang='scss'>
</style>
