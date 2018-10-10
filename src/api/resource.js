const API_ROOT = 'http://localhost:3000'

const apiMusic = {
  loginCellphone: '/login/cellphone', // 手机登陆
  userDetails: '/user/detail', // 用户详情
  songDetails: '/song/detail', // 歌曲详情
  userInfos: '/user/subcount', // 用户信息
  banner: '/banner',
  userPlaylist: '/user/playlist', // 获取用户歌单
  userEvent: '/user/event', // 获取用户动态
  playlistDetail: '/playlist/detail', // 获取歌单详情
  musicUrl: '/music/url', // 获取音乐url
  search: '/search', // 搜素音乐
  hotKeys: '/search/hot', // 热搜
  lyric: '/lyric', // 获取歌词
  getComment: '/comment/music', // 获取评论
  sendComment: '/comment', // 写评论
  liked: '/comment/like', // 评论点赞
  album: '/album', //  获取专辑内容
  artists: '/artists', // 获取歌手单曲列表
  artistAlbum: '/artist/album', // 获取歌手专辑列表
  artistDesc: '/artist/desc', //  获取歌手信息
  recommendResource: '/recommend/resource', // 获取每日推荐歌单（用户级）
  recommendSongs: '/recommend/songs', // 获取每日推荐歌曲（用户级）
  personalFm: '/personal_fm', // 私人FM(用户级
  dailySignin: '/daily_signin', // 签到(用户级
  likeMusic: '/like', // 添加喜欢的音乐(用户级
  fmTrash: '/fm_trash', // 将音乐从私人FM中移除至垃圾桶
  categoryPlaylist: '/playlist/catlist', // 歌单分类
  topPlaylist: '/top/playlist', //  歌单(网友精选歌单
  newAlbum: '/top/albums', // 新碟上架
  topArtists: '/top/artists', //  热门歌手
  topList: '/top/list', //  音乐排行榜
  personalized: '/personalized', //  推荐歌单
  highquality: '/top/playlist/highquality', // 精品歌单
  privatecontent: '/personalized/privatecontent', // 独家放送
  personalizedMv: '/personalized/mv', // 推荐MV
  newSong: '/personalized/newsong', // 推荐音乐
  djProgram: '/personalized/djprogram', // 推荐电台
  djRecommend: '/dj/recommend', // 推荐电台
  djClassify: '/dj/catelist', // 电台分类
  mv: '/mv', // 获取mv数据
  playMV: '/mv/url',
  topMv: '/top/mv', // 获取mv排行
  simiMv: '/simi/mv', // 获取相似mv
  mvComment: '/comment/mv', // 获取mv评论
  playlistComment: '/comment/playlist', // 获取歌单评论
  albumComment: '/comment/album', // 获取专辑评论
  artistMv: '/artist/mv', // 获取歌手MV
  userFollows: '/user/follows', // 获取用户关注列表
  userFans: '/user/followeds' // 获取用户粉丝列表
}

export const LoginCellphoneResource = API_ROOT.concat(apiMusic.loginCellphone)
export const UserDetails = API_ROOT.concat(apiMusic.userDetails)
export const SongDetails = API_ROOT.concat(apiMusic.songDetails)
export const UserInfos = API_ROOT.concat(apiMusic.userInfos)
export const Banner = API_ROOT.concat(apiMusic.banner)
export const UserPlaylistResource = API_ROOT.concat(apiMusic.userPlaylist)
export const UserEvent = API_ROOT.concat(apiMusic.userEvent)
export const PlaylistDetailResource = API_ROOT.concat(apiMusic.playlistDetail)
export const MusicUrlResource = API_ROOT.concat(apiMusic.musicUrl)
export const SearchResource = API_ROOT.concat(apiMusic.search)
export const HotKeys = API_ROOT.concat(apiMusic.hotKeys)
export const LyricResource = API_ROOT.concat(apiMusic.lyric)
export const CommentResource = API_ROOT.concat(apiMusic.getComment)
export const sendComment = API_ROOT.concat(apiMusic.sendComment)
export const CommentLiked = API_ROOT.concat(apiMusic.liked)
export const AlbumResource = API_ROOT.concat(apiMusic.album)
export const ArtistsResource = API_ROOT.concat(apiMusic.artists)
export const ArtistAlbumResource = API_ROOT.concat(apiMusic.artistAlbum)
export const ArtistDescResource = API_ROOT.concat(apiMusic.artistDesc)
export const RecommendResource = API_ROOT.concat(apiMusic.recommendResource)
export const RecommendSongsResource = API_ROOT.concat(apiMusic.recommendSongs)
export const PersonalFmResource = API_ROOT.concat(apiMusic.personalFm)
export const DailySigninResource = API_ROOT.concat(apiMusic.dailySignin)
export const LikeMusicResource = API_ROOT.concat(apiMusic.likeMusic)
export const FmTrashResource = API_ROOT.concat(apiMusic.fmTrash)
export const CategoryPlaylist = API_ROOT.concat(apiMusic.categoryPlaylist)
export const TopPlaylistResource = API_ROOT.concat(apiMusic.topPlaylist)
export const NewAlbumResource = API_ROOT.concat(apiMusic.newAlbum)
export const TopArtistsResource = API_ROOT.concat(apiMusic.topArtists)
export const TopListResource = API_ROOT.concat(apiMusic.topList)
export const PersonalizedResource = API_ROOT.concat(apiMusic.personalized)
export const HighQuality = API_ROOT.concat(apiMusic.highquality)
export const PrivatecontentResource = API_ROOT.concat(apiMusic.privatecontent)
export const PersonalizedMvResource = API_ROOT.concat(apiMusic.personalizedMv)
export const NewSongResource = API_ROOT.concat(apiMusic.newSong)
export const DjProgramResource = API_ROOT.concat(apiMusic.djProgram)
export const DjRecommend = API_ROOT.concat(apiMusic.djRecommend)
export const DjClassify = API_ROOT.concat(apiMusic.djClassify)
export const MvResource = API_ROOT.concat(apiMusic.mv)
export const playMV = API_ROOT.concat(apiMusic.playMV)
export const MVRank = API_ROOT.concat(apiMusic.topMv)
export const SimiMvResource = API_ROOT.concat(apiMusic.simiMv)
export const MvCommentResource = API_ROOT.concat(apiMusic.mvComment)
export const PlaylistCommentResource = API_ROOT.concat(apiMusic.playlistComment)
export const AlbumCommentResource = API_ROOT.concat(apiMusic.albumComment)
export const ArtistMvResource = API_ROOT.concat(apiMusic.artistMv)
export const UserFollows = API_ROOT.concat(apiMusic.userFollows)
export const UserFans = API_ROOT.concat(apiMusic.userFans)
