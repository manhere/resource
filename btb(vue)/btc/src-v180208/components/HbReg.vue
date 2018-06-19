<template>
  <section>
    <section class="hbinfo">
        <p>来自{{unreginfo.receiveRedbagDetailInfo ? unreginfo.receiveRedbagDetailInfo.nickName:''}}</p>
        <img :src="unreginfo.receiveRedbagDetailInfo ? unreginfo.receiveRedbagDetailInfo.headImg :''" alt="">
    </section>
    <section class="btbinfo">
        <img src="../assets/btb.png" alt="">
        <p class="fail" v-if="timeout">领取失败</p>
        <template v-else>
          <p><strong>{{unreginfo.point}}</strong>{{unreginfo.btcType}}</p>
          <p class="price">价值约{{unreginfo ? unreginfo.pointPrice :'0'}}</p>
        </template>
        <p class="slogin">{{unreginfo.receiveRedbagDetailInfo ? unreginfo.receiveRedbagDetailInfo.title:''}}</p>
    </section>
    <section class="makeaddress">
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
        <div class="makeloading"><template v-if="timeout">{{unreginfo.hasCount}}人正在领取还剩{{unreginfo.remainCount}}个红包，<br>先生成钱包地址将优先获得红包</template><template v-else>{{unreginfo.hasCount}}人正在领取，先生成钱包地址将优先获得红包</template></div>
    </section>
    <div class="pop" v-if="reg">
        <div class="register">
            <h4>恭喜您</h4>
            <p class="txt">获得<span>{{unreginfo ? unreginfo.point :'0'}}{{unreginfo.btcType}}</span>，填写手机号生成钱包地址</p>
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
    <div class="opmask" v-if="reg"></div>
  </section>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
var timer = null
var timer1 = null
export default {
  name: 'hbreg',
  data(){
    return {
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
      time1:0,
      time2:0,
      time3:0,
      time4:0,
      codebtn:'获取验证码',
      codebtnable:false,
      activityId:''
    }
  },
  async created(){
    console.log(this.$route.params.activityId)
    this.activityId = sessionStorage.activityId;
    // this.activityId = this.$route.params.activityId;
    var params = new URLSearchParams();
    params.append('activityId', this.activityId);
    axios.post(this.HOST + '/openRedbag',params).then(res => {
        console.log(res)
        var obj = JSON.parse(res.data);
        // 当用户已经点击注册或者登陆成功后就直接跳转到list
        if(this.getCookie('btbck')){
          this.$router.push({name:'list',params:{activityId:this.activityId}})
        }else{
          // 超过限定时间就显示领取失败已退回
          if(obj.data.status == 6){
            this.timeout = true;
          }else{
            this.showTime(obj.data.time);
          }
          this.unreginfo = obj.data;
        }
    }).catch(err => {
        console.log(err);
    });
  },
  methods:{
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
    // 提交表单注册或者登陆 
    gerHb(){
        var self = this;
        if(this.phoneStatus && this.codeStatus && this.agree){
          var params = new URLSearchParams();
          params.append('activityId', this.activityId);
          params.append('phone', this.phone);
          params.append('code', this.code);
          axios.post(this.HOST + '/createWalletAddress',params).then(res => {
              console.log(res);
              var obj = JSON.parse(res.data);
              if(obj.code == 0){
                // this.errinfotxt = '验证码错误，重新输入或获取';
                this.errinfotxt = obj.msg;
              }else{
                this.errinfotxt = '';
                self.setCookie('btbck',new Date().getTime(),24 * 60 * 60);
                this.$router.push({name:'list',params:{activityId:this.activityId}})
              }
              
          }).catch(err => {
              console.log(err);
          });
        }else{
          this.errinfotxt = '请填写正确的信息后提交';
        }
    },
    setCookie(name,value,secs){
      var oDate=new Date();
      oDate.setDate(oDate.getTime()+secs);
      document.cookie=name+'='+value+';expires='+oDate;
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
    cancelBtn(){
      this.reg = false;
      this.errinfotxt = '';
    },
    // 显示倒计时
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
    // 获取手机验证码
    getCode(){
      if(this.phone){
        var params = new URLSearchParams();
        params.append('phone', this.phone);
        axios.post(this.HOST + '/code',params).then(res => {
            console.log(res);
            var obj = JSON.parse(res.data);
            if(obj.code == 0){
              this.errinfotxt = obj.msg;
            }else{
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
    }
  }
}
</script>

<style>
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