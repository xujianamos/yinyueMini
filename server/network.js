import Base from './baseURL'
export default (url,data={},method='GET')=>{
  return new Promise((resolve,reject)=>{
    console.log(Base);
    
    wx.request({
      url: Base.baseurl+url,
      data,
      method,
      success:(res)=>{
        resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })

}