<!-- 视频列表 -->
<template>
  <div class="video-player">
    <video-player :options="playerOptions" ref="videoPlayer" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" class="video-palyer vjs-custom-skin"></video-player>
  </div>
</template>

<script>
import VideoPlayer from 'vue-video-player'
export default {
  data () {
    return {
      playOptions: {
        autoplay: false, // 如果true,浏览器准备好时开始回放
        muted: false, // 默认情况下将会消除任何音频
        loop: false, // 导致视频一结束就重新开始
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器
        sources: [{
          type: "application/x-mpegURL",
          src: videoSrc // 你的m3u8地址（必填）
        }],
        poster: picUrl, // 你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息
      }
    }
  },
  props: {
    videoSrc: {
      type: 'String',
      default: ''
    },
    picUrl: {
      type: 'String',
      default: ''
    }
  },
  methods: {
    onPlayerPlay (player) {
      alert("play")
    },
    onPlayerPause (player){
      alert("pause")
    }
  },
  components: {
    VideoPlayer
  },
  watch: {
    player () {
      let that = this
      that.$nextTick(() => {
        that.$refs.videoPlayer.player
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.video-player {
  background-color: #efefef;
  min-height: 100%;
}
</style>
