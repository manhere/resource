<template>
  <div>
    <table cellpadding="0" width="100%" class="header">
      <tr valign="top">
          <td width="50%"><h1 class="logotxt">BTB管理系统</h1></td>
          <td style="padding-top:10px;color:#fff;display:flex;justify-content: flex-end;padding-right:20px;">
            <span>管理员：<b>{{username}}</b> 您好，感谢登陆使用！</span>
            <a href="javascript:void(0)"><img style="border:none" src="../../static/images/out.gif" @click="logout" /></a>
          </td>
      </tr>
    </table>
    <div id="main">
      <section class="nav">
        <h1 class="type" @click="showCurr"  data-index="4">撒币广场</h1>
        <div class="content" v-if="curIndex == 4">
            <ul class="RM">
              <li><router-link to="/square/list">活动列表</router-link></li>
              <li><router-link to="/square/add">添加活动</router-link></li>
            </ul>
        </div>
        <h1 class="type" @click="showCurr"  data-index="0">会员管理</h1>
        <div class="content" v-if="curIndex == 0">
            <ul class="RM">
              <li><router-link to="/vips/list">会员列表</router-link></li>
            </ul>
        </div>
        <h1 class="type" @click="showCurr" data-index="1">红包管理</h1>
        <div class="content" v-if="curIndex == 1">
            <ul class="RM">
                <li><router-link to="/redbag">红包列表</router-link></li>
            </ul>
        </div>
        <h1 class="type" @click="showCurr" data-index="2">充值管理</h1>
        <div class="content" v-if="curIndex == 2">
            <ul class="RM">
                <li><router-link to="/charge">充值列表</router-link></li>
            </ul>
        </div>
        <h1 class="type" @click="showCurr" data-index="3">提现管理</h1>
        <div class="content" v-if="curIndex == 3">
            <ul class="RM">
                <li><router-link to="/cash">提现列表</router-link></li>
            </ul>
        </div>
      </section>
      <div class="info-wrap">
        <router-view></router-view>
      </div>
    </div>
    <p class="copyright">Copyright © 2017-{{getNowDate()}} Whjinran</p>
  </div>
</template>

<script>
  export default{
    mounted(){
      this.curIndex = this.$route.meta.id;
      this.username = sessionStorage.username;
    },
    data(){
      return {
        curIndex:-1,
        lastIndex:-1,
        username:''
      }
    },
    methods:{
      showCurr(e){
        if (this.lastIndex == e.target.dataset.index) {
            this.curIndex = -1;
            this.lastIndex = -1;
        } else {
            this.curIndex = e.target.dataset.index;
            this.lastIndex = e.target.dataset.index;
        }
      },
      getNowDate(){
        var d = new Date();
        return d.getFullYear();
      },
      logout(){
        sessionStorage.removeItem('username');
        this.$router.push({path:'/login'})
      }
    }
  }
</script>

<style>
.logotxt{
  color: #fff;
  font-size: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
}
.copyright{
  text-align: center;
  margin-top:20px;
  font-size: 15px;
}
</style>
