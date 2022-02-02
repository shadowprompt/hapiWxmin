const formatTime = (date) => {
  let data = data || new Date();
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n = '') => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const http = (option) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...option,
      url: 'https://api.daozhao.com' + option.url,
      header: {
        Authorization: wx.getStorageSync('token').data
      },
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

const httpSuccess = (res) => {
  return res && res.statusCode === 200;
}

const checkSession = () => {
  return new Promise(resolve => {
    wx.checkSession({
      success() {
        resolve(true);
      },
      fail() {
        resolve(false);
      }
    });
  })
};

module.exports = {
  formatTime,
  http,
  httpSuccess,
  checkSession,
}
