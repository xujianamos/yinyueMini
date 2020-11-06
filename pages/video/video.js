// pages/video/video.js
import request from '../../server/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],//导航标签数据
    navId: 0,
    videoList: []//视频列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getvideoGroupListData()
    
  },
  // 获取导航数据
  async getvideoGroupListData() {
    let videoGroupListData = await request('/video/group/list')
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0, 14),
      navId: videoGroupListData.data[0].id
    })
  this.getvideoList(this.data.navId)

  },

  // 获取视频列表数据
  async getvideoList(navId) {
    if(!navId)return
    let videoListData = await request('/video/group', { id: navId })
    let index=0
    let videoList=videoListData.datas.map(item=>{
      item.id=index++;
      return item
    })
    console.log(videoListData);

    this.setData({
      videoList
    })

  },
  // 点击切换导航
  changeNav(event) {
    console.log(event);
    let navId = event.currentTarget.id
    this.setData({
      navId: navId + 0
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