<template>
  <section style="padding-bottom:1.5rem;">
    <section class="hbinfo">
        <p>来自{{hbinfo.receiveRedbagDetailInfo?hbinfo.receiveRedbagDetailInfo.nickName:""}}</p>
        <img :src="hbinfo.receiveRedbagDetailInfo?hbinfo.receiveRedbagDetailInfo.headImg:''" alt="">
    </section>
    <section class="btbinfo">
        <img src="../assets/btb.png" alt="">
        <template v-if="viewopt">
          <template v-if="hbinfo.status == 2 || hbinfo.status == 3 || hbinfo.status == 5">
            <p><strong>{{hbinfo.point?hbinfo.point:'0'}}</strong>{{hbinfo.receiveRedbagDetailInfo ? hbinfo.receiveRedbagDetailInfo
  .btcType : ''}}</p>
            <p class="price">价值约{{hbinfo.pointPrice ? hbinfo.pointPrice:'0'}}元</p>
          </template>
          <template v-else>
            <p class="hbdone" v-if="hbinfo.status == 0">红包已经失效了</p>
            <p class="hbdone" v-else-if="hbinfo.status == 7">红包已领取</p>
            <p class="hbdone" v-else>{{hbinfo.receiveRedbagDetailInfo?hbinfo.receiveRedbagDetailInfo.redbagStatus:''}}</p>
            <p class="square"><span>去广场看看</span></p>
          </template>
        </template>
        <p class="slogin">{{hbinfo.receiveRedbagDetailInfo?hbinfo.receiveRedbagDetailInfo.title:""}}</p>
    </section>
    <section class="btnlist" v-if="hbinfo.registerStatus == 1">
        <div class="listtitle">
            <p>已领取{{hbinfo.receiveRedbagDetailInfo ? hbinfo.receiveRedbagDetailInfo.hasCount :'0'}}/{{hbinfo.receiveRedbagDetailInfo ? hbinfo.receiveRedbagDetailInfo.totalCount :'0'}}个，{{hbinfo.receiveRedbagDetailInfo ? hbinfo.receiveRedbagDetailInfo.hasCount :'0'}}/{{hbinfo.receiveRedbagDetailInfo ? hbinfo.receiveRedbagDetailInfo.totalCount :'0'}}个{{hbinfo.receiveRedbagDetailInfo ? hbinfo.receiveRedbagDetailInfo
.btcType :''}}</p>
            <p v-if="hbinfo.status == 3" class="goon" @click="shareGo">继续发放</p>
        </div>
        <div class="listcontent" v-for="item in hblist">
            <div class="listinfo">
                <img :src="item.headImg" alt="">
                <div>
                    <p>{{item.nickName}}</p>
                    <p>{{item.receiveTime}}</p>
                </div>
            </div>
            <p>{{item.point}}</p>
        </div>
    </section>
    <section class="makeaddress" v-else>
        <p>请在3分钟内填写手机号码生成钱包地址，若3分钟未完 成生成，将退回红包</p>
        <p v-if="timeout">已退回</p>
        <div class="makebtn" v-else>
            <p><span>倒计时</span><strong id="time1">{{time1}}</strong><strong id="time2">{{time2}}</strong><em>:</em><strong id="time3">{{time3}}</strong><strong id="time4">{{time4}}</strong></p>
            <p @click="register">生成钱包地址</p>
        </div>
    </section>
    <div class="sponsor">
        <p>数字币提供技术支持</p>
        <p>www.shuzibi.com</p>
    </div>
    <section class="asset">
        <div class="wrap" v-if="hbinfo.registerStatus == 1">
            <p>您的数字货币资产<span>价值约{{hbinfo.pointPrice ? hbinfo.pointPrice:'0'}}元</span></p>
            <p class="gocash" @click="gocash">去提现</p>
        </div>
        <div class="makeloading" v-else><template v-if="timeout">{{hbinfo.receiveRedbagDetailInfo ? hbinfo.receiveRedbagDetailInfo.hasCount:''}}人正在领取还剩{{hbinfo.receiveRedbagDetailInfo ? hbinfo.receiveRedbagDetailInfo.remainCount:''}}个红包，<br>先生成钱包地址将优先获得红包</template><template v-else>{{hbinfo.receiveRedbagDetailInfo ? hbinfo.receiveRedbagDetailInfo.hasCount:''}}人正在领取，先生成钱包地址将优先获得红包</template></div>
    </section>
    <div class="pop" v-if="cash || reg">
        <div class="download" v-if="cash">
            <h4 class="title">资金提现</h4>
            <p>请下载app<br>在移动端才能提现</p>
            <p @click="goDownload">去下载</p>
        </div>
        <div class="register" v-if="reg">
            <h4>恭喜您</h4>
            <p class="txt">获得<span>{{hbinfo ? hbinfo.point :'0'}}{{hbinfo.receiveRedbagDetailInfo ? hbinfo.receiveRedbagDetailInfo.btcType:''}}</span>，填写手机号生成钱包地址</p>
            <div class="errinfo" :class="{'infobg':errinfotxt}">{{errinfotxt}}</div>
            <ul>
                <li><input type="text" placeholder="手机号" class="phone" @focus="changeInputFocus" :class="{'fcolor':fpcolor}" @blur="changeInputBlurPhone"></li>
                <li><input type="text" placeholder="验证码" class="validate" @focus="changeInputFocus" :class="{'fcolor':fvcolor}" @blur="changeInputBlurCode"><input id="codep" type="button" v-model="codebtn" @click="getCode" :disabled="codebtnable"></li>
            </ul>
            <p class="tips">3分钟内未填写，将退回红包</p>
            <p class="protocol" @click="changeAgree"><img src="../assets/agree.png" alt="" v-if="agree"><img src="../assets/noagree.png" alt="" v-else><span>已知晓，并同意<router-link to="/prot">《用户协议》</router-link></span></p>
            <div class="btn"><input type="button" value="取消" @click="cancelBtn"><input type="button" value="确定" @click="gerHb"></div>
        </div>
    </div>
    <div class="opmask" v-if="cash || reg"></div>
    <div class="loading" v-if="load">{{loadTxt}}</div>
  </section>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
var timer = null;
var timer1 = null;
let sw = true;
export default {
  name: 'hblist',
  data(){
    return {
      cash: false,
      load:false,
      loadTxt:'加载中',
      hasMore:true,
      pageIndex:1,
      pageSize:10,
      hblist:[],
      hbinfo:{},
      activityId:'',
      viewopt:true,



      timeout:false, // 定时器
      time1:0,
      time2:0,
      time3:0,
      time4:0,
      reg: false,
      agree:true,
      fpcolor:false,
      fvcolor:false,
      unreginfo:{},
      phoneStatus:false,
      phone:null,
      codeStatus:false,
      code:null,
      timeout:false, // 定时器
      errinfotxt:'',
      codebtn:'获取验证码',
      codebtnable:false
    }
  },
  async mounted(){
    console.log(this.$route)
    this.load = true;
    // this.activityId = sessionStorage.activityId;
    this.activityId = '8f893ef2cf2a452f8a5975f91944bad3';
    if('opt' in this.$route.params){
      this.viewopt = false;
    }
    var params = new URLSearchParams();
    params.append('activityId', this.activityId);
    axios.post(this.HOST + '/openRedbag',params).then(res => {
        console.log(JSON.parse(res.data));
        var obj = JSON.parse(res.data);
        if(obj.data.status == 6 && obj.registerStatus != 2){
          this.timeout = true;
        }else{
          this.showTime(obj.data.time);
        }
        this.hbinfo = obj.data;
        this.load = false;
    }).catch(err => {
      this.load = true;
      this.loadTxt = "网络出错";
    });

    this.getList();
    var self = this;
    window.addEventListener('scroll',function(){
      var scrollTop = 0;
      
      if(document.documentElement&&document.documentElement.scrollTop){
          scrollTop=document.documentElement.scrollTop;
      }else if(document.body){
          scrollTop=document.body.scrollTop;
      }
      
      if(scrollTop + window.innerHeight >= document.body.offsetHeight){
        self.load = true;
        console.log(self.hasMore)
        if(sw && self.hasMore){
          sw = false;
          self.pageIndex += 1;
          console.log(self.pageIndex)
          self.getList();
        }else{
          self.load = false;
        }
      }else{
        self.load = false;
      }
    });
  },
  methods:{
    gocash(){
      this.cash = true;
    },
    goDownload(){
      this.cash = false;
      this.open_or_download_app();
    },
    getList(){
      var self = this;
      if(this.hasMore){
        var params = new URLSearchParams();
        params.append('activityId', this.activityId);
        params.append('pageSize', this.pageSize);
        params.append('pageIndex', this.pageIndex);
        axios.post(this.HOST + '/getUserReceiveActivityList',params).then(res => {
            console.log(res);
            var obj = JSON.parse(res.data);
            this.hasMore = obj.data.hasMore;
            this.pageIndex = obj.data.pageIndex;
            this.pageSize = obj.data.pageSize;
            obj.data.recordList.forEach(function(val,index){
              self.hblist.push(val);
            });
            sw = true;
            self.load = false;
        }).catch(err => {
          this.load = true;
          this.loadTxt = "网络出错";
          console.log(err);
        });
      }else{
        self.load = false;
      }
    },
    getCookie(name){
        var arr=document.cookie.split(';');
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');
            if(arr2[0]==name){
                return arr2[1];  //找到所需要的信息返回出来
            }
        }
        return '';        //找不到就返回空字符串
    },
    showTime(time){
      var self = this;
      var mins = (time / 60) | 0;
      var secs = (time - mins * 60) | 0;

      this.time1 = ('0' + mins).slice(-2).charAt(0);
      this.time2 = ('0' + mins).slice(-2).charAt(1);
      this.time3 = ('0' + secs).slice(-2).charAt(0);
      this.time4 = ('0' + secs).slice(-2).charAt(1);

      timer = setTimeout(function(){
          if(time <= 0){
            self.timeout = true;
            clearTimeout(timer);
            return;
          }
          time--;
          self.showTime(time);
      }, 1000);
    },
    register(){
        this.reg = true;
    },
    changeAgree(){
        this.agree = !this.agree;
        if(this.agree){
          this.errinfotxt = '';
        }else{
          this.errinfotxt = '你没有同意《用户协议》，不会生成钱包地址';
        }
    },
    cancelBtn(){
      this.reg = false;
      this.errinfotxt = '';
    },
    // 提交表单注册或者登陆 
    gerHb(){
        var self = this;
        if(this.phoneStatus && this.codeStatus && this.agree){
          this.load = true;
          this.loadTxt = '加载中';
          var params = new URLSearchParams();
          params.append('activityId', this.activityId);
          params.append('phone', this.phone);
          params.append('code', this.code);
          axios.post(this.HOST + '/createWalletAddress',params).then(res => {
              console.log(res);
              var obj = JSON.parse(res.data);
              if(obj.code == 0){
                this.load = false;
                this.errinfotxt = obj.msg;
              }else if(obj.code == 500){
                this.load = true;
                this.loadTxt = obj.msg;
              }else{
                this.errinfotxt = '';
                this.load = false;
                self.setCookie('btbck',new Date().getTime(),24 * 60 * 60);
                this.$router.push({name:'list',params:{activityId:this.activityId}})
              }
              
          }).catch(err => {
            this.load = true;
            this.loadTxt = '网络出错';
          });
        }else{
          this.errinfotxt = '请填写正确的信息后提交';
        }
    },
    changeInputFocus(e){
        if(e.target.className == 'phone'){
            this.fpcolor = true;
        }else{
            this.fvcolor = true;
        }
    },
    changeInputBlurPhone(e){
      this.fpcolor = false;
      console.log(e.target.value)
      if(e.target.value){
        if(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(e.target.value)){
          this.phoneStatus = true;
          this.errinfotxt = '';
          this.phone = e.target.value;
        }else{
          this.phoneStatus = false;
          this.errinfotxt = '请填写正确的手机号';
        }
      }else{
        this.phoneStatus = false;
        this.errinfotxt = '请输入手机号';
      }
      
    },
    changeInputBlurCode(e){
      this.fvcolor = false;
      if(e.target.value){
        if(/^[0-9]{6}$/.test(e.target.value)){
          this.codeStatus = true;
          this.code = e.target.value;
        }else{
          this.codeStatus = false;
          this.errinfotxt = '请填写正确的验证码';
        }
      }else{
        this.codeStatus = false;
        this.errinfotxt = '请输入验证码';
      }
    },
    // 获取手机验证码
    getCode(){
      if(this.phone){
        this.load = true;
        this.loadTxt = '加载中';
        var params = new URLSearchParams();
        params.append('phone', this.phone);
        axios.post(this.HOST + '/code',params).then(res => {
            console.log(res);
            var obj = JSON.parse(res.data);
            if(obj.code == 0){
              this.load = false;
              this.errinfotxt = obj.msg;
            }else if(obj.code == 500){
              this.load = true;
            this.loadTxt = obj.msg;
            }else{
              this.load = false;
              this.getCodeTime(obj.data.expire);
            }
        }).catch(err => {
            console.log(err);
        });
      }else{
        this.errinfotxt = '请填写手机号码获取验证码';
      }
    },
    // 手机验证码60s后重新获取
    getCodeTime(time){
      var self = this;
      this.codebtn = '重新获取('+time+')';
      this.codebtnable = true;
      timer1 = setTimeout(function(){
          if(time <= 0){
            self.codebtn = '重新获取';
            self.codebtnable = false;
            clearTimeout(timer1);
            return;
          }
          time--;
          self.getCodeTime(time);
      }, 1000);
    },
    shareGo(){

    },
    open_or_download_app() {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          // 判断useragent，当前设备为ios设备
          var loadDateTime = new Date(); // 设置时间阈值，在规定时间里面没有打开对应App的话，直接去App store进行下载。
          window.setTimeout(function() {
              var timeOutDateTime = new Date();
              if (timeOutDateTime - loadDateTime < 2000) {
                  window.location = "https://itunes.apple.com/cn/app/id1342105473?mt=8";
              } else {
                  window.close();
              }
          },  50);
          // window.location = "XXX://"; // iOS端URL Schema
        } else if (navigator.userAgent.match(/android/i)) {
            // 判断useragent，当前设备为android设备
            var loadDateTime = new Date();
            window.setTimeout(function() {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 2000) {
                    // window.location = "https://itunes.apple.com/cn/app/id1342105473?mt=8";
                } else {
                    window.close();
                }
            },  50);
            window.location = "btb://splash"; // Android端URL Schema
        }
    }
  }
}
</script>

<style>
.btnlist {
    background-color: #fff;
    color: #999;
    margin-top: .48rem;
}

.listtitle {
    padding: .19rem .32rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: .24rem;
}

.listtitle .goon {
    color: #dbbf61;
    position: relative;
    padding-right: .3rem;
    display:none;
}

.listtitle .goon::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: -.07rem;
    width: 0;
    height: 0;
    border: .10rem solid;
    margin-top: -.10rem;
    border-color: transparent transparent transparent #fff;
}

.listtitle .goon::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: -.1rem;
    width: 0;
    height: 0;
    border: .10rem solid;
    margin-top: -.10rem;
    border-color: transparent transparent transparent #dbbf61;
}

.listcontent {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: .01rem solid rgba(0, 0, 0, .12);
    padding: .16rem .32rem;
    font-size: .32rem;
    color: #333;
}

.listinfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.listinfo img {
    border-radius: 50%;
    width: .8rem;
    height: .8rem;
    margin-right: .3rem;
}

.listinfo div p:last-child {
    font-size: .24rem;
    color: #999;
}

.listinfo span {
    margin-left: .16rem;
}

.asset .wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.asset .wrap p {
    padding: .32rem;
}

.asset .wrap p:last-child {
    margin-right: .32rem;
}

.asset span {
    color: #999;
    font-size: .24rem;
    margin-left: .15rem;
}

.asset p:last-child {
    color: #dbbf61;
    padding-right: .3rem;
    position: relative;
}

.asset p:last-child::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: -.07rem;
    width: 0;
    height: 0;
    border: .12rem solid;
    margin-top: -.12rem;
    border-color: transparent transparent transparent #fff;
}

.asset p:last-child::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: -.1rem;
    width: 0;
    height: 0;
    border: .12rem solid;
    margin-top: -.12rem;
    border-color: transparent transparent transparent #dbbf61;
}

.download p {
    color: #333;
    font-size: .28rem;
}

.download h4 {
    font-size: .36rem;
    margin-top: .48rem;
}

.download p:nth-child(2) {
    padding: .48rem 0;
}

.download p:last-child {
    font-size: .32rem;
    padding: .32rem 0;
    border-top: 1px solid rgba(0, 0, 0, .12);
}
.makebtn {
    margin-top: .36rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.makebtn p:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.makebtn p em {
    font-style: normal;
    color: #333;
    font-size: .48rem;
    margin-left: .08rem;
}

.makebtn p span {
    color: #999;
    font-size: .24rem;
}

.makebtn p strong {
    color: #fff;
    font-size: .48rem;
    margin-left: .08rem;
    background-color: #666;
    padding: .05rem .12rem;
    border-radius: .08rem;
}

.makebtn p:last-child {
    background-color: #dbbf61;
    padding: .22rem .17rem;
    color: #fff;
    font-size:.28rem;
    margin:0;
}

.makeloading {
    font-size: .28rem;
    color: #f44336;
    text-align: center;
    padding: .34rem 0;
}

.register {
    color: #333;
}

.register h4 {
    font-size: .4rem;
    margin: .48rem 0 0;
}

.register .txt {
    margin-top: .48rem;
    font-size: .28rem;
}

.register .txt span {
    color: #f44336;
}

.register ul {
    margin-top: .46rem;
}

.register ul li {
    padding: 0 .32rem;
}

.register li input {
    height: .88rem;
    padding-left: .32rem;
    box-sizing: border-box;
    background-color: #eeeeee;
    color: #999;
}
.register li input.fcolor{
    color:#333;
}
.register li:first-child input {
    width: 100%;
}

.register li:last-child {
    margin-top: .16rem;
    position: relative;
}

.register li:last-child input:first-child {
    width: 100%;
}

.register li:last-child input:last-child {
    height: .64rem;
    line-height: .64rem;
    font-size: .28rem;
    padding: 0 .15rem;
    border-left: .01rem solid rgba(0, 0, 0, .12);
    position: absolute;
    right: .32rem;
    top: .12rem;
    min-width:1.64rem;
    box-sizing:border-box;
}

.register .tips {
    font-size: .24rem;
    color: #f44336;
    margin-top: .32rem;
}

.register .protocol {
    margin-top: .48rem;
    font-size: .24rem;
    color: #999;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.register .protocol a{
  color:#1b5a98;
}

.register .protocol img {
    width: .24rem;
    height: .24rem;
    margin-right: .2rem;
}

.register .btn {
    margin-top: .48rem;
    border-top: .01rem solid rgba(0, 0, 0, .12);
    height: .95rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.register .btn input {
    flex: 1;
    height: 100%;
    border-left: .01rem solid rgba(0, 0, 0, .12);
    background-color: #fff;
    font-size: .32rem;
    color: #dbbf61;
}

.register .btn input:first-child {
    border-left: 0;
    color: #666;
}
.fail{
    font-size:.68rem;
    color:#333;
    margin-top:.4rem;
}
.errinfo{
  height:.32rem;
  line-height:.32rem;
  color:#fff;
  font-size:.18rem;
  
  margin:.24rem .32rem -.38rem;
}
.infobg{
  background:#f44336;
}
</style>