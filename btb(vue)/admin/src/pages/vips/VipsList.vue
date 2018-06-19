<template>
  <div class="vipslist">
    <div class="main-bread">
      <p class="lefttr"></p>
      <div class="bread-title"><p class="title">会员列表</p></div>
      <p class="navrb"></p>
    </div>
    <div class="main-content">
      <p class="maillbg"></p>
      <div class="main-wrap">
        <div class="search">
          <select v-model="idType">
            <option value="">--请选择--</option>
            <option value="1">会员ID</option>
            <option value="2">手机号</option>
          </select>
          <input type="number" class="inp" v-model.trim.number="idValue" placeholder="请输入会员ID或手机号" />
          <input type="button" class="sbtn" value="搜索" @click="searchData" />
        </div>
        <table width="100%">
          <tr>
              <td colspan="2">
                  <form action="" method="">
                      <table width="100%"  class="cont tr_color">
                          <tr>
                              <th>会员ID</th>
                              <th>手机号</th>
                              <th>充值资产估值</th>
                              <th>领红包次数</th>
                              <th>领红包估值</th>
                              <th>发红包次数</th>
                              <th>发红包估值</th>
                              <th>提现资产估值</th>
                              <th>当前资产估值</th>
                              <th>明细</th>
                              <th>创建时间</th>
                          </tr>
                          <tr align="center" class="d" v-for="item in vipslist">
                              <td>{{item.userId}}</td>
                              <td>{{item.phone}}</td>
                              <td>￥{{item.rechargePoint}}</td>
                              <td>{{item.receiveCount}}</td>
                              <td>￥{{item.receivePoint}}</td>
                              <td>{{item.sendCount}}</td>
                              <td>￥{{item.sendPoint}}</td>
                              <td>￥{{item.orderPoint}}</td>
                              <td>￥{{item.mayPoint}}</td>
                              <td><router-link :to="{ path: 'detail', query: { id: item.userId }}">查看</router-link></td>
                              <td>{{getTime(item.createTime)}}</td>
                          </tr>
                      </table>
                  </form>
              </td>
            </tr>
        </table>
        <ul class="pagination">
          <li v-if="pageIndex > 1" @click="prevPage"><span>上一页</span></li>
          <li v-if="hasMore > 0" @click="nextPage"><span>下一页</span></li>
        </ul>
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
      idType:'',
      idValue:'',
      hasMore:1,
      pageSize:10,
      pageIndex:1,
      vipslist:[],
      isShow:false,
      showTxt:'加载中'
    }
  },
  components: {
    'net-error':NetError
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.isShow = true;
      this.showTxt = '加载中';
        var params = new URLSearchParams();
        switch(parseInt(this.idType)){
          case 1:
            params.append('idType', this.idType);
            params.append('userId', this.idValue);
            break;
          case 2:
            params.append('idType', this.idType);
            params.append('phone', this.idValue);
            break;
        }
        params.append('pageSize', this.pageSize);
        params.append('pageIndex', this.pageIndex);
        axios.post(this.HOST+'/manager/user/data',params).then(res => {
            this.hasMore = res.data.data.hasMore;
            this.pageSize = res.data.data.pageSize;
            this.pageIndex = res.data.data.pageIndex;
            this.vipslist = res.data.data.recordList;
            this.isShow = false;
        }).catch(err => {
          this.isShow = true;
          this.showTxt = '网络出错';
        });

    },
    prevPage(){
      this.pageIndex -= 1;
      this.getData();
    },
    nextPage(){
      this.pageIndex += 1;
      this.getData();
    },
    searchData(){
      this.getData();
      this.idValue = '';
    },
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
