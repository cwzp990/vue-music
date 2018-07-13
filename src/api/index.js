import axios from 'axios'

import {
  LoginCellphoneResource,
  UserDetails,
  UserInfos,
  UserEvent,
  Banner,
  UserPlaylistResource,
  PlaylistDetailResource,
  MusicUrlResource,
  SearchResource,
  HotKeys,
  LyricResource,
  CommentResource,
  CommentLiked,
  AlbumResource,
  ArtistsResource,
  ArtistAlbumResource,
  ArtistDescResource,
  RecommendResource,
  RecommendSongsResource,
  PersonalFmResource,
  DailySigninResource,
  LikeMusicResource,
  FmTrashResource,
  CategoryPlaylist,
  TopPlaylistResource,
  NewAlbumResource,
  TopArtistsResource,
  TopListResource,
  PersonalizedResource,
  HighQuality,
  PrivatecontentResource,
  PersonalizedMvResource,
  NewSongResource,
  DjProgramResource,
  DjRecommend,
  DjClassify,
  MvResource,
  playMV,
  SimiMvResource,
  MvCommentResource,
  PlaylistCommentResource,
  AlbumCommentResource,
  ArtistMvResource,
  MVRank,
  UserFollows,
  UserFans
} from './resource'

export const api = {
  // 获取个人信息，注入cookies
  getLoginCellphoneResource (mobile, password) {
    return axios.get(LoginCellphoneResource, {
      params: {
        phone: mobile || '',
        password: password || ''
      }
    })
  },

  getUserDetails (id) {
    return axios.get(UserDetails, {
      params: {
        uid: id
      }
    })
  },

  // 获取用户信息，歌单、收藏、mv、dj数量
  getUserInfos () {
    return axios.get(UserInfos)
  },

  getUserEvent (id) {
    return axios.get(UserEvent, {
      params: {
        uid: id
      }
    })
  },

  getBanner () {
    return axios.get(Banner)
  },

  // 获取用户歌单, uid为用户id，登陆接口处获取
  getUserPlaylistResource (id) {
    return axios.get(UserPlaylistResource, {
      params: {
        uid: id
      }
    })
  },

  // 获取歌单详情, id 为歌单id
  getPlaylistDetailResource (id) {
    return axios.get(PlaylistDetailResource, {
      params: {
        id: id
      }
    })
  },

  // 获取音乐url， id为单曲id
  getMusicUrlResource (id) {
    return axios.get(MusicUrlResource, {
      params: {
        id: id
      }
    })
  },

  /**
   * @method 搜索音乐
   * @param keywords 关键词
   * @param type 1为单曲，10为专辑， 100为歌手， 1000为歌单， 1002为用户
   * @param limit 返回数据限制
   * @param offset 数据偏移量
   * @returns response  数据返回值
   */
  getSearchResource (keywords, type, limit, offset) {
    return axios.get(SearchResource, {
      params: {
        keywords: keywords,
        type: type || 1,
        offset: offset || 0,
        limit: limit || 10
      }
    })
  },

  getHotKeys () {
    return axios.get(HotKeys)
  },

  // 获取歌词， id为单曲id
  getLyricResource (id) {
    return axios.get(LyricResource, {
      params: {
        id: id
      }
    })
  },

  // 获取评论， id为单曲id
  getCommentResource (id, limit) {
    return axios.get(CommentResource, {
      params: {
        id: id,
        limit: limit || 30
      }
    })
  },

  // 评论点赞
  getCommentLiked (songid, cid, liked, type) {
    return axios.get(CommentLiked, {
      params: {
        id: songid,
        cid: cid,
        t: liked,
        type: type
      }
    })
  },

  // 获取专辑内容， id为专辑id
  getAlbumResource (id) {
    return axios.get(AlbumResource, {
      params: {
        id: id
      }
    })
  },

  // 获取歌手单曲列表， id为歌手id
  getArtistsResource (id) {
    return axios.get(ArtistsResource, {
      params: {
        id: id
      }
    })
  },

  // 获取歌手专辑列表， id为歌手id
  getArtistAlbumResource (id, size) {
    return axios.get(ArtistAlbumResource, {
      params: {
        id: id,
        limit: 50 || size
      }
    })
  },

  // 获取歌手信息， id为歌手id
  getArtistDescResource (id) {
    return axios.get(ArtistDescResource, {
      params: {
        id: id
      }
    })
  },

  // 获取每日推荐歌曲
  getRecommendResource () {
    return axios.get(RecommendResource)
  },

  // 获取每日推荐歌单
  getRecommendSongsResource () {
    return axios.get(RecommendSongsResource)
  },

  // 获取私人FM， id为歌曲id
  getPersonalFmResource () {
    return axios.get(PersonalFmResource)
  },

  /**
   * @method 签到
   * @param type 0为安卓签到，1为web/pc签到， 默认为安卓
   */
  getDailySigninResource (type) {
    return axios.get(DailySigninResource, {
      params: {
        type: type
      }
    })
  },

  // 添加喜欢歌曲， id为单曲id
  getLikeMusicResource (id) {
    return axios.get(LikeMusicResource, {
      params: {
        id: id
      }
    })
  },

  // 将单曲从私人FM中移除至垃圾桶， id为单曲id
  getFmTrashResource (id) {
    return axios.get(FmTrashResource, {
      params: {
        id: id
      }
    })
  },

  // 歌单分类
  getCategoryPlayList () {
    return axios.get(CategoryPlaylist)
  },

  /**
   * @method 获取网友精选歌单
   * @param order new:  最新, hot:  最热
   * @param limit 每次请求返回列表条数，默认50
   * @param offset  偏移量 默认为0
   * @returns 返回歌单列表
   */
  getTopPlaylistResource (tag, order, limit, offset) {
    return axios.get(TopPlaylistResource, {
      params: {
        order: order || 'hot',
        cat: tag,
        limit: limit || 50,
        offset: offset || 0
      }
    })
  },

  /**
   * @method 获取新碟上架列表
   * @param limit
   * @param offset
   * @returns 返回新碟列表
   */
  getNewAlbumResource (limit, offset) {
    return axios.get(NewAlbumResource, {
      params: {
        limit: limit || 50,
        offset: offset || 0
      }
    })
  },

  /**
   * @method 获取热门歌手数据
   * @param limit
   * @param offset
   * @returns 返回热门歌手列表
   */
  getTopArtistsResource (limit, offset) {
    return axios.get(TopArtistsResource, {
      params: {
        limit: limit || 100,
        offset: offset || 0
      }
    })
  },

  /**
   * @method 获取音乐排行榜
   * @param idx 0.云音乐新歌排行榜  1.云音乐热歌排行榜  2.网易原创歌曲排行榜
   * 3. 云音乐飙升榜  4.云音乐电音榜  5.UK排行榜周榜   6.美国billboard周榜
   * 7. KTV嗨榜   8.iTunes榜   9.Hit FM Top榜   10.日本Oricon周榜
   * 11.韩国Melon排行榜周榜   12.韩国Mnet排行榜周榜   13.韩国Melon原生周榜
   * 14.中国Top排行榜(港台榜) 15.中国Top排行榜(内地榜)  16.香港电台中文歌曲龙虎榜
   * 17.华语金曲榜 18.中国嘻哈榜  19.法国NRJ  EuroHot 30周榜  20.台湾Hito排行榜
   * 21.Beatport全球电子舞曲榜
   */
  getTopListResource (idx) {
    return axios.get(TopListResource, {
      params: {
        idx: idx
      }
    })
  },

  // 获取推荐歌单
  getPersonalized () {
    return axios.get(PersonalizedResource)
  },

  // 获取精品歌单
  getHighQuality (limit) {
    return axios.get(HighQuality, {
      params: {
        limit: limit || 30
      }
    })
  },

  // 获取独家放送
  getPrivatecontent () {
    return axios.get(PrivatecontentResource)
  },

  // 获取推荐MV
  getPersonalizedMv () {
    return axios.get(PersonalizedMvResource)
  },

  // 获取最新音乐
  getNewSong () {
    return axios.get(NewSongResource)
  },

  // 获取推荐DJ
  getDjProgram () {
    return axios.get(DjProgramResource)
  },
  // 获取推荐DJ-页面
  getDjRecommend () {
    return axios.get(DjRecommend)
  },
  getDjClassify () {
    return axios.get(DjClassify)
  },
  // 获取mv数据
  getMvResource (id) {
    return axios.get(MvResource, {
      params: {
        mvid: id
      }
    })
  },
  // 获取MV播放地址
  getMVPlay (url) {
    return axios.get(playMV, {
      params: {
        url: url
      }
    })
  },
  getMVRank (limit) {
    return axios.get(MVRank, {
      params: {
        limit: limit || 30
      }
    })
  },

  // 获取相似mv数据
  getSimiMvResource (id) {
    return axios.get(SimiMvResource, {
      params: {
        mvid: id
      }
    })
  },
  // 获取mv评论
  getMvCommentResource (id) {
    return axios.get(MvCommentResource, {
      params: {
        id: id
      }
    })
  },
  // 获取歌单评论
  getPlaylistCommentResource (id) {
    return axios.get(PlaylistCommentResource, {
      params: {
        id: id
      }
    })
  },
  // 获取专辑评论
  getAlbumCommentResource (id) {
    return axios.get(AlbumCommentResource, {
      params: {
        id: id
      }
    })
  },
  // 获取歌手MV
  getArtistMvResource (id) {
    return axios.get(ArtistMvResource, {
      params: {
        id: id
      }
    })
  },
  // 获取用户关注列表
  getUserFollows (id) {
    return axios.get(UserFollows, {
      params: {
        uid: id
      }
    })
  },
  getUserFans (id) {
    return axios.get(UserFans, {
      params: {
        uid: id
      }
    })
  }
}
