import { getRequest } from '../utils/fetch'

import {
  LoginCellphoneResource,
  Banner,
  UserPlaylistResource,
  PlaylistDetailResource,
  MusicUrlResource,
  SearchResource,
  LyricResource,
  CommentResource,
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
  TopPlaylistResource,
  NewAlbumResource,
  TopArtistsResource,
  TopListResource,
  PersonalizedResource,
  PrivatecontentResource,
  PersonalizedMvResource,
  NewSongResource,
  DjProgramResource,
  MvResource,
  SimiMvResource,
  MvCommentResource,
  PlaylistCommentResource,
  AlbumCommentResource,
  ArtistMvResource
} from './resource'

export const api = {
  // 获取个人信息，注入cookies
  getLoginCellphoneResource (mobile, password) {
    return getRequest(LoginCellphoneResource, {
      params: {
        phone: mobile || '',
        password: password || ''
      }
    })
  },

  getBanner () {
    return getRequest(Banner)
  },

  // 获取用户歌单, uid为用户id，登陆接口处获取
  getUserPlaylistResource (id) {
    return getRequest(UserPlaylistResource, {
      params: {
        uid: id
      }
    })
  },

  // 获取歌单详情, id 为歌单id
  getPlaylistDetailResource (id) {
    return getRequest(PlaylistDetailResource, {
      params: {
        id: id
      }
    })
  },

  // 获取音乐url， id为单曲id
  getMusicUrlResource (id) {
    return getRequest(MusicUrlResource, {
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
    return getRequest(SearchResource, {
      params: {
        keywords: keywords,
        type: type,
        offset: offset || 0,
        limit: limit
      }
    })
  },

  // 获取歌词， id为单曲id
  getLyricResource (id) {
    return getRequest(LyricResource, {
      params: {
        id: id
      }
    })
  },

  // 获取评论， id为单曲id
  getCommentResource (id) {
    return getRequest(CommentResource, {
      params: {
        id: id
      }
    })
  },

  // 获取专辑内容， id为专辑id
  getAlbumResource (id) {
    return getRequest(AlbumResource, {
      params: {
        id: id
      }
    })
  },

  // 获取歌手单曲列表， id为歌手id
  getArtistsResource (id) {
    return getRequest(ArtistsResource, {
      params: {
        id: id
      }
    })
  },

  // 获取歌手专辑列表， id为歌手id
  getArtistAlbumResource (id, size) {
    return getRequest(ArtistAlbumResource, {
      params: {
        id: id,
        limit: 30 || size
      }
    })
  },

  // 获取歌手信息， id为歌手id
  getArtistDescResource (id) {
    return getRequest(ArtistDescResource, {
      params: {
        id: id
      }
    })
  },

  // 获取每日推荐歌曲
  getRecommendResource () {
    return getRequest(RecommendResource)
  },

  // 获取每日推荐歌单
  getRecommendSongsResource () {
    return getRequest(RecommendSongsResource)
  },

  // 获取私人FM， id为歌曲id
  getPersonalFmResource () {
    return getRequest(PersonalFmResource)
  },

  /**
   * @method 签到
   * @param type 0为安卓签到，1为web/pc签到， 默认为安卓
   */
  getDailySigninResource (type) {
    return getRequest(DailySigninResource, {
      params: {
        type: type
      }
    })
  },

  // 添加喜欢歌曲， id为单曲id
  getLikeMusicResource (id) {
    return getRequest(LikeMusicResource, {
      params: {
        id: id
      }
    })
  },

  // 将单曲从私人FM中移除至垃圾桶， id为单曲id
  getFmTrashResource (id) {
    return getRequest(FmTrashResource, {
      params: {
        id: id
      }
    })
  },

  /**
   * @method 获取网友精选歌单
   * @param order new:  最新, hot:  最热
   * @param limit 每次请求返回列表条数，默认50
   * @param offset  偏移量 默认为0
   * @returns 返回歌单列表
   */
  getTopPlaylistResource (order, limit, offset) {
    return getRequest(TopPlaylistResource, {
      params: {
        order: order || 'hot',
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
    return getRequest(NewAlbumResource, {
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
    return getRequest(TopArtistsResource, {
      params: {
        limit: limit || 50,
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
    return getRequest(TopListResource, {
      params: {
        idx: idx
      }
    })
  },

  // 获取推荐歌单
  getPersonalized () {
    return getRequest(PersonalizedResource)
  },

  // 获取独家放送
  getPrivatecontent () {
    return getRequest(PrivatecontentResource)
  },

  // 获取推荐MV
  getPersonalizedMv () {
    return getRequest(PersonalizedMvResource)
  },

  // 获取最新音乐
  getNewSong () {
    return getRequest(NewSongResource)
  },

  // 获取推荐MV
  getDjProgram () {
    return getRequest(DjProgramResource)
  },
  // 获取mv数据
  getMvResource (id) {
    return getRequest(MvResource, {
      params: {
        mvid: id
      }
    })
  },
  // 获取mv数据
  getSimiMvResource (id) {
    return getRequest(SimiMvResource, {
      params: {
        mvid: id
      }
    })
  },
  // 获取mv数据
  getMvCommentResource (id) {
    return getRequest(MvCommentResource, {
      params: {
        id: id
      }
    })
  },
  // 获取歌单评论
  getPlaylistCommentResource (id) {
    return getRequest(PlaylistCommentResource, {
      params: {
        id: id
      }
    })
  },
  // 获取专辑评论
  getAlbumCommentResource (id) {
    return getRequest(AlbumCommentResource, {
      params: {
        id: id
      }
    })
  },
  // 获取歌手MV
  getArtistMvResource (id) {
    return getRequest(ArtistMvResource, {
      params: {
        id: id
      }
    })
  }
}
