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
    registerUser: function (encryptedData, iv, fun) {
        var self = this;
        wx.login({
            success: function (res) {
                var data = {};
                if (encryptedData && iv) {
                    data = {
                        code: res.code,
                        encryptedData: encryptedData,
                        iv: iv
                    }
                } else {
                    data = {
                        code: res.code
                    }
                }
                wx.request({
                    url: self.globalData.requestUrl + '/wxLogin',
                    method: 'POST',
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: data,
                    success: function (r) {
                        if (r.data.status == 1) {
                            wx.setStorageSync('session_id', r.data.session_id);
                            fun();
                        }
                    }
                })
            }
        })
    }
})