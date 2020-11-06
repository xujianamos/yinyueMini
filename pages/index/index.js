// pages/index/index.js
import request from '../../server/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    bannerList: [],
    // 推荐数据
    recommendList: [],
    // 排行榜数据
    toplist: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let bannerListData = await request('/banner', {
      type: 2
    })
    let recommendListData = await request('/personalized', {
      limit: 10
    })
    // 循环发送请求
    let index = 0
    let resultArr = []
    while (index < 5) {
      let topListData = await request('/top/list', {
        idx: index++
      })
      let topListItem = {
        name: topListData.playlist.name,
        tracks: topListData.playlist.tracks.slice(0, 3)
      }
      resultArr.push(topListItem)
      // 首先将第一个数据渲染的页面上,解决白屏问题
      if (index === 1) {
        this.setData({
          toplist: resultArr
        })
      }
    }
    console.log(recommendListData);

    this.setData({
      bannerList: bannerListData.banners,
      recommendList: recommendListData.result,
      toplist: resultArr
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