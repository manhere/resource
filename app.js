//app.js
App({
    onLaunch: function () {
        var self = this;
        wx.getSystemInfo({
            success: function (res) {
                self.globalData.wh = res.windowHeight;
            }
        })
    },
    globalData: {
        wh:0,
        requestUrl: 'https://t.lovezyd.com/Api/Index'
    },
    wxLogin: function (encryptedData,iv,fun) {
        var self = this;
        wx.login({
            success: function (res) {
                console.log(res)
                if (res.code) {
                    wx.request({
                        url: self.globalData.requestUrl + '/wxLogin',
                        method: 'POST',
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        data: {
                            code: res.code,
                            encryptedData: encryptedData,
                            iv:iv
                        },
                        success:function(result){
                            wx.setStorageSync('session_id', result.data.session_id)
                            fun();
                            console.log(result)
                        }
                    })
                } else {
                    self.wxLogin();
                }
            }
        });
    }
})