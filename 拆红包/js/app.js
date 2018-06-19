define(function(require, exports, module) {
    require("mod/touch");
    require("mod/detect");
    $.Box = require("mod/box");
    $.Tips = require("mod/tips");
    $.Log = require("mod/log");
    $.Login = require("mod/login");
    $.Weixin = require("mod/weixin");
    // $.Stat = require("mod/stat");
    $.Amount = require("mod/amount");
    $.Env = {
        APP_ID: "wxc92ca6e258e3f1eb",
        SP_NAME: "wx_yuezengzhi",
        CGI_PREFIX: "/app/v2.0/",
        TAP: "tap",
        showLoading: function() {
            $("body").addClass("show-pop-loading")
        },
        hideLoading: function() {
            $("body").removeClass("show-pop-loading")
        },
        showBox: function(retmsg, retcode) {
            var login_retcode = [51001000, 51001001, 51001095, 51001096, 51001097];
            var relogin = $.sessionStorage.getItem("relogin") || 0;
            if ($.inArray(retcode, login_retcode) > -1 && relogin < 2) {
                try {
                    $.sessionStorage.setItem("relogin", relogin + 1);
                    $(document).off("ajaxError");
                    $.extend($.ajaxSettings, {
                        error: function() {}
                    });
                    $.removeCookie("qluin");
                    $.removeCookie("qlskey");
                    $.sessionStorage.removeItem("qluin");
                    $.sessionStorage.removeItem("qlskey");
                    $.sessionStorage.removeItem("oauth_jump");
                    window.jumpOauth && window.jumpOauth()
                } catch (e) {}
            } else {
                $.Box.showBox(retcode ? "[" + retcode + "]" + retmsg.replace(/^◆?\[\d+\]/, "") : retmsg)
            }
        },
        addPressEvent: function(selector) {
            var nodes = $(selector);
            nodes.each(function(index, node) {
                if ($(node).data("tap-init") == "1") {
                    return
                }
                $(node).on("touchstart",
                    function(e) {
                        var n = $(this);
                        if (n.data("tap-filter") == 1) {
                            return
                        }
                        n.addClass("tap-on")
                    }).on("touchend",
                    function(e) {
                        var n = $(this);
                        n.removeClass("tap-on")
                    }).data("tap-init", "1")
            })
        },
        addTapLinkEvent: function(selector) {
            $(selector).on($.Env.TAP,
                function(e) {
                    e.preventDefault();
                    var n = $(this);
                    var link = n.attr("data-link");
                    if (link) {
                        location.href = link
                    }
                })
        },
        sendJsLog: function(url, errmsg, retcode) {
            var report = new $.Log("weixin/fund");
            report.attr({
                retcode: retcode || "90019001",
                retmsg: encodeURIComponent(document.cookie),
                url: url || location.href,
                errmsg: errmsg
            });
            report.send()
        }
    };
    $.extend($.ajaxSettings, {
        dataType: "json",
        timeout: 40000,
        error: function(xhr, errorType, error) {
            if (errorType == "abort") {
                return
            } else {
                if (errorType == "timeout") {
                    $.Env.showBox("网络不给力，请返回后重新进入")
                } else {
                    $.Env.showBox("系统出了点小问题，请返回重新进入")
                }
            }
            $.Env.hideLoading()
        },
        beforeSend: function() {
            $.Env.showLoading()
        },
        complete: function() {
            $.Env.hideLoading()
        },
        cache: false,
        global: true
    });
    var _bindEvent = function() {
        $.Env.addTapLinkEvent(".js-tap-link");
        $.Env.addPressEvent(".js-tap-on")
    };
    var _init = function(fn) {
        window.onerror = function(msg, url, line) {
            window.onerror = {};
            if (/WeixinJSBridge\sis\snot\sdefined/.test(msg)) {
                return
            }
            $.Env.sendJsLog(url, msg)
        };
        $(document).off("ajaxError").on("ajaxError",
            function(e, xhr, options, error) {
                var ajaxUrl = options.url;
                $.Env.sendJsLog(ajaxUrl, xhr.status + "_" + error + "_" + xhr.response, "90019002");
                // $.Stat.clickStat("FUND.AJAX.ERROR." + xhr.status + "_" + error)
            });
        window.scrollTo(0, 0);
        $(window).off("scroll");
        $.Login.checkLogin($.Env.SP_NAME,
            function() {
                _bindEvent();
                fn && fn()
            })
    };
    return {
        init: _init
    }
});