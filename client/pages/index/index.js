//index.js
//获取应用实例
import regeneratorRuntime from '../../utils/runtime';
var app = getApp()
const util = require('../../utils/index');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    sptcc: "查询上海公交卡余额",
    listData: [],
    shopStatus: '',
    openid: '',
    openid2: ' '
  },
  async getOpenid(code, detail) {
    const {
      encryptedData,
      iv,
      rawData,
      signature,
    } = detail;
    // 通过后端服务器来请求openid
    const res = await util.http({
      url: `/wxmin/login`, // 我们的服务端地址
      method: 'POST',
      data: {
        code,
        encryptedData,
        iv
      }
    });
    if (util.httpSuccess(res)) { // res.data 为服务端正确登录后签发的 JWT
      console.log('daozhao logion ', res);
      var obj = {};
      obj.openid = res.data.openid;
      obj.expires_in = Date.now() + res.data.expires_in;
      wx.setStorageSync('openidInfo', obj);
      wx.setStorageSync('token', res.data);
    }
  },
  async getDecryptData({
    encryptedData,
    iv
  }) {
    const result = await util.http({
      url: '/wxmin/decryptData',
      method: 'POST',
      data: {
        encryptedData,
        iv
      }
    });
    console.log('getUnionId result', result);
  },
  getUnionId() {
    wx.getUserInfo({
      success: async (res) => {
        console.log('getUnionId', res);
        this.getDecryptData(res);
      }
    });
  },
  checkSessionKeyValidate() {

  },
  async getFormId(event) {
    const res = await util.http({
      url: '/wxmin/storeFormId',
      data: {
        template_id: 'd3NWLnTMLfchQNZPbn1AF2xQ4PHCC7_gbIOKbymk7mk',
        formId: event.detail.formId,
      },
      method: 'POST',
    });
    if (util.httpSuccess(res)) {
      console.log('存储formId成功', res)
    }
  },
  async testSubmitAll() {
    console.log('testSubmitAll');
    const res = await util.http({
      url: '/wxmin/pushAll',
      data: {
        template_id: 'd3NWLnTMLfchQNZPbn1AF2xQ4PHCC7_gbIOKbymk7mk',
      },
      method: 'POST',
    });
    if (util.httpSuccess(res)) {
      console.log('群发成功', res)
    }
  },
  testSubmit(event) {
    console.log('点击');
    const openid = wx.getStorageSync('openidInfo').openid;
    if (openid) {
      this.setData({
        openid: '_openid success' + openid,
      });
      this.sendMsg(openid, event);
    } else {
      this.setData({
        openid: '_openid failed',
      });
    }
  },
  async getAccessToken(openid, event) {
    const self = this;
    const res = await util.http({
      url: '/wxmin/getAccessToken',
      method: 'POST',
    });
    if (util.httpSuccess(res)) {
      console.log('getAccessToken success res', res)
      this.sendMsg(res.data.access_token, openid, event);
    }
  },
  async sendMsg(openid, event) {
    const url = '/wxmin/push';
    let _jsonData = {
      template_id: 'd3NWLnTMLfchQNZPbn1AF2xQ4PHCC7_gbIOKbymk7mk',
      form_id: event.detail.formId,
      touser: openid,
      data: {
        "keyword1": {
          "value": "测试数据一",
          "color": "#173198"
        },
        "keyword2": {
          "value": "测试数据二",
          "color": "#173177"
        },
        "keyword3": {
          "value": "测试数据三",
          "color": "#173177"
        },
        "keyword4": {
          "value": "测试数据四",
          "color": "#173111"
        },
      }
    }
    console.log('event.detail', event.detail, event.detail.formId)

    const res = await util.http({
      url: url,
      data: _jsonData,
      method: 'POST',
    });
    if (util.httpSuccess(res)) {
      console.log(res)
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad', this);
  },
  async onGotUserInfo(e) {
    // e.detail 跟 wx.getUserInfo()获取的用户信息是一样的
    console.log('onGotUserInfo', e.detail)
    const that = this;
    this.setData({
      userInfo: e.detail.userInfo,
    });
    const checkResult = await util.checkSession();
    if (!checkResult) {
      console.log('登录失效')
      wx.login({
        timeout: 3000,
        success: res => {
          console.log('wx.login ', res)
          that.getOpenid(res.code, e.detail);
        }
      });
    } else {
      console.log('登录有效， 请求解码');
      this.getDecryptData(e.detail);
    }
  },
  onGotUserInfoForce(e) {
    const {
      userInfo
    } = e.detail;
    console.log('onGotUserInfo', e.detail);
    const that = this;
    this.setData({
      userInfo,
    });
    console.log('执行强制登录');
    wx.login({
      timeout: 3000,
      success: res => {
        console.log('wx.login ', res)
        that.getOpenid(res.code, e.detail);
      }
    });
  },
  bindSptccTap: function () {
    wx.navigateTo({
      url: '../helper/helper'
    })
  },
  getSubscribe() {
    wx.requestSubscribeMessage({
      tmplIds: ["SRZmkvn6jtn9NnniXl0UzUmBstLjPQ5C68lN0h3SW8o"],
      success: function (errMsg, templateId){
        console.log("成功", errMsg, templateId);
      }
    })
  },
  async sendSubscribe() {
    const res = await util.http({
      url: '/wxmin/storeFormId',
      data: {
        template_id: 'd3NWLnTMLfchQNZPbn1AF2xQ4PHCC7_gbIOKbymk7mk',
        formId: event.detail.formId,
      },
      method: 'POST',
    });
    if (util.httpSuccess(res)) {
      console.log('存储formId成功', res)
    }
  }
})
