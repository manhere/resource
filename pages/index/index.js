//index.js
const utils = require('../../utils/util.js');
const app = getApp()
Page({
    data: {
        sms: '',
        smsList: [],
        toView:'smsl0',
        wh:0
    },
    onLoad: function () {
        var self = this;
        wx.getSystemInfo({
            success: function (res) {
                self.setData({
                    wh: res.windowHeight
                });
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
        tmp.push({ txt: this.data.sms,tpy:'mysms'});
        this.setData({
            smsList:tmp,
            sms:''
        });
        this.getResSms();
        if (this.data.smsList.length >= 11){
            this.setData({
                toView: 'sms' + (this.data.smsList.length - 1)
            });
        }
    },
    getResSms:function(){
        var tmp = this.data.smsList;
        tmp.push({ txt: Math.random(), tpy: 'others' });
        this.setData({
            smsList:tmp
        });
        if (this.data.smsList.length >= 11) {
            this.setData({
                toView: 'sms' + (this.data.smsList.length - 1)
            });
        }
    }
})
