<template>
  <div class="vipsdetail">
    <div class="main-bread">
      <p class="lefttr"></p>
      <div class="bread-title"><p class="title">会员详情</p></div>
      <p class="navrb"></p>
    </div>
    <div class="main-content">
      <p class="maillbg"></p>
      <div class="main-wrap">
        <p class="table-title">基本信息</p>
        <table class="cont tr_color vipsinfo" width="60%" style="border:none;">
          <tr align="left" class="d">
            <td>会员ID：{{accountInfo.userId}}</td>
            <td>当前资产估值：￥{{accountInfo.mayPoint}}</td>
          </tr>
          <tr align="left" class="d">
            <td>会员手机号：{{accountInfo.phone}}</td>
            <td></td>
          </tr>
          <tr align="left" class="d">
            <td>充值估值：￥{{accountInfo.rechargePoint}}</td>
            <td>提现估值：￥{{accountInfo.orderPoint}}</td>
          </tr>
          <tr align="left" class="d">
            <td>领红包次数：{{accountInfo.receiveCount}}</td>
            <td>发红包次数：{{accountInfo.sendCount}}</td>
          </tr>
          <tr align="left" class="d">
            <td>领红包估值：￥{{accountInfo.receivePoint}}</td>
            <td>发红包估值：￥{{accountInfo.sendPoint}}</td>
          </tr>
        </table>
        <p class="table-title">用户资产<span @click="gotoLog">财务日志</span></p>
        <table width="100%" class="cont tr_color">
            <tr>
                <th>币种</th>
                <th>可用</th>
                <th>冻结</th>
                <th>合计</th>
                <th>估值</th>
                <th>明细</th>
            </tr>
            <tr align="center" class="d" v-for="item in btcDetailInfos">
                <td>{{item.btcType}}</td>
                <td>{{item.mayPoint}}</td>
                <td>{{item.freezePoint}}</td>
                <td>{{item.totalPoint}}</td>
                <td>￥{{item.valuationPoint}}</td>
                <td><router-link :to="{ path: 'userlog', query: { userId: accountInfo.userId,btcType: item.btcType}}">查看</router-link></td>
            </tr>
        </table>
        <p class="table-title">发红包记录</p>
        <table width="100%" class="cont tr_color">
            <tr>
                <th>红包ID</th>
                <th>币种</th>
                <th>金额</th>
                <th>数量</th>
                <th>被领数量</th>
                <th>剩余数量</th>
                <th>退回数量</th>
                <th>退回金额</th>
                <th>创建时间</th>
                <th>明细</th>
            </tr>
            <tr align="center" class="d" v-for="item in sendInfos">
                <td>{{item.id}}</td>
                <td>{{item.btcType}}</td>
                <td>{{item.totalPoint}}</td>
                <td>{{item.totalCount}}</td>
                <td>{{item.receiveCount}}</td>
                <td>{{item.remainCount}}</td>
                <td>{{item.backCount}}</td>
                <td>{{item.backPoint}}</td>
                <td>{{getTime(item.createTime)}}</td>
                <td><router-link :to="{ path: '/redbag/detail',meta: {id: 1}, query: { id: item.id }}">查看</router-link></td>
            </tr>
        </table>
        <p class="table-title">领红包记录</p>
        <table width="100%" class="cont tr_color">
            <tr>
                <th>红包ID</th>
                <th>币种</th>
                <th>总金额</th>
                <th>领到金额</th>
                <th>领取时间</th>
            </tr>
            <tr align="center" class="d" v-for="item in receiveInfos">
                <td>{{item.userId}}</td>
                <td>{{item.btcType}}</td>
                <td>{{item.totalPoint}}</td>
                <td>{{item.receivePoint}}</td>
                <td>{{getTime(item.createTime)}}</td>
            </tr>
        </table>
      </div>
      <p class="mailrbg"></p>
    </div>
    <div class="main-footer">
      <p class="buttom-left"></p>
      <p class="buttom"></p>
      <p class="buttom-right"></p>
    </div>
    <net-error :isShow="isShow" :showTxt="showTxt"></net-error>
  </div>
</template>

<script>
import axios from 'axios'
import NetError from '@/components/NetWorkError'
axios.defaults.withCredentials = true
export default{
  data(){
    return{
      pageSize:0,
      pageIndex:1,
      accountInfo:{},
      btcDetailInfos:[],
      receiveInfos:[],
      sendInfos:[],
      isShow:false,
      showTxt:'加载中'
    }
  },
  components: {
    'net-error':NetError
  },
  mounted() {
    this.isShow = true;
    this.showTxt = '加载中';
    var params = new URLSearchParams();
    params.append('userId', this.$route.query.id);
    params.append('pageSize', this.pageSize);
    params.append('pageIndex', this.pageIndex);
    axios.post(this.HOST+'/manager/user/detail',params).then(res => {
        this.accountInfo = res.data.data.accountInfo;
        this.btcDetailInfos = res.data.data.btcDetailInfos;
        this.receiveInfos = res.data.data.receiveInfos;
        this.sendInfos = res.data.data.sendInfos;
        this.isShow = false;
    }).catch(err => {
      this.isShow = true;
      this.showTxt = '网络出错';
    });
  },
  methods: {
    getTime(date){
      var d = new Date(date);
      return d.getFullYear()+'-'+this.fNumber((d.getMonth()+1))+'-'+this.fNumber(d.getDate())+" "+this.fNumber(d.getHours())+':'+this.fNumber(d.getMinutes())+':'+this.fNumber(d.getSeconds());
    },
    fNumber(n){
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    gotoLog(){
      this.$router.push({path:'userlog',query:{userId:this.accountInfo.userId}})
    }
  }
}
</script>
<style>
.vipsdetail table{
  margin-bottom: 25px;
}
.table-title{
  font-weight: bold;
  margin: 10px 0;
}
.table-title span{
  margin-left: 10px;
  font-weight: normal;
  border: 1px solid #000;
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
}
</style>
