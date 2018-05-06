const API_ROOT = 'http://localhost:3000'

const apiMusic = {
  loginCellphone: '/login/cellphone', // 手机登陆
  banner: '/banner',
  userPlaylist: '/user/playlist', // 获取用户歌单
  playlistDetail: '/playlist/detail', // 获取歌单详情
  musicUrl: '/music/url', // 获取音乐url
  search: '/search', // 搜素音乐
  hotKeys: '/search/hot', // 热搜
  lyric: '/lyric', // 获取歌词
  comment: '/comment', // 获取评论
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
  topPlaylist: '/top/playlist', //  歌单(网友精选歌单
  newAlbum: '/top/albums', // 新碟上架
  topArtists: '/top/artists', //  热门歌手
  topList: '/top/list', //  音乐排行榜
  personalized: '/personalized', //  推荐歌单
  privatecontent: '/personalized/privatecontent', // 独家放送
  personalizedMv: '/personalized/mv', // 推荐MV
  newSong: '/personalized/newsong', // 推荐音乐
  djProgram: '/personalized/djprogram', // 推荐电台
  mv: '/mv', // 获取mv数据
  simiMv: '/simi/mv', // 获取相似mv
  mvComment: '/comment/mv', // 获取mv评论
  playlistComment: '/comment/playlist', // 获取歌单评论
  albumComment: '/comment/album', // 获取专辑评论
  artistMv: '/artist/mv' // 获取歌手MV
}

export const LoginCellphoneResource = API_ROOT.concat(apiMusic.loginCellphone)
export const Banner = API_ROOT.concat(apiMusic.banner)
export const UserPlaylistResource = API_ROOT.concat(apiMusic.userPlaylist)
export const PlaylistDetailResource = API_ROOT.concat(apiMusic.playlistDetail)
export const MusicUrlResource = API_ROOT.concat(apiMusic.musicUrl)
export const SearchResource = API_ROOT.concat(apiMusic.search)
export const HotKeys = API_ROOT.concat(apiMusic.hotKeys)
export const LyricResource = API_ROOT.concat(apiMusic.lyric)
export const CommentResource = API_ROOT.concat(apiMusic.comment)
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
export const TopPlaylistResource = API_ROOT.concat(apiMusic.topPlaylist)
export const NewAlbumResource = API_ROOT.concat(apiMusic.newAlbum)
export const TopArtistsResource = API_ROOT.concat(apiMusic.topArtists)
export const TopListResource = API_ROOT.concat(apiMusic.topList)
export const PersonalizedResource = API_ROOT.concat(apiMusic.personalized)
export const PrivatecontentResource = API_ROOT.concat(apiMusic.privatecontent)
export const PersonalizedMvResource = API_ROOT.concat(apiMusic.personalizedMv)
export const NewSongResource = API_ROOT.concat(apiMusic.newSong)
export const DjProgramResource = API_ROOT.concat(apiMusic.djProgram)
export const MvResource = API_ROOT.concat(apiMusic.mv)
export const SimiMvResource = API_ROOT.concat(apiMusic.simiMv)
export const MvCommentResource = API_ROOT.concat(apiMusic.mvComment)
export const PlaylistCommentResource = API_ROOT.concat(apiMusic.playlistComment)
export const AlbumCommentResource = API_ROOT.concat(apiMusic.albumComment)
export const ArtistMvResource = API_ROOT.concat(apiMusic.artistMv)
