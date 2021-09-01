var WxParse = require('../../lib/wxParse/wxParse');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    Title: null,
    Content: null,
    articles: [],
    img: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pageObj = this
    pageObj.setData({
      id: options.id
    })
    wx.request({
      url: 'https://api.glumi.cn/api/Article.php',
      method: 'GET',
      header: {
        'content-type': 'application/json' 
      },
      data: {
        data: 'getAllArticle'
      },
      success(res){
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].id==pageObj.data.id){
            pageObj.setData({
              Title: res.data[i].Title,
              Content: res.data[i].Content,
              img: res.data[i].imgURL
            })
            WxParse.wxParse('article', 'html', res.data[i].Content, pageObj, 5);
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})