<template>
<div class="m-rank">
  <mHeader>
    <template v-slot:title>
      <p class="normal-title">排行榜</p>
    </template>
  </mHeader>
  <div class="rank-wrapper">
    <div class="box-wrapper" v-for="list in rankList" :key="list.id">
      <Box :info="list" />
    </div>
  </div>
</div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted
} from "vue";
import Box from "../../components/box/box.vue";
import mHeader from "../../components/header/index.vue";
import api from "../../api";
export default defineComponent({
  components: {
    Box,
    mHeader
  },
  setup() {
    const rankList = ref([]);
    onMounted(() => {
      getRankList()
    })

    const getRankList = () => {
      api.getTopListResource().then(resp => {
        if (resp.data.code === 200) {
          rankList.value = resp.data.list
        }
      })
    }

    return {
      rankList
    }
  }
})
</script>

<style lang="scss">
.m-rank {
  .rank-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;

    .box-wrapper {
      width: 32%;
      margin-right: 2%;
      margin-bottom: 8px;

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
