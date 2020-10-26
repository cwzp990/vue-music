import * as types from "./types";
import { findIndex } from "../utils";

// 播放歌曲（会更新整个播放列表）
export const selectPlay = ({ commit }, { list, index }) => {
  commit(types.SET_PLAYLIST, list);
  commit(types.SET_CURRENTINDEX, index);
  commit(types.SET_PLAYER_STATE, true);
};

// 播放歌曲（替换歌单列表）
export const setAllPlay = ({ commit }, { playList, currentIndex }) => {
  commit(types.SET_SHOW_PLAYER, true);
  commit(types.SET_PLAYER_STATE, true);
  commit(types.SET_PLAYLIST, playList);
  commit(types.SET_CURRENTINDEX, currentIndex);
  commit(types.SET_CURRENTMUSIC, playList[currentIndex]);
};

// 播放歌曲（插入一条到播放列表）
export const addPlay = ({ commit, state }, { music }) => {
  let list = [...state.playList];
  // 查询当前播放列表是否有代插入的音乐，并返回其索引值
  let index = findIndex(list, music);
  // 当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引值
  if (index > -1) {
    commit(types.SET_CURRENTINDEX, index);
    commit(types.SET_CURRENTMUSIC, music)
  } else {
    index = list.push(music) - 1
    commit(types.SET_PLAYLIST, list);
    commit(types.SET_CURRENTINDEX, index);
    commit(types.SET_CURRENTMUSIC, list[index])
  }
  commit(types.SET_PLAYER_STATE, true);
  commit(types.SET_SHOW_PLAYER, true);

};

// 清空播放列表
export const clearPlayList = function ({ commit }) {
  commit(types.SET_PLAYER_STATE, false);
  commit(types.SET_CURRENTINDEX, -1);
  commit(types.SET_PLAYLIST, []);
};

// 删除正在播放列表中的歌曲
export const removerPlayListItem = ({ commit, state }, { list, index }) => {
  let currentIndex = state.currentIndex;
  if (index < state.currentIndex || list.length === state.currentIndex) {
    currentIndex--;
    commit(types.SET_CURRENTINDEX, currentIndex);
  }
  commit(types.SET_PLAYLIST, list);
  if (!list.length) {
    commit(types.SET_PLAYER_STATE, false);
  } else {
    commit(types.SET_PLAYER_STATE, true);
  }
};
