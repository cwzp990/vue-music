import * as types from "./types";
import { findIndex } from "../utils";

const mutations = {
  // 显示player组件
  [types.SET_SHOW_PLAYER] (state, showPlayer) {
    state.showPlayer = showPlayer;
  },

  // 显示播放列表组件
  [types.SET_SHOW_PLAYER_LIST] (state, showList) {
    state.showList = showList;
  }
};
