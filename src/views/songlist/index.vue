<template>
<div class="m-square">
  <div class="square-category">
    <div class="cat-wrapper">
      <span v-for="(name, index) in hotCategory" :key="index">{{name}}</span>
    </div>
    <i class="iconfont icon-category" @Click="gotoAll"></i>
  </div>
  <div class="m-rank">
    <div class="ranklist-wrapper">
      <div class="box-wrapper" v-for="list in squareList" :key="list.id">
        <Box :info="list" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  defineComponent,
  reactive,
  onMounted
} from "vue";
import Box from "../../components/box/box.vue";
import api from '../../api/index'

export default defineComponent({
  components: {
    Box
  },
  setup() {
    let hotCategory = reactive([])

    onMounted(() => {
      console.log(111, api)
      // api.getCategoryHotPlaylist().then(resp => {
      //   if (resp.data.code === 200) {
      //     hotCategory = resp.data.tags.map(i => i.name)
      //   }
      // })
    })

    const gotoAll = () => {}

    return {
      hotCategory,
      gotoAll
    }
  }
})
</script>
