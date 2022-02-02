var app = getApp()
Page({
  data: {
    searchPlaceHolder:"请输入您的上海公交卡号",
    searchLabel:"查询",
    balance:"",
    cardNo:null,
  },
  myBack: function(data){
    console.log("data= " + data);
  },
  cardNoInput: function(e){
    this.setData({
      cardNo: e.detail.value
    });
  },
  //事件处理函数
  sptccSearch: function() {
    var that = this;
    that.setData({
      balance: '余额查询中...'
    });
    wx.request({
      url: '/get', //上海公交卡余额查询接口地址
      data: {
        "cardNo": that.data.cardNo
      },
      method:"get",
      dataType: "jsonp",
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        if(res.statusCode === 200){
          var money = /transportMoney\('(\d*\.*\d*)'\);/.test(res.data);
          var balance = RegExp.$1;
          console.log({
            money: RegExp.$1
          });
          that.setData({
            balance: `余额：${balance}`
          });
        }else{
          that.setData({
            balance: '查询失败'
          });
        }

      }
    })
  }
})
