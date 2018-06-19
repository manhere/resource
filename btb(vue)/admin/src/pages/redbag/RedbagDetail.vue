<template>
  <div class="redbagdetail">
    <div class="main-bread">
      <p class="lefttr"></p>
      <div class="bread-title"><p class="title">红包详情</p></div>
      <p class="navrb"></p>
    </div>
    <div class="main-content">
      <p class="maillbg"></p>
      <div class="main-wrap">
        <p class="table-title">基本信息</p>
        <table class="cont tr_color vipsinfo" width="60%" style="border:none;">
          <tr align="left" class="d">
            <td>红包ID：{{sendInfo.id}}</td>
            <td>红包数量：{{sendInfo.totalCount}}</td>
            <td>创建者ID：{{sendInfo.userId}}</td>
          </tr>
          <tr align="left" class="d">
            <td>币种：{{sendInfo.btcType}}</td>
            <td>被领数量：{{sendInfo.receiveCount}}</td>
            <td>创建者手机号：{{sendInfo.phone}}</td>
          </tr>
          <tr align="left" class="d">
            <td>红包金额：{{sendInfo.totalPoint}}</td>
            <td>剩余数量：{{sendInfo.remainCount}}</td>
            <td></td>
          </tr>
          <tr align="left" class="d">
            <td>红包估值：￥{{sendInfo.valuationPoint}}</td>
            <td>退回数量：{{sendInfo.backCount}}</td>
            <td></td>
          </tr>
        </table>
        <p class="table-title">详细信息</p>
        <table width="100%" class="cont tr_color">
            <tr align="center" class="d">
                <td>{{getTime(sendInfo.createTime)}}</td>
                <td>用户（ID {{sendInfo.userId}}）创建</td>
                <td>币种（{{sendInfo.btcType}}）</td>
                <td>金额 {{sendInfo.totalPoint}}</td>
                <td>数量 {{sendInfo.totalCount}}</td>
            </tr>
            <tr align="center" class="d" v-for="item in receiveInfos">
                <td>{{getTime(item.createTime)}}</td>
                <td>{{item.userId}}</td>
                <td>领取 金额{{item.receivePoint}}</td>
                <td></td>
                <td></td>
            </tr>
            <tr align="center" class="d" v-if="sendInfo.backStatus == 1">
                <td>{{getTime(sendInfo.createTime)}}</td>
                <td>剩余{{sendInfo.remainCount}}个红包因24小时无人领取退回</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr align="center" class="d" v-if="sendInfo.backStatus == 1">
                <td>{{getTime(sendInfo.createTime)}}</td>
                <td>本红包共退回{{sendInfo.backCount}}个，退回金额{{sendInfo.backPoint}}</td>
                <td></td>
                <td></td>
                <td></td>
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
  export default {
    data(){
      return {
        sendInfo:{},
        receiveInfos:[],
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
      params.append('id', this.$route.query.id);
      axios.post(this.HOST+'/manager/send/detail',params).then(res => {
          this.sendInfo = res.data.data.sendInfo;
          this.receiveInfos = res.data.data.receiveInfos;
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
.redbagdetail table{
  margin-bottom: 25px;
}
.table-title{
  font-weight: bold;
  margin: 10px 0;
}
</style>
