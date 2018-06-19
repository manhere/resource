<template>
  <section style="padding-bottom:1.5rem;">
    <section class="hbinfo">
        <p>来自jjjj</p>
        <img src="http://www.btchb.io/btc-file/image//1518072092502.png" alt="">
    </section>
    <section class="btbinfo">
        <img src="../assets/btb.png" alt="">
        
        <template v-if="hbinfo.status == 1 || hbinfo.status == 4 || hbinfo.status == 0 || hbinfo.status == 7 || hbinfo.status == 6">
          <p class="hbdone">领取失败</p>
          <p class="square"><span>去广场看看</span></p>
        </template>

        <template v-else>
          <p><strong>0</strong>BTC</p>
          <p class="price">价值约0元</p>
        </template>
        
        <p class="slogin">slogin</p>
    </section>
    <section class="btnlist">
        <div class="listtitle">
            <p>已领取0/0个，0/0个BTC</p>
            <p class="goon">继续发放</p>
        </div>
        <div class="listcontent">
            <div class="listinfo">
                <img src="http://www.btchb.io/btc-file/image//1517998604604.png" alt="">
                <div>
                    <p>153******04</p>
                    <p>2018-02-08 17:50:30.0</p>
                </div>
            </div>
            <p>0.54734618</p>
        </div>
    </section>
    <section class="makeaddress">
        <p>请在3分钟内填写手机号码生成钱包地址，若3分钟未完 成生成，将退回红包</p>
        <p v-if="hbinfo.status == 6">已退回</p>
        <div class="makebtn" v-else>
            <p><span>倒计时</span><strong id="time1">0</strong><strong id="time2">0</strong><em>:</em><strong id="time3">0</strong><strong id="time4">0</strong></p>
            <p>生成钱包地址</p>
        </div>
    </section>
    <div class="sponsor">
        <p>数字币提供技术支持</p>
        <p>www.shuzibi.com</p>
    </div>
    <section class="asset">
        <div class="wrap">
            <p>您的虚拟币资产<span>价值约0元</span></p>
            <p class="gocash">去提现</p>
        </div>
        <div class="makeloading">0人正在领取还剩0个红包，<br>先生成钱包地址将优先获得红包</div>
    </section>
    <div class="pop">
        <div class="download">
            <h4 class="title">资金提现</h4>
            <p>请下载app<br>在移动端才能提现</p>
            <p>去下载</p>
        </div>
        <!--
        <div class="register">
            <h4>恭喜您</h4>
            <p class="txt">获得<span>0BTC</span>，填写手机号生成钱包地址</p>
            <div class="errinfo" :class="{'infobg':errinfotxt}">{{errinfotxt}}</div>
            <ul>
                <li><input type="text" placeholder="手机号" class="phone" @focus="changeInputFocus" :class="{'fcolor':fpcolor}" @blur="changeInputBlurPhone"></li>
                <li><input type="text" placeholder="验证码" class="validate" @focus="changeInputFocus" :class="{'fcolor':fvcolor}" @blur="changeInputBlurCode"><input id="codep" type="button" v-model="codebtn" @click="getCode" :disabled="codebtnable"></li>
            </ul>
            <p class="tips">3分钟内未填写，将退回红包</p>
            <p class="protocol" @click="changeAgree"><img src="../assets/agree.png" alt="" v-if="agree"><img src="../assets/noagree.png" alt="" v-else><span>已知晓，并同意<router-link to="/prot">《用户协议》</router-link></span></p>
            <div class="btn"><input type="button" value="取消" @click="cancelBtn"><input type="button" value="确定" @click="gerHb"></div>
        </div>
        -->
    </div>
    <div class="opmask"></div>
    <div class="loading">加载中</div>
  </section>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
export default {
  name: 'gives',
  data(){
    return {
      hbinfo:{
        registerStatus:2,
        status:4,
        point:0,
        pointPrice:0,
        receiveRedbagDetailInfo:{
          btcType:"ETH",
          hasCount:2,
          hasPoint:1,
          headImg:"http://www.btchb.io/btc-file/image//1518072092502.png",
          remainCount:0,
          remainPoint:0,
          sentiment:"祝成功",
          title:"祝成功",
          totalCount:2,
          totalPoint:1,
          redbagStatus:'222222',
          mayPoint:'000',
          mayPointPrice:'2222'
        }
      }
    }
  },
  async mounted(){
    var params = new URLSearchParams();
    params.append('activityId', '8f893ef2cf2a452f8a5975f91944bad3');
    axios.post(this.HOST + '/openRedbag',params).then(res => {
        console.log(JSON.parse(res.data));
        var obj = JSON.parse(res.data);
        // if(obj.code != 0){
        //   this.hbinfo = obj.data;
        //   this.load = false;
        // }
    }).catch(err => {
      this.load = true;
      this.loadTxt = "网络出错";
    });
  },
  methods:{
    
  }
}
</script>

<style>

</style>