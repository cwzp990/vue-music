# vue-music

此项目原先是为学习 Vue 而创建的，之后想在学习过程中加以实践。ui 仿照网易云，于是就做了一个 Vue 的网易云客户端，网上也有类似的项目。看了一下都挺不错的，于是就想自己做一个试试。

项目基于 Vue+VueRouter+Vuex+Vux+Axios+Scss+一些常见的库，另外本项目大量使用 es6 语法，若想得到更好的体验，推荐使用 chrome 浏览器进行浏览

因域名及服务器到期，不能提供线上预览，非常抱歉

## 安装步骤

**首先安装网易云 node api**

1. git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

2. npm install

3. node app.js

**首先需要安装本项目**

1. git clone https://github.com/cwzp990/vue-music.git

2. npm install

3. npm run dev

再次感谢[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)提供的网易云 api 接口！

## 项目目录

├─build-----------------------------------webpack 配置
├─config----------------------------------配置目录
├─src-------------------------------------主目录
│ ├─api---------------------------------api 统一接口
│ ├─assets------------------------------静态资源
│ ├─components--------------------------可复用的组件
│ │ ├─bubble--------------------------下拉刷新气泡
│ │ ├─comment-------------------------评论组件
│ │ │ └─children
│ │ ├─event-list----------------------动态列表
│ │ ├─fans-list-----------------------粉丝列表
│ │ ├─footer-guide--------------------尾部导航栏
│ │ ├─header--------------------------头部导航栏
│ │ ├─list-details--------------------歌单列表详情
│ │ ├─loading-------------------------加载弹窗
│ │ ├─player--------------------------播放器组件
│ │ ├─popupmenu-----------------------下拉弹框组件
│ │ ├─progress-bar--------------------进度条组件
│ │ ├─recommend-list------------------主页推荐列表
│ │ ├─scroll--------------------------局部滚动组件
│ │ ├─search--------------------------头部搜索组件
│ │ ├─singer--------------------------歌手组件
│ │ │ └─children
│ │ ├─song-list-----------------------歌单组件
│ │ │ └─children
│ │ ├─svg-icon------------------------svg 组件
│ │ ├─tag-box-------------------------歌单分类组件(正在完善)
│ │ ├─userinfo------------------------用户信息
│ │ └─video-player--------------------MV 组件
│ ├─icons-------------------------------svg 图标
│ │ └─svg
│ ├─pages-------------------------------主页面
│ │ ├─account-------------------------账户页面
│ │ ├─home----------------------------发现页面
│ │ │ └─children
│ │ ├─layout--------------------------布局容器
│ │ ├─login---------------------------登录页面
│ │ ├─mine----------------------------我的页面
│ │ ├─social--------------------------社交页面
│ │ └─video---------------------------MV 页面
│ │ └─children
│ ├─router------------------------------VueRouter
│ ├─store-------------------------------Vuex
│ ├─style-------------------------------样式
│ └─utils-------------------------------常用 js 函数封装
└─static

## 功能介绍

### 歌单 评论

- 真实线上歌单，没有你找不到的歌单

- 看到真实歌单你就不想看看歌单/ 歌曲评论吗

- 看到评论了你就不想看看评论人的信息吗

### 登陆 每日推荐歌曲

- 你可以登录你的网易云账号

- 登录后可以查看自己的歌单信息

### 搜索

- 哇, 兄弟, 你想听这首歌? 点击上面的搜索啊

- 什么? 你想知道最近什么流行? ===>>> 排行榜/ 精品歌单!

### 播放

- 音乐播放

- 查看音乐播放列表

- 查看歌曲评论

### what's next ？

- 观看 MV

- 我的动态/别人的动态

- 关注我的人/ 我关注的人

- 歌手页面

- 播放界面优化...由于从搜索进入的播放界面和歌单进入的播放节目后台传的格式不同，没办法共用一个界面, 那么可以考虑做一个新的样式!

- 主播电台（正在完善）

- loading 状态（正在完善）

- 上拉加载（正在整理思路）

## 项目截图

**部分界面截图**

![all](https://github.com/cwzp990/vue-music/blob/master/src/assets/gifs/all.gif)

**首页截图**

![index](https://github.com/cwzp990/vue-music/blob/master/src/assets/gifs/index.gif)

**发现界面**

![discover](https://github.com/cwzp990/vue-music/blob/master/src/assets/gifs/discover.gif)

**我的列表界面**

![my](https://github.com/cwzp990/vue-music/blob/master/src/assets/gifs/my.gif)

**歌单界面**

![songlist](https://github.com/cwzp990/vue-music/blob/master/src/assets/gifs/songlist.gif)

**排行榜界面**

![rank](https://github.com/cwzp990/vue-music/blob/master/src/assets/gifs/rank.gif)

**搜索歌曲界面**

![search](https://github.com/cwzp990/vue-music/blob/master/src/assets/gifs/search.gif)

**歌手界面**

![singer](https://github.com/cwzp990/vue-music/blob/master/src/assets/gifs/singer.gif)

## 我学到了什么？

- 熟练进行移动端布局，本项目大量使用了 flex + rem 布局，css 能力得到了很大突破

- 熟悉 webpack 配置，本项目添加了 svg-sprite-loader，借助 webpack 做到按需加载

- 对 Vue 的数据流有了更加深入的了解

- 熟悉使用 Vue 全家桶+Vux+scss 进行开发，封装了自己的 mixin.scss css 库

- 学会在后端返回的数据结构不符合预期时，自己构建数据结构
