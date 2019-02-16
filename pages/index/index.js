//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '0',
    social: '5000',
    common: '5000',
    userRadio: '3500',
    nedd: '0',
    sum: '0',
    total: '0',
    items: [{
        name: '3500',
        value: '3500',
        checked: 'true'
      },
      {
        name: '4800',
        value: '4800'
      },
      {
        name: '5000',
        value: '5000'
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //获取用户输入
  radioChange: function(e) {
    this.setData({
      userRadio: e.detail.value
    });
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  socialInput: function(e) {
    this.setData({
      social: e.detail.value
    })
  },
  commonInput: function(e) {
    this.setData({
      common: e.detail.value
    })
  },
  /*计算函数*/
  count: function(e) {
    var userSalary = parseFloat(this.data.userName); //税前收入
    var social = parseFloat(this.data.social); //社保基数
    var common = parseFloat(this.data.common); //公积金基数
    var userRadio = parseInt(this.data.userRadio); //起征点
    var sum = parseFloat(this.data.sum); //起征点
    var quickCutNumV; //速算扣除数
    var taxRateV; //适用税率
    var total; //五险总计
    var need; //所需个税

    social = parseFloat(userSalary * 0.02 + userSalary * 0.08 + userSalary * 0.005);
    common = parseFloat(userSalary * 0.12);
    total = parseFloat(social + common);
    total = total.toFixed(2); //五险总计得
    var cutm = userSalary - social - common - userRadio; ////应纳税所得金额
    if (userRadio === 5000) {
      //5000起步
      switch (cutm) {
        case ((cutm < 0) ? cutm : -1):
          need = 0;
          break;
        case ((cutm >= 0 && cutm <= 3000) ? cutm : -1):
          need = cutm * 0.03;
          need = need.toFixed(2);
          break;
        case ((cutm > 3000 && cutm <= 12000) ? cutm : -1):
          quickCutNumV = 210;
          need = cutm * 0.1 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
          break;
        case ((cutm > 12000 && cutm <= 25000) ? cutm : -1):
          quickCutNumV = 1410;
          need = cutm * 0.2 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
          break;
        case ((cutm > 25000 && cutm <= 35000) ? cutm : -1):
          quickCutNumV = 2660;
          need = cutm * 0.25 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
          break;
        case ((cutm > 35000 && cutm <= 55000) ? cutm : -1):
          quickCutNumV = 4410;
          need = cutm * 0.3 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
          break;
        case ((cutm > 55000 && cutm <= 80000) ? cutm : -1):
          quickCutNumV = 7160;
          need = cutm * 0.35 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
          break;
        default:
          quickCutNumV = 15160;
          need = cutm * 0.45 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
      };
      //到手总额
      sum = userSalary - need - total;
      if (sum < 0) {
        sum = 0;
      } else {
        sum = sum.toFixed(2);
      };
    } else {
      //3500起步
      switch (cutm) {
        case ((cutm < 0) ? cutm : -1):
          need = 0;
          break;
        case ((cutm >= 0 && cutm < 1500) ? cutm : -1):
          need = cutm * 0.03;
          need = need.toFixed(2);
          break;
        case ((cutm >= 1500 && cutm <= 4500) ? cutm : -1):
          quickCutNumV = 105;
          need = cutm * 0.1 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
          break;
        case ((cutm > 4500 && cutm <= 9000) ? cutm : -1):
          quickCutNumV = 555;
          need = cutm * 0.2 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
          break;
        case ((cutm > 9000 && cutm <= 35000) ? cutm : -1):
          quickCutNumV = 1005;
          need = cutm * 0.25 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
          break;
        case ((cutm > 35000 && cutm <= 55000) ? cutm : -1):
          quickCutNumV = 2755;
          need = cutm * 0.3 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
          break;
        case ((cutm > 55000 && cutm <= 80000) ? cutm : -1):
          quickCutNumV = 5505;
          need = cutm * 0.35 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
          break;
        default:
          quickCutNumV = 13505;
          need = cutm * 0.45 - parseFloat(quickCutNumV);
          need = need.toFixed(2);
      };
      //到手总额
      sum = userSalary - need - total;
      if (sum < 0) {
        sum = 0;
      } else {
        sum = sum.toFixed(2);
      }
    };
    if (userSalary) {
      wx.navigateTo({
        delta: 2,
        url: '../count/count?str=' + sum + '&userSalary=' + userSalary + '&need=' + need + '&total=' + total + '&value=' + userRadio,
      })
    } else {
      wx.showToast({
        title: '个税前收入不能为空！',
        icon: 'none',
        duration: 2000
      });
    };
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '个税计算器',

      path: '/page/index/index',

      imageUrl:'/images/logo.png'
    }
  }
})