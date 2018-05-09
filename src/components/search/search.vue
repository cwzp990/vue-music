<!-- 搜索页 -->
<template>
  <div class="search">
    <div class="header">
      <!-- 头部搜索框 -->
      <div class="searchbox-wrapper">
        <input placeholder="搜一搜" v-model="value">
        <svg-icon icon-class="search"></svg-icon>
      </div>
      <div class="cancel" @click="gotoAddress('/home/music')">取消</div>
    </div>
    <p class="singer vux-1px-b" v-show="!value.length" @click="gotoAddress('/singer')">
      <svg-icon icon-class="user"></svg-icon>
      歌手分类
      <svg-icon icon-class="right"></svg-icon>
    </p>
    <div class="hot" v-show="!value.length">
      <h4 class="title">热门搜索</h4>
      <ul>
        <li v-for="(item, index) in hotKeys" :key="index" class="keys-item">{{item}}</li>
      </ul>
    </div>
    <div class="result" v-show="value.length">
      <p class="box-value vux-1px-b">搜索 "{{value}}"</p>
      <ul>
        <li v-for="(item, index) in results" :key="index" class="result-item vux-1px-b" @click="selectResult(item)">
          <svg-icon icon-class="search"></svg-icon>
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { XInput } from 'vux'
import { api } from 'api/index'
export default {
  data () {
    return {
      value: '',
      hotKeys: [
        '林俊杰',
        '林俊杰',
        '林俊杰',
        '林俊杰',
        '林俊杰',
        '林俊杰',
        '林俊杰',
        '林俊杰',
        '林俊杰',
        '林俊杰'
      ],
      results: []
    }
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  created () {
    // this.getData()
  },
  methods: {
    // getData () {
    //   api.getHotKeys().then(res => {
    //     console.log(res)
    //   })
    // },
    getSearchResults (key) {
      api.getSearchResource(key).then(res => {
        if (res.status === 200) {
          this.results = res.data.result.songs
          console.log(this.results)
        }
      })
    },
    selectResult (item) {
      this.$emit('select', item)
    },
    gotoAddress (path) {
      this.$router.push(path)
    }
  },
  watch: {
    value () {
      this.getSearchResults(this.value)
    }
  },
  components: {
    XInput
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/mixin';
.search {
  @include allcover;
  bottom: 1.95rem;
  @include wh(100%, 100rem);
  .header {
    position: relative;
    @include wh(100%, 1.95rem);
    background: $juzi;
    .searchbox-wrapper {
      position: relative;
      @include wh(88%, 70%);
      @include ct;
      input {
        @include wh(100%, 100%);
        border-radius: 20px;
        padding: 0 2rem;
        box-sizing: border-box;
        @include sc(.7rem, #b2b2b2);
      }
      .svg-icon {
        position: absolute;
        top: .2rem;
        left: .8rem;
        @include svg(1rem, #b2b2b2);
      }
    }
    .cancel {
      @include ct;
      right: .5rem;
      @include sc(.7rem, #fff);
    }
  }
  .singer {
    text-align: center;
    @include sc(.8rem, #b2b2b2);
    @include svg(.8rem, #b2b2b2);
    line-height: 2rem;
  }
  .hot {
    margin-top: 1rem;
    padding: 0 .5rem;
    .title {
      @include sc(.7rem, #b2b2b2);
    }
    .keys-item {
      display: inline-block;
      @include sc(.7rem, #000);
      padding: .3rem;
      margin: .3rem;
      border: .025rem solid #b2b2b2;
      border-radius: 10px;
    }
  }
  .result {
    padding: 0 .5rem;
    .box-value {
      @include sc(.8rem, $juzi);
      line-height: 2rem;
    }
    .result-item {
      line-height: 2rem;
      @include sc(.8rem, #000);
      .svg-icon {
        @include svg(1rem, #b2b2b2);
        margin-right: .5rem;
      }
    }
  }
}
</style>
