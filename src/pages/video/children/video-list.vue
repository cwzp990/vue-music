<template>
  <div class="video-list">
    <div class="player">
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="{
                      autoplay: false,
                      muted: false,
                      loop: false,
                      preload: 'auto',
                      language: 'zh-CN',
                      aspectRatio: '16:9',
                      fluid: true,
                      sources: [{
                        type: 'video/mp4',
                        src: url
                      }],
                      poster: cover,
                      notSupportedMessage: '此视频暂无法播放，请稍后再试'
                    }"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)">
      </video-player>
    </div>
  </div>
</template>

<script>
import { api } from 'api/index'
import { videoPlayer } from 'vue-video-player'
export default {
  props: {
    mvid: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      url: '',
      cover: ''
    }
  },
  created () {
    this.getData()
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    getData () {
      api.getMvResource(this.mvid).then(res => {
        if (res.status === 200) {
          this.url = res.data.data.brs[720]
          this.cover = res.data.data.cover
        }
      })
    },
    onPlayerPlay (player) {
    },
    onPlayerPause (player) {
    }
  },
  components: {
    videoPlayer
  }
}
</script>

<style lang="scss" scoped>
.video-list {
  background-color: #efefef;
  min-height: 100%;
}
</style>
