//index.js
const app = getApp()
Page({
    data: {
        sms: '',
        smsList: [],
        toView: 'smsl0',
        wh: 0,
        ww:0,
        mask: false,
        auth: false,
        userInfo: {},
        keywords: ''
    },
    onLoad: function () {
        this.setData({
            wh: app.globalData.wh,
            ww: app.globalData.ww
        });
        var self = this;
        if (wx.getStorageSync('userInfo')) {
            this.setData({
                userInfo: wx.getStorageSync('userInfo')
            });
            this.getWelcomeSms();
        } else {
            this.reCheckAuth(function(){
                self.onLoad();
            });
        }
        
    },
    getWelcomeSms: function () {
        var self = this;
        wx.request({
            url: app.globalData.requestUrl + '/getWelcome',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                sessionId: wx.getStorageSync('session_id')
            },
            success: function (result) {
                if (result.data.status == 2) {
                    self.reCheckAuth(function(){
                        self.onLoad();
                    });
                } else {
                    self.timeOrder([
                        { msg: { is_img: false, v: result.data.data.title1 + ',' + self.data.userInfo.nickName}, tpy: 'others', showAvater: true },
                        { msg: { is_img: false, v:result.data.data.title2}, tpy: 'others', showAvater: false },
                        { msg: { is_img: false, v:result.data.data.title3}, tpy: 'others', showAvater: false }
                    ]);
                }
            }
        })
    },
    smsContent: function (e) {
        this.setData({
            sms: e.detail.value
        })
    },
    sendSms: function () {
        if (this.data.sms){
            var tmp = this.data.smsList;
            tmp.push({ txt: this.data.sms, tpy: 'mysms', showAvater: true });
            this.setData({
                smsList: tmp,
                sms: '',
                keywords: this.data.sms
            });
            this.getSmsResponse();
        }
    },
    getSmsResponse: function () {
        var self = this;
        wx.request({
            url: app.globalData.requestUrl + '/getContent',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                sessionId: wx.getStorageSync('session_id'),
                keyWords: self.data.keywords
            },
            success: function (result) {
                if (result.data.status == 2) {
                    self.reCheckAuth(function () {
                        self.getSmsResponse();
                    });
                } else if (result.data.status == 1) {
                    if (result.data.data.length==1){
                        self.timeOrder([
                            { msg: result.data.data[0], tpy: 'others', showAvater: true }
                        ]);
                    }else{
                        var obj = [];
                        for (var i = 0; i < result.data.data.length;i++){
                            obj[i] = { msg: result.data.data[i], tpy: 'others', showAvater: i == 0 ? true:false};
                        }
                        self.timeOrder(obj);
                    }
                }else{
                    self.timeOrder([{ msg: result.data.info, tpy: 'others', showAvater: true }]);
                }
            }
        })
    },
    timeOrder: function (arr) {
        this.getResSms(arr[0]);
        arr.shift();
        if (arr.length >= 1) {
            var self = this;
            setTimeout(function () {
                self.timeOrder(arr);
            }, 800);
        }
    },
    getResSms: function (obj) {
        var tmp = this.data.smsList;
        tmp.push({ txt: '', tpy: obj.tpy, isload: true, showAvater: obj.showAvater });
        this.setData({
            smsList: tmp
        });

        var self = this;
        setTimeout(function () {
            tmp[tmp.length - 1].hasImg = obj.msg.is_img;
            tmp[tmp.length - 1].txt = obj.msg.v;
            
            tmp[tmp.length - 1].isload = false;
            self.setData({
                smsList: tmp
            });
        }, 800);
        this.setData({
            toView: 'sms' + (this.data.smsList.length - 1)
        });
    },
    getUserInfos: function (e) {
        if (e.detail.userInfo) {
            this.signUser(e.detail.encryptedData, e.detail.iv, e.detail.userInfo);
            this.setData({
                auth: false,
                mask: false
            });
        }
    },
    signUser: function (encryptedData, iv, userInfo, fun) {
        var self = this;
        app.registerUser(encryptedData, iv, function () {
            wx.setStorageSync('userInfo', userInfo);
            if (fun) {
                fun();
            } else {
                self.onLoad();
            }
        });
    },
    reCheckAuth: function (fun) {
        var self = this;
        wx.getUserInfo({
            success: function (res) {
                self.signUser(res.encryptedData, res.iv, res.userInfo, fun);
            },
            fail: function (res) {
                self.setData({
                    auth: true,
                    mask: true
                });
            }
        });
    },
    scaleImg:function(e){
        wx.previewImage({
            urls: [e.currentTarget.dataset.src] 
        })
    }
})
