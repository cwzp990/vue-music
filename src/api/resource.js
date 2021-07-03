const apiMusic = {
  loginCellphone: "/login/cellphone", // 手机登陆
  userDetails: "/user/detail", // 用户详情
  songDetails: "/song/detail", // 歌曲详情
  userInfos: "/user/subcount", // 用户信息
  banner: "/banner",
  userPlaylist: "/user/playlist", // 获取用户歌单
  userEvent: "/user/event", // 获取用户动态
  playlistDetail: "/playlist/detail", // 获取歌单详情
  musicUrl: "/music/url", // 获取音乐url
  search: "/search", // 搜素音乐
  hotKeys: "/search/hot/detail", // 热搜
  lyric: "/lyric", // 获取歌词
  getComment: "/comment/music", // 获取评论
  sendComment: "/comment", // 写评论
  liked: "/comment/like", // 评论点赞
  album: "/album", //  获取专辑内容
  artistCategory: "/artist/list", // 获取歌手分类列表
  artistAlbum: "/artist/album", // 获取歌手专辑列表
  artistDesc: "/artist/desc", //  获取歌手信息
  recommendResource: "/recommend/resource", // 获取每日推荐歌单（用户级）
  recommendSongs: "/recommend/songs", // 获取每日推荐歌曲（用户级）
  personalFm: "/personal_fm", // 私人FM(用户级
  dailySignin: "/daily_signin", // 签到(用户级
  likeMusic: "/like", // 添加喜欢的音乐(用户级
  fmTrash: "/fm_trash", // 将音乐从私人FM中移除至垃圾桶
  categoryPlaylist: "/playlist/catlist", // 歌单分类
  categoryHotPlaylist: "/playlist/hot", // 歌单分类
  topPlaylist: "/top/playlist", //  歌单(网友精选歌单
  newAlbum: "/top/albums", // 新碟上架
  topArtists: "/top/artists", //  热门歌手
  singerHotSong: "/artist/top/song", // 歌手热门50首歌曲
  topList: "/toplist", //  音乐排行榜
  personalized: "/personalized", //  推荐歌单
  highquality: "/top/playlist/highquality", // 精品歌单
  privatecontent: "/personalized/privatecontent", // 独家放送
  personalizedMv: "/personalized/mv", // 推荐MV
  newSong: "/personalized/newsong", // 推荐音乐
  djProgram: "/personalized/djprogram", // 推荐电台
  djRecommend: "/dj/recommend", // 推荐电台
  djClassify: "/dj/catelist", // 电台分类
  mv: "/mv/all", // 获取mv数据
  videolist: "/video/group/list", // 视频标签列表
  playMV: "/mv/url",
  topMv: "/top/mv", // 获取mv排行
  simiMv: "/simi/mv", // 获取相似mv
  mvComment: "/comment/mv", // 获取mv评论
  playlistComment: "/comment/playlist", // 获取歌单评论
  albumComment: "/comment/album", // 获取专辑评论
  artistMv: "/artist/mv", // 获取歌手MV
  userFollows: "/user/follows", // 获取用户关注列表
  userFans: "/user/followeds", // 获取用户粉丝列表
  auth: "/captcha/sent", // 发送验证码
  verify: "/captcha/verify", // 验证验证码
  history: "/user/record", // 用户播放记录
  hotwall: "/comment/hotwall/list" // 云村热评
};

export const LoginCellphoneResource = apiMusic.loginCellphone
export const UserDetails = apiMusic.userDetails
export const SongDetails = apiMusic.songDetails
export const UserInfos = apiMusic.userInfos
export const Banner = apiMusic.banner
export const UserPlaylistResource = apiMusic.userPlaylist
export const UserEvent = apiMusic.userEvent
export const PlaylistDetailResource = apiMusic.playlistDetail
export const MusicUrlResource = apiMusic.musicUrl
export const SearchResource = apiMusic.search
export const HotKeys = apiMusic.hotKeys
export const LyricResource = apiMusic.lyric
export const CommentResource = apiMusic.getComment
export const sendComment = apiMusic.sendComment
export const CommentLiked = apiMusic.liked
export const AlbumResource = apiMusic.album
export const ArtistsResource = apiMusic.artistCategory
export const ArtistAlbumResource = apiMusic.artistAlbum
export const ArtistDescResource = apiMusic.artistDesc
export const RecommendResource = apiMusic.recommendResource
export const RecommendSongsResource = apiMusic.recommendSongs
export const PersonalFmResource = apiMusic.personalFm
export const DailySigninResource = apiMusic.dailySignin
export const LikeMusicResource = apiMusic.likeMusic
export const FmTrashResource = apiMusic.fmTrash
export const CategoryPlaylist = apiMusic.categoryPlaylist
export const CategoryHotPlaylist = apiMusic.categoryHotPlaylist
export const TopPlaylistResource = apiMusic.topPlaylist
export const NewAlbumResource = apiMusic.newAlbum
export const TopArtistsResource = apiMusic.topArtists
export const SingerHotSongResource = apiMusic.singerHotSong
export const TopListResource = apiMusic.topList
export const PersonalizedResource = apiMusic.personalized
export const HighQuality = apiMusic.highquality
export const PrivatecontentResource = apiMusic.privatecontent
export const PersonalizedMvResource = apiMusic.personalizedMv
export const NewSongResource = apiMusic.newSong
export const DjProgramResource = apiMusic.djProgram
export const DjRecommend = apiMusic.djRecommend
export const DjClassify = apiMusic.djClassify
export const MvResource = apiMusic.mv
export const VideoList = apiMusic.videolist
export const playMV = apiMusic.playMV
export const MVRank = apiMusic.topMv
export const SimiMvResource = apiMusic.simiMv
export const MvCommentResource = apiMusic.mvComment
export const PlaylistCommentResource = apiMusic.playlistComment
export const AlbumCommentResource = apiMusic.albumComment
export const ArtistMvResource = apiMusic.artistMv
export const UserFollows = apiMusic.userFollows
export const UserFans = apiMusic.userFans
export const AuthCode = apiMusic.auth
export const verifyAuth = apiMusic.verify
export const userHistory = apiMusic.history
export const hotwallList = apiMusic.hotwall
