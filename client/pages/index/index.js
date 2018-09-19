//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    sptcc:"查询上海公交卡余额"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
  },
  onGotUserInfo(e){
    // e.detail 跟 wx.getUserInfo()获取的用户信息是一样的
    const { encryptedData, iv, rawData, signature, userInfo } = e.detail;
    this.setData({
      userInfo,
    });
    wx.login({
      timeout: 3000,
      success: res => {
        const code = res.code;
        console.log('params ', JSON.stringify({
          code, encryptedData, iv
        }));
        wx.request({
          url: `https://www.daozhao.com.cn/users/wxLogin`, // 我们的服务端地址
          method: 'POST',
          data: {
            code, encryptedData, iv
          },
          success: res => {
            // res.data 为服务端正确登录后签发的 JWT
            console.log('success ', res);
            wx.setStorageSync('auth', res.data);
          }
        })
      }
    });
  },
  bindSptccTap: function() {
    wx.navigateTo({
      url: '../helper/helper'
    })
  }
})
