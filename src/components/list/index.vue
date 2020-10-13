<template>
<div className="m-list container">
	<div className="title">
		<p>
			<i className="iconfont icon-play"></i>
			<span className="all">播放全部</span>
			<span className="count"> (共 {{list.length}} 首)</span>
		</p>
    <p className="collect" v-if="subscribe">+ 收藏 ({{subscribed}})</p>
	</div>
	<ul className="list-wrapper">
		<li className="item-song" v-for="(song, index) in list" :key="song.id" @click="onPlay(index)">
			<div className="item-left">
				<p className="index">{{index + 1}}</p>
				<p className="song-name">
					<span className="name">{{more(song.name, 20)}}</span>
					<span className="singer">
						{{song.ar[0].name}} - {{more(song.al.name, 25)}}
					</span>
				</p>
			</div>
			<span className="play">
				<i className="iconfont icon-play-circle"></i>
			</span>
		</li>
	</ul>
</div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => []
    },
    subscribed: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    console.log(111, props)
    const store = useStore();

    const onPlay = (index) => {
      store.dispatch('setAllPlay', {
        playList: props.list,
        currentIndex: index
      })
    }

    return {
      onPlay
    }
  }
})
</script>