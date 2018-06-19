<template>
  <div class="chargelist">
    <div class="main-bread">
      <p class="lefttr"></p>
      <div class="bread-title"><p class="title">充值列表</p></div>
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
          <select v-model="idType">
            <option value="">--请选择--</option>
            <option value="2">会员ID</option>
            <option value="1">充值ID</option>
          </select>
          <input type="number" class="inp" v-model="idValue" placeholder="充值ID或会员ID" />
          <input type="button" class="sbtn" value="搜索" @click="searchParam" />
        </div>
        <table width="100%">
          <tr>
              <td colspan="2">
                  <form action="" method="">
                      <table width="100%"  class="cont tr_color">
                          <tr>
                            <th>充值ID</th>
                            <th>充值币种</th>
                            <th>充值金额</th>
                            <th>会员ID</th>
                            <th>充值时间</th>
                          </tr>
                          <tr align="center" class="d" v-for="item in chargelist">
                            <td>{{item.id}}</td>
                            <td>{{item.btcType}}</td>
                            <td>{{item.point}}</td>
                            <td>{{item.userId}}</td>
                            <td>{{getTime(item.createTime)}}</td>
                          </tr>
                      </table>
                  </form>
              </td>
            </tr>
        </table>
        <ul class="pagination" v-if="chargelist.length > pageSize">
          <li v-if="pageIndex > 1" @click="prevPage"><span>上一页</span></li>
          <li v-else-if="hasMore > 0" @click="nextPage"><span>下一页</span></li>
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
      return {
        coinType:[],
        btcType:'',
        userId:'',
        idType:'',
        idValue:'',
        pageSize:10,
        pageIndex:1,
        hasMore:1,
        chargelist:[],
        isShow:false,
        showTxt:'加载中'
      }
    },
    components: {
      'net-error':NetError
    },
    created(){
      this.isShow = true;
      this.showTxt = '加载中';
      axios.post(this.HOST+'/manager/recharge/init').then(res => {
          this.coinType = res.data.data;
          this.isShow = false;
      }).catch(err => {
        this.isShow = true;
        this.showTxt = '网络出错';
      });

      this.getData();

    },
    methods:{
      getData(){
          this.isShow = true;
          this.showTxt = '加载中';
          var params = new URLSearchParams();
          switch (parseInt(this.idType)) {
            case 1:
              params.append('id', this.idValue);
              break;
            case 2:
              params.append('userId', this.idValue);
              break;
          }
          params.append('btcType', this.btcType);
          params.append('idType', this.idType);
          params.append('pageSize', this.pageSize);
          params.append('pageIndex', this.pageIndex);
          axios.post(this.HOST+'/manager/recharge/data',params).then(res => {
              this.pageSize = res.data.data.pageSize;
              this.pageIndex = res.data.data.pageIndex;
              this.hasMore = res.data.data.hasMore;
              this.chargelist = res.data.data.recordList;
              this.isShow = false;
          }).catch(err => {
            this.isShow = true;
            this.showTxt = '网络出错';
          });
      },
      searchParam(){
        this.getData();
        this.idValue = '';
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
      }
    }
  }
</script>
