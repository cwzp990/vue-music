const initialState = {
  mode: 0,
  showPlayer: false, //Player显示状态
  showList: false, // 播放列表状态
  showModal: false, // loading状态
  playerState: false, //Player播放状态
  playList: [], //播放列表
  currentIndex: -1, //当前音乐索引
  currentMusic: {}, //当前音乐
  singer: {}, //当前歌手
  userInfo: null,
  category: "华语" //当前歌单类型
};

export default initialState;
