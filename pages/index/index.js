//index.js
const utils = require('../../utils/util.js');
const app = getApp()
Page({
    data: {
        sms: '',
        smsList: [],
        toView: 'smsl0',
        wh: 0,
        auth: false,
        userInfo: {},
        keywords: ''
    },
    onLoad: function () {
        this.setData({
            wh: app.globalData.wh
        });
        var self = this;
        if (wx.getStorageSync('userInfo')) {
            this.setData({
                userInfo: wx.getStorageSync('userInfo')
            });
            
        } else {
            this.getUserInfo(function () { });
        }
        this.getWelcomeSms();
    },
    getUserInfo: function (fun) {
        var self = this;
        wx.getUserInfo({
            success: function (res) {
                console.log(res)
                wx.setStorageSync('userInfo', res.userInfo)
                app.wxLogin(res.encryptedData, res.iv, function () {
                    self.setData({
                        auth: false
                    });
                    fun();
                });
            },
            fail: function (err) {
                self.setData({
                    auth: true
                });
            }
        })
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
                console.log(result)
                if (result.data.status == 2) {
                    self.getUserInfo(function () {
                        self.getWelcomeSms();
                    });
                } else {
                    var tmp = [];
                    tmp.push({
                        txt: result.data.data.title1, tpy: 'others'
                    });
                    tmp.push({
                        txt: result.data.data.title2, tpy: 'others'
                    });
                    tmp.push({
                        txt: result.data.data.title3, tpy: 'others'
                    });
                    console.log(tmp)
                    self.setData({
                        loading: false,
                        smsList: tmp
                    });
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
        var tmp = this.data.smsList;
        tmp.push({ txt: this.data.sms, tpy: 'mysms' });
        this.setData({
            smsList: tmp,
            sms: '',
            keywords: this.data.sms
        });
        this.getResSms();
        if (this.data.smsList.length >= 6) {
            this.setData({
                toView: 'sms' + (this.data.smsList.length - 1)
            });
        }
    },
    getResSms: function () {
        var tmp = this.data.smsList;
        // tmp.push({ txt: Math.random(), tpy: 'others' });
        tmp.push({ txt: '', tpy: 'others', isload: true });
        this.setData({
            smsList: tmp
        });
        if (this.data.smsList.length >= 6) {
            this.setData({
                toView: 'sms' + (this.data.smsList.length - 1)
            });
        }
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
                console.log(result)
                if (result.data.status == 2) {
                    self.getUserInfo(function () {
                        self.getResSms();
                    });
                } else {
                    setTimeout(function () {
                        if (result.data.status == 0) {
                            tmp[tmp.length - 1].txt = result.data.info;
                        } else {
                            tmp[tmp.length - 1].txt = result.data.data;
                        }
                        tmp[tmp.length - 1].isload = false;
                        self.setData({
                            smsList: tmp
                        });
                    }, 1000);
                }
            }
        })
    },
    getUserInfos: function (e) {
        console.log(e)
        var self = this;
        if (e.detail.userInfo) {
            wx.setStorageSync('userInfo', e.detail.userInfo)
            app.wxLogin(e.detail.encryptedData, e.detail.iv, function () {
                self.setData({
                    auth: false
                });
                self.onLoad();
            });
        }
    }
})
