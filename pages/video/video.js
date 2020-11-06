// pages/video/video.js
import request from '../../server/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],//导航标签数据
    navId: 0,
    videoList: [],//视频列表数据
    videoContent:null,//上一个播放的视频实例
    videoId:''
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
    wx.hideLoading()
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
    let navId = event.currentTarget.id+0
    this.setData({
      navId: navId,
      videoList:[]
    })
    wx.showLoading({
      title: '正在加载中',
    })
    // 动态获取当前导航对应的视频数据
    this.getvideoList(this.data.navId)
  },
  // 点击播放/继续播放
  // 解决单个播放
  handlePlay(event){
    let vid=event.currentTarget.id
    // 关闭上一个视频
    // this.vid!==vid&&this.videoContent&&this.videoContent.stop()
    // this.vid=vid

    // 更新data中videoid的状态数据
    this.setData({
      videoId:vid
    })
    // 创建控制video标签的实例对象
    this.videoContent=wx.createVideoContext(vid)
    this.videoContent.play()
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