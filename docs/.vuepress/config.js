module.exports = {
  title: "ElricTang",
  description: "welcome to ElricTang's Blog!",
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    type: "blog",
    authorAvatar: '/avatar.png',
    subSidebar: 'auto',
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      },
      socialLinks: [     // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/elrictang' },
        { icon: 'reco-bilibili', link: 'https://space.bilibili.com/11892555' },
        { icon: 'reco-juejin', link: 'https://juejin.cn/user/1574156382242414' }
      ]
    },
    nav: [  //导航栏设置
      { text: '主页', link: '/', icon: 'reco-home' },
      { text: '时间线', link: '/timeline/', icon: 'reco-date' },
      { text: '联系', 
        icon: 'reco-message',
        items: [
          { text: 'GitHub', link: 'https://github.com/Tsanfer', icon: 'reco-github' },
          { text: 'CSDN', link: 'https://blog.csdn.net/qq_27961843/', icon: 'reco-csdn' },
          { text: 'BiliBili', link: 'https://space.bilibili.com/12167681', icon: 'reco-bilibili' },
          { text: 'QQ', link: 'tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=1124851454', icon: 'reco-qq' },
        ]
      }
    ],
  },
  sidebar: 'auto',
  search: true,
  searchMaxSuggestions: 10,
}