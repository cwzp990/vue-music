# vue-music

这个是用vue仿写网易云移动端，虽然github上网易云项目茫茫多，谁让这是我能找到api最多的项目呢

原计划仿写所有的页面，碍于网易的接口有限，实现页面也有限

不推荐pc端访问，会有适配问题（pc端需打开开发者模式，模拟移动端访问）

另外，本项目大量使用promise、flex布局等，可能低版本浏览器不兼容，推荐使用chrome或在移动端浏览器里访问

欢迎issue，pr，star or follow！我将持续更新维护这个项目

# 部分效果截图

#工具&技术栈
vue + vux + + vue-router + vuex + axios + scss

#使用
本项目借助[https://github.com/Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi "Binaryify")的node项目代理获取网易云接口，所以你可能需要先clone此项目才能使用本项目，步骤如下：

$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git

$ npm install

$ node app.js

然后是clone本项目，下载依赖后运行
$ git clone https://github.com/cwzp990/vue-music.git

$ npm install

$ npm run dev

#实现功能

##发现音乐
音乐 已实现

私人fm 待开发

每日推荐 待开发

歌单 已实现

排行榜 已实现

热门歌手 已实现

歌手详情 已实现

首页歌单列表 已实现

歌单详情 已实现

播放功能 已实现

搜索功能 已实现

视频 api有问题，正在寻找解决办法

电台 待开发

##我的音乐
登录后可以获取到歌单列表

##朋友
动态 api有问题，正在寻找解决办法

附近 待开发
##账号
登录
