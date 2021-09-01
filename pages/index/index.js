// index.js
// 获取应用实例
const app = getApp()

Page({
  data:({
    id: null,
    articles: [],
    articlesTitles: [],
    articleContents: [],
    articleInfo: true,
  }),
  ToArticle:function(event){
    this.setData({
      id: event.currentTarget.dataset.message.id
    }),
    wx.navigateTo({
      url: `/pages/article/article?id=${this.data.id}`,
    })
  },
  onLoad(){
    let PageObj = this
    wx.request({
      url: 'https://api.glumi.cn/api/Article.php', 
      method: 'GET',
      data: {
        data: 'getAllArticle'
      },
      header: {
        'content-type': 'application/json' 
      },
      success(res){
        let articlesTitle = Array();
        let articlesContent = Array();
        for(let i =0;i<res.data.length;i++){
          let titleHTML = res.data[i].Title
          let contentHTML = res.data[i].Content
          let title = String(titleHTML).replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
          let content = String(contentHTML).replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
          title = title.slice(0,20)
          content = content.slice(0,60)
          articlesTitle[i] = JSON.stringify(title)
          articlesContent[i] = JSON.stringify(content)
        }
        PageObj.setData({
          articles: res.data,
          articlesTitles: articlesTitle,
          articleContents: articlesContent
        })
      }
    })
  }
})
