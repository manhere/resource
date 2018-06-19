<template>
  <div class="login">
    <table width="100%" height="100%">
      <tr height="41"><td class="logintb" colspan="2">&nbsp;</td></tr>
      <tr height="100%" class="loginbg">
        <td id="left_cont">
          <table width="100%" height="100%">
            <tr height="155"><td colspan="2">&nbsp;</td></tr>
            <tr>
              <td width="20%" rowspan="2">&nbsp;</td>
              <td width="60%">
                <table width="100%">
                    <tr height="70"><td align="right"></td></tr>
                    <tr height="274">
                        <td valign="top" align="right">
                            <img src="../../static/images/logo.png"/>
                          </img/>
                        </td>
                    </tr>
                </table>
              </td>
              <td width="15%" rowspan="2">&nbsp;</td>
            </tr>
            <tr><td colspan="2">&nbsp;</td></tr>
          </table>
        </td>
        <td id="right_cont">
          <table height="100%">
            <tr height="30%"><td colspan="3">&nbsp;</td></tr>
            <tr>
              <td width="30%" rowspan="5">&nbsp;</td>
              <td valign="top" id="form">

                    <table valign="top" width="50%">
                        <tr><td colspan="2"><h4 style="letter-spacing:1px;font-size:16px;">BTB管理后台</h4></td></tr>
                        <tr><td>管理员：</td><td><input type="text" v-model.trim="username" value="" /></td></tr>
                        <tr><td>密&nbsp;&nbsp;&nbsp;&nbsp;码：</td><td><input type="password" v-model.trim="pwd" value="" /></td></tr>
                        <!-- <tr><td>验证码：</td><td><input type="text" name="" value="" style="width:80px;"/></td></tr> -->
                        <tr class="bt" align="center"><td>&nbsp;<input type="submit" @click="login" value="登陆" /></td><td>&nbsp;</td></tr>
                    </table>

              </td>
              <td rowspan="5">&nbsp;</td>
            </tr>
            <tr><td colspan="3">&nbsp;</td></tr>
          </table>
        </td>
      </tr>
      <tr id="login_bot"><td colspan="2"><p>Copyright © 2017-{{getNowDate()}} Whjinran</p></td></tr>
    </table>
  </div>
</template>
<script>
  import axios from 'axios'
  axios.defaults.withCredentials = true
  export default{
    data(){
      return {
        username:'',
        pwd:''
      }
    },
    methods: {
      login() {
        var params = new URLSearchParams();
        params.append('username', this.username);
        params.append('password', this.pwd);
        axios.post(this.HOST+'/home/system/login',params).then(res => {
            if(res.data.code ==1){
              sessionStorage.username = this.username;
              this.$router.push({path:'/main'})
            }else{
              alert('登录失败')
            }
        })
      },
      getNowDate(){
        var d = new Date();
        return d.getFullYear();
      }
    }
  }
</script>
