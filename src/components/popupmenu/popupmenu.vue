<template>
	<div>
		<div v-transfer-dom>
      <popup v-model="menu">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
        left-text=""
        right-text="开通音乐包"
        :title="title"
        :show-bottom-border="false"
        @on-click-right="onMembership"></popup-header>
        <group gutter="0">
          <radio :options="options"></radio>
        </group>
      </popup>
    </div>
		<toast v-model="tips" type="text" width="20em">无法购买哦</toast>
	</div>
</template>

<script>
import { PopupHeader, Popup, TransferDom, Group, Radio } from 'vux'
export default {
	directives: {
		TransferDom
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		song: {
			type: Object,
			default: () => {}
		},
		menu: {
			type: Boolean,
			default: false
		},
		tips: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			options: [
				'收藏到歌单',
				'相似推荐',
				`歌手：${song.singer}`,
				`专辑：${song.album}`,
				`来源：${song.list}`,
				'音质：自动选择',
				'查看视频',
				'定时关闭',
				'打开驾驶模式'
			]
		}
	},
	methods: {
		onMembership () {
			this.tips = true
		}
	},
	components: {
		PopupHeader,
		Popup,
		TransferDom,
		Group,
		Radio
	}
}
</script>

<style scoped>
</style>
