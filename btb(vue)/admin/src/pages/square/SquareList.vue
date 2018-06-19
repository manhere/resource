<template>
  <div class="squarelist">
    <div class="main-bread">
      <p class="lefttr"></p>
      <div class="bread-title"><p class="title">活动列表</p></div>
      <p class="navrb"></p>
    </div>
    <div class="main-content">
      <p class="maillbg"></p>
      <div class="main-wrap">
        <div class="search" style="padding-left:0;">
          <select v-model="queryType">
            <option value="">--请选择--</option>
            <option value="1">币种</option>
            <option value="2">活动名</option>
          </select>
          <input type="text" class="inp" v-model.trim="inptxt" placeholder="输入币种或活动名" />
          <input type="button" class="sbtn" value="搜索" @click="searchData" />
        </div>
        <table width="100%">
          <tr>
              <td colspan="2">
                  <form action="" method="">
                      <table width="100%"  class="cont tr_color">
                          <tr>
                            <th>活动ID</th>
                            <th>活动名称</th>
                            <th>币种</th>
                            <th>红包金额</th>
                            <th>红包个数</th>
                            <th>操作</th>
                          </tr>
                          <tr align="center" class="d" v-for="item in activitylist">
                            <td>{{item.id}}</td>
                            <td>{{item.title}}</td>
                            <td>{{item.btcType}}</td>
                            <td>{{item.point}}</td>
                            <td>{{item.count}}</td>
                            <td>
                              <router-link class="operatebtn" :to="{ path: 'modify', query: { id:item.id}}">修改</router-link>
                              <span class="operatebtn":data-id="item.id" v-if="item.status == 0" @click="upTime">上架</span>
                              <span class="operatebtn" :data-id="item.id" v-if="item.status == 1" @click="downTime">下架</span>
                              <router-link class="operatebtn" :to="{ path: 'detail', query: { id:item.id}}">查看</router-link>
                            </td>
                          </tr>
                      </table>
                  </form>
              </td>
            </tr>
        </table>
        <ul class="pagination" v-if="activitylist.length > pageSize">
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
  export default {
    data(){
      return {
        queryType:'',
        inptxt:'',
        hasMore:1,
        pageSize:10,
        pageIndex:1,
        activitylist:[],
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
      upTime(e) {
        this.isShow = true;
        this.showTxt = '加载中';
        var params = new URLSearchParams();
        params.append('id', e.target.dataset.id);
        params.append('status', 1);
        axios.post(this.HOST+'/manager/square/change',params).then(res => {
            var obj = JSON.parse(res.data);
            if(obj.code == 1){
              this.getData();
            }
            this.isShow = false;
        }).catch(err => {
          this.isShow = true;
          this.showTxt = '网络出错';
        });
      },
      downTime(e){
        this.isShow = true;
        this.showTxt = '加载中';
        var params = new URLSearchParams();
        params.append('id', e.target.dataset.id);
        params.append('status', 0);
        axios.post(this.HOST+'/manager/square/change',params).then(res => {
            var obj = JSON.parse(res.data);
            if(obj.code == 1){
              this.getData();
            }
            this.isShow = false;
        }).catch(err => {
          this.isShow = true;
          this.showTxt = '网络出错';
        });
      },
      getData(){
        this.isShow = true;
        this.showTxt = '加载中';
        var params = new URLSearchParams();
        switch(parseInt(this.queryType)){
          case '':
            break;
          case 1:
            params.append('queryType', this.queryType);
            params.append('btcType', this.inptxt);
            break;
          case 2:
            params.append('queryType', this.queryType);
            params.append('title', this.inptxt);
            break;
        }
        params.append('pageSize', this.pageSize);
        params.append('pageIndex', this.pageIndex);
        axios.post(this.HOST+'/manager/square/data',params).then(res => {
            var obj = JSON.parse(res.data);
            this.hasMore = obj.data.hasMore;
            this.pageIndex = obj.data.pageIndex;
            this.pageSize = obj.data.pageSize;
            this.activitylist = obj.data.recordList;
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
        this.inptxt='';
      }
    }
  }
</script>
<style>
.operatebtn{
  padding: 5px;
  text-align: center;
  color: #333;
  cursor: pointer;
  background-color: #fff;
  background-repeat: repeat-x;
  border-radius: 4px;
  border: 1px solid #333;
}
</style>
