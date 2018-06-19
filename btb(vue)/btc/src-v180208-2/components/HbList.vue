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
    <section class="btnlist">
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
    <div class="sponsor">
        <p>数字币提供技术支持</p>
        <p>www.shuzibi.com</p>
    </div>
    <section class="asset" v-if="viewopt">
        <div class="wrap">
            <p>您的虚拟币资产<span>价值约{{hbinfo.pointPrice ? hbinfo.pointPrice:'0'}}元</span></p>
            <p class="gocash" @click="gocash">去提现</p>
        </div>
    </section>
    <div class="pop" v-if="cash">
        <div class="download">
            <h4 class="title">资金提现</h4>
            <p>请下载app<br>在移动端才能提现</p>
            <p @click="goDownload">去下载</p>
        </div>
    </div>
    <div class="opmask" v-if="cash"></div>
    <div class="loading" v-if="load">{{loadTxt}}</div>
  </section>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
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
      viewopt:true
    }
  },
  async mounted(){
    console.log(this.$route)
    this.load = true;
    this.activityId = sessionStorage.activityId;
    if('opt' in this.$route.params){
      this.viewopt = false;
    }
    var params = new URLSearchParams();
    params.append('activityId', this.activityId);
    axios.post(this.HOST + '/openRedbag',params).then(res => {
        console.log(JSON.parse(res.data));
        var obj = JSON.parse(res.data);
        if(obj.code != 0){
          this.hbinfo = obj.data;
          this.load = false;
        }
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
</style>