<template>
  <div class="vipsdetail">
    <div class="main-bread">
      <p class="lefttr"></p>
      <div class="bread-title"><p class="title">财务日志</p></div>
      <p class="navrb"></p>
    </div>
    <div class="main-content">
      <p class="maillbg"></p>
      <div class="main-wrap">
        <p class="table-title">会员ID：{{this.$route.query.userId}} <strong v-if="!isbtc" style="margin-left:20px;">币种 {{this.$route.query.btcType}}</strong></p>
        <table width="100%" class="cont tr_color">
            <tr>
                <th v-if="isbtc">币种</th>
                <th>变动时间</th>
                <th>变动金额</th>
                <th>变动前</th>
                <th>变动后</th>
                <th>变动原因</th>
                <th>相关ID（红包、充值、提现）</th>
            </tr>
            <tr align="center" class="d" v-for="item in vipsdetail">
                <td v-if="isbtc">{{item.btcType}}</td>
                <td>{{getTime(item.createTime)}}</td>
                <td>{{item.status == 1 ? '-':'+'}}{{item.changePoint}}</td>
                <td>{{item.changeBefore}}</td>
                <td>{{item.changeAfter}}</td>
                <td>{{item.changeReason}}</td>
                <td>{{item.logId}}</td>
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
      isbtc:true,
      pageSize:0,
      pageIndex:1,
      vipsdetail:[],
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
    params.append('userId', this.$route.query.userId);
    if('btcType' in this.$route.query){
      params.append('btcType', this.$route.query.btcType);
      this.isbtc = false;
    }
    params.append('pageSize', this.pageSize);
    params.append('pageIndex', this.pageIndex);
    axios.post(this.HOST+'/manager/user/log',params).then(res => {
        this.vipsdetail = res.data.data;
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
    }
  }
}
</script>
<style>
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
