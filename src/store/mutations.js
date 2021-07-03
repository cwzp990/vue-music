import * as types from "./types";

const mutations = {
  // 设置播放模式
  [types.SET_PLAYMODE](state, mode) {
    state.mode = mode;
  },

  // 显示player组件
  [types.SET_SHOW_PLAYER](state, showPlayer) {
    state.showPlayer = showPlayer;
  },

  // 显示播放列表组件
  [types.SET_SHOW_PLAYER_LIST](state, showList) {
    state.showList = showList;
  },

  // 显示loading组件
  [types.SET_SHOW_MODAL](state, showModal) {
    state.showModal = showModal;
  },

  // 设置播放状态
  [types.SET_PLAYER_STATE](state, playerState) {
    state.playerState = playerState;
  },

  // 设置当前音乐
  [types.SET_CURRENTMUSIC](state, currentMusic) {
    state.currentMusic = currentMusic;
  },

  // 设置当前音乐索引
  [types.SET_CURRENTINDEX](state, currentIndex) {
    state.currentIndex = currentIndex;
  },

  // 设置当前播放列表
  [types.SET_PLAYLIST](state, playList) {
    state.playList = playList;
  },

  // 设置当前歌手
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  },

  // 设置当前用户信息
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },

  // 设置当前歌单类型
  [types.SET_CATEGORY](state, category) {
    state.category = category;
  },

  // 设置分页页数
  [types.SET_OFFSET](state, offset) {
    state.offset = offset;
  }
};

export default mutations;
