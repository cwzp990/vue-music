<template>
	<div>
		<popup-header right-text="开通音乐包" :title="title"></popup-header>
		<group>
      <x-switch v-model="show" :title="显示/隐藏"></x-switch>
    </group>
		<div v-transfer-dom>
      <popup v-model="show">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
        :left-text="$t('cancel')"
        :right-text="$t('done')"
        :title="$t('Please select your card')"
        :show-bottom-border="false"
        @on-click-left="show1 = false"
        @on-click-right="show1 = false"></popup-header>
        <group gutter="0">
          <radio :options="[$t('Card 1'), $t('Card 2'), $t('Card 3'), $t('Card 4')]"></radio>
        </group>
      </popup>
    </div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			show: false
		}
	}
}
</script>

<style scoped>
</style>
