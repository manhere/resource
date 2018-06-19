<template>
  <div class="redbag">
    <div class="main-bread">
      <p class="lefttr"></p>
      <div class="bread-title"><p class="title">红包列表</p></div>
      <p class="navrb"></p>
    </div>
    <div class="main-content">
      <p class="maillbg"></p>
      <div class="main-wrap">
        <div class="search">
          <select v-model="btcType">
            <option value="">所有币种</option>
            <option v-for="item in coinType" :value="item.symbol">{{item.symbol}}</option>
          </select>
          <select v-model="idType" style="margin-left:10px;">
            <option value="">--请选择--</option>
            <template v-for="item in selectopt">
              <option :value="item.tp">{{item.val}}</option>
            </template>
          </select>
          <input type="number" class="inp" v-model.trim.number="idValue" style="margin-left:2px;" />
          <input type="button" class="sbtn" value="搜索" @click="searchData" />
        </div>
        <table width="100%">
          <tr>
              <td colspan="2">
                  <form action="" method="">
                      <table width="100%"  class="cont tr_color">
                          <tr>
                            <th>红包ID</th>
                            <th>创建时间</th>
                            <th>红包币种</th>
                            <th>红包金额</th>
                            <th>红包估值</th>
                            <th>红包数量</th>
                            <th>被领数量</th>
                            <th>剩余数量</th>
                            <th>退回数量</th>
                            <th>创建者ID</th>
                            <th>创建者手机号</th>
                            <th>详情</th>
                          </tr>
                          <tr align="center" class="d" v-for="item in redbaglist">
                            <td>{{item.id}}</td>
                            <td>{{getTime(item.createTime)}}</td>
                            <td>{{item.btcType}}</td>
                            <td>{{item.totalPoint}}</td>
                            <td>￥{{item.valuationPoint}}</td>
                            <td>{{item.totalCount}}</td>
                            <td>{{item.receiveCount}}</td>
                            <td>{{item.remainCount}}</td>
                            <td>{{item.backCount}}</td>
                            <td>{{item.userId}}</td>
                            <td>{{item.phone}}</td>
                            <td><router-link :to="{ path: 'detail', query: { id:item.id}}">查看</router-link></td>
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
  export default {
    data(){
      return {
        coinType:[],
        selectopt:[{tp:1,val:'红包ID'},{tp:2,val:'会员ID'},{tp:3,val:'手机号'}],
        btcType:'',
        idValue:'',
        idType:'',
        hasMore:1,
        pageSize:10,
        pageIndex:1,
        redbaglist:[],
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
      axios.post(this.HOST+'/manager/send/init').then(res => {
          this.coinType = res.data.data;
          this.isShow = false;
      }).catch(err => {
        this.isShow = true;
        this.showTxt = '网络出错';
      });
      this.getData();
    },
    methods: {
      getData() {
        this.isShow = true;
        this.showTxt = '加载中';
        var params = new URLSearchParams();
        params.append('btcType', this.btcType);
        switch(this.idType){
          case 1:
            params.append('id', this.idValue);
            break;
          case 2:
            params.append('userId', this.idValue);
            break;
          case 3:
            params.append('phone', this.idValue);
            break;
        }
        params.append('idType', this.idType);
        params.append('pageSize', this.pageSize);
        params.append('pageIndex', this.pageIndex);
        axios.post(this.HOST+'/manager/send/data',params).then(res => {
            this.hasMore = res.data.data.hasMore;
            this.pageIndex = res.data.data.pageIndex;
            this.pageSize = res.data.data.pageSize;
            this.redbaglist = res.data.data.recordList;
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
      getTime(date){
        var d = new Date(date);
        return d.getFullYear()+'-'+this.fNumber((d.getMonth()+1))+'-'+this.fNumber(d.getDate())+" "+this.fNumber(d.getHours())+':'+this.fNumber(d.getMinutes())+':'+this.fNumber(d.getSeconds());
      },
      fNumber(n){
        n = n.toString()
        return n[1] ? n : '0' + n
      },
      searchData(){
        this.getData();
        this.idValue = '';
      }
    }
  }
</script>
