<template>
  <section>
    <div class="hongbao" :class="{'hongbaoanmate':godown}">
        <div class="hbtop" :class="{'hbanmate':goup}">
            <img :src="hbinfo.headImg" alt="">
            <p class="username">{{hbinfo.nickName}}</p>
            <p>{{hbinfo.title}}</p>
            <p class="slogan">{{hbinfo.sentiment}}</p>
            <div id="chai" @click="showChaiAnimate" :class="{'rotate':rotate}" v-if="animdone"><span>开</span></div>
        </div>
        <p class="viewdetail" @click="viewLucky"><span>看看大家手气</span></p>
    </div>
    <div class="sponsor">
        <p>数字币提供技术支持</p>
        <p>www.shuzibi.com</p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
export default {
  name: 'hb',
  data(){
    return {
      rotate: false,
      godown:false,
      goup:false,
      animdone:true,
      hbinfo:{},
      activityId:''
    }
  },
  async created(){    
    console.log(this.getQueryString())
    sessionStorage.activityId = this.getQueryString();
    this.activityId = this.getQueryString();
    // this.activityId = this.getQueryString();
    var params = new URLSearchParams();
    params.append('activityId', this.activityId);
    console.log(this.HOST)
    console.log(this.activityId)
    axios.post(this.HOST + '/enterReceivePage',params).then(res => {
        console.log(JSON.parse(res.data));
        var obj = JSON.parse(res.data);
        this.hbinfo = obj.data;
    }).catch(err => {
        console.log(err);
    });
  },
  methods:{
      showChaiAnimate(){
            this.rotate = true;
            setTimeout(function() {
                this.animdone = false;
                this.godown = true;
                this.goup = true;
                this.goNextPage();
            }.bind(this), 3000);
      },
      getQueryString() {
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?")
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
        var arr=str.split("&"); //各个参数放到数组里
        for(var i=0;i < arr.length;i++){
              num=arr[i].indexOf("=");
              if(num>0){
                  if(arr[i].substring(0,num) == "activityId"){
                    return (arr[i].substr(num+1)).slice(0,-2);
                  }
              }
        }
      },
      goNextPage(){
            setTimeout(function() {
              if(this.hbinfo.registerStatus == 1){
                this.$router.push({name:'list',params:{activityId:this.activityId}})
              }else{
                this.$router.push({name:'reg',params:{activityId:this.activityId}})
              }
            }.bind(this), 500);
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
      viewLucky(){
        this.$router.push({name:'list',params:{activityId:this.activityId}})
      }
  }
}
</script>

<style>
.hongbao {
    -webkit-border-radius: .16rem;
    -moz-border-radius: .16rem;
    border-radius: .16rem;
    background-color: #dbb354;
    -webkit-box-shadow: 0 .02rem .16rem rgba(139, 98, 0, .54);
    -moz-box-shadow: 0 .02rem .16rem rgba(139, 98, 0, .54);
    box-shadow: 0 .02rem .16rem rgba(139, 98, 0, .54);
    color: #fff;
    height: 9.6rem;
    width: 6.54rem;
    margin: .48rem auto 1.02rem;
}

.hbtop {
    -webkit-border-radius: .16rem .16rem 50% 50% / .16rem .16rem 25% 25%;
    -moz-border-radius: .16rem .16rem 50% 50% / .16rem .16rem 25% 25%;
    border-radius: .16rem .16rem 50% 50% / .16rem .16rem 25% 25%;
    background-color: #e0c56b;
    -webkit-box-shadow: 0 .02rem .04rem rgba(151, 116, 0, .12), inset 0 -.02rem .04rem rgba(255, 239, 187, .54);
    -moz-box-shadow: 0 .02rem .04rem rgba(151, 116, 0, .12), inset 0 -.02rem .04rem rgba(255, 239, 187, .54);
    box-shadow: 0 .02rem .04rem rgba(151, 116, 0, .12), inset 0 -.02rem .04rem rgba(255, 239, 187, .54);
    text-align: center;
    position: relative;
    padding-bottom: 1.96rem;
}

.hongbao img {
    border-radius: 50%;
    width: 1.28rem;
    height: 1.28rem;
    margin-top: .8rem;
}

.username {
    font-size: .32rem;
    margin-top: .32rem;
    margin-bottom: .24rem;
}

#chai {
    width: 1.92rem;
    height: 1.92rem;
    text-align: center;
    line-height: 1.92rem;
    border-radius: 50%;
    background-color: #fef1ba;
    box-shadow: 0 .04rem .08rem rgba(173, 129, 26, .54);
    position: absolute;
    left: 2.31rem;
    bottom: -.7rem;
}

#chai span {
    font-size: .8rem;
    color: #333;
}

.slogan {
    font-size: .4rem;
    margin-top: .8rem;
}

.viewdetail {
    margin-top: 1.64rem;
    text-align: center;
    padding-bottom: .82rem;
}

.viewdetail span {
    color: #f1e2a4;
    position: relative;
}

.viewdetail span::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: -.37rem;
    width: 0;
    height: 0;
    border: .12rem solid;
    margin-top: -.12rem;
    border-color: transparent transparent transparent #dbb354;
}

.viewdetail span::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: -.4rem;
    width: 0;
    height: 0;
    border: .12rem solid;
    margin-top: -.12rem;
    border-color: transparent transparent transparent #f1e2a4;
}

.rotate {
    -webkit-animation: anim .6s infinite alternate;
    -ms-animation: anim .6s infinite alternate;
    animation: anim .6s infinite alternate;
}

@-webkit-keyframes anim {
    from {
        -webkit-transform: rotateY(180deg);
    }
    to {
        -webkit-transform: rotateY(360deg);
    }
}

@-ms-keyframes anim {
    from {
        -ms-transform: rotateY(180deg);
    }
    to {
        -ms-transform: rotateY(360deg);
    }
}

@keyframes anim {
    from {
        transform: rotateY(180deg);
    }
    to {
        transform: rotateY(360deg);
    }
}

.hongbaoanmate{
    animation: godown .5s;
}

@keyframes godown {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(120%);
    }
}
.hbanmate{
    animation: goup .5s;
}

@keyframes goup {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-312%);
    }
}
</style>