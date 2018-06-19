<template>
  <div class="squareadd">
    <div class="main-bread">
      <p class="lefttr"></p>
      <div class="bread-title"><p class="title">添加会员</p></div>
      <p class="navrb"></p>
    </div>
    <div class="main-content">
      <p class="maillbg"></p>
      <div class="main-wrap">
          <table width="100%" class="cont">
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td width="5%">活动名称：</td>
                  <td width="20%"><input class="inp" type="text" v-model.trim="sqname" /></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td width="5%">活动标题：</td>
                  <td width="20%"><input class="inp" type="text" v-model.trim="sub_title" /></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td>活动图片：</td>
                  <td width="20%"><input type="file" name="sqimg" @change="uploadFile" /></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>活动描述：</td>
                  <td><textarea class="inp" v-model.trim="sqdetail"></textarea></td>
                  <td class="errinfo"></td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>币种：</td>
                  <td>
                      <select v-model="coinType">
                        <option value="">所有币种</option>
                        <option v-for="item in coinlist" :value="item.symbol">{{item.symbol}}</option>
                      </select>
                  </td>
                  <td class="errinfo"></td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td>充值地址：</td>
                  <td width="20%"><input class="inp" type="text" v-model.trim="addr" /></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td>红包金额：</td>
                  <td width="20%"><input class="inp" type="number" v-model.trim="hbmoney" value="" /></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td>红包个数：</td>
                  <td width="20%"><input class="inp" type="number" v-model.trim="hbnum" value="" /></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td>红包头像：</td>
                  <td width="20%"><input type="file" name="hbavater" @change="uploadFile" /></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td>红包昵称：</td>
                  <td width="20%"><input class="inp" type="text" v-model.trim="hbnickname" value="" /></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td>红包描述：</td>
                  <td width="20%"><input class="inp" type="text" v-model.trim="hbdetail" value="" /></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td>上架时间：</td>
                  <td width="20%"><date-picker placeholder="选择日期" v-model="grounddate" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true" ></date-picker></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td>下架时间：</td>
                  <td width="20%"><date-picker placeholder="选择日期" v-model="undercarriage" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true"></date-picker></td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td width="2%">&nbsp;</td>
                  <td>分享状态：</td>
                  <td width="20%">
                    <select v-model="shareStatus">
                      <option value="0">分享</option>
                      <option value="1">不分享</option>
                    </select>
                  </td>
                  <td class="errinfo"></td>
                  <td width="2%">&nbsp;</td>
              </tr>
              <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td><input class="sbtn" type="button" value="提交" @click="addSquare" /></td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
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
axios.defaults.withCredentials = true
import NetError from '@/components/NetWorkError'
import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';
export default{
  data(){
    return {
      sqname:'',
      sub_title:'',
      sqimg:'',
      sqdetail:'',
      coinType:'',
      addr:'',
      hbmoney:'',
      hbnum:'',
      hbavater:'',
      hbnickname:'',
      hbdetail:'',
      grounddate:'',
      undercarriage:'',
      shareStatus:0,
      coinlist:[],
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
    axios.post(this.HOST+'/manager/square/init').then(res => {
      var obj = JSON.parse(res.data);
      this.coinlist = obj.data.currencyTypeInfos;
      this.isShow = false;
    }).catch(err => {
      this.isShow = true;
      this.showTxt = '网络出错';
    });
  },
  components:{
      'date-picker': myDatepicker
  },
  methods: {
    uploadFile(e) {
      this.isShow = true;
      this.showTxt = '加载中';
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append('uploadFile',file,file.name);//通过append向form对象添加数据
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };
      axios.post(this.HOST+'/manager/square/upload',param,config)
      .then(res=>{
        if(e.target.name == 'sqimg'){
          this.sqimg = res.data.data.imgUrl;
        }else if(e.target.name == 'hbavater'){
          this.hbavater = res.data.data.imgUrl;
        }
        this.isShow = false;
      })
    },
    addSquare(){
      if(this.valFormData()){
        this.isShow = true;
        this.showTxt = '加载中';
        var params = new URLSearchParams();
        params.append('title', this.sqname);
        params.append('subTitle', this.sub_title);
        params.append('activityImg', this.sqimg);
        params.append('activityDes', this.sqdetail);
        params.append('btcType', this.coinType);
        params.append('rechargeUrl', this.addr);
        params.append('point', this.hbmoney);
        params.append('count', this.hbnum);
        params.append('img', this.hbavater);
        params.append('nickname', this.hbnickname);
        params.append('redbagDes', this.hbdetail);
        params.append('shareStatus', this.shareStatus);
        params.append('upTime', new Date(this.grounddate).getTime());
        params.append('downTime', new Date(this.undercarriage).getTime());
        axios.post(this.HOST+'/manager/square/save',params).then(res => {
          this.isShow = false;
          this.$router.push({path:'/square'});
        }).catch(err => {
          this.isShow = true;
          this.showTxt = '网络出错';
        });
      }
    },
    valFormData(){
      var flag = true;
      if(this.sqimg && this.sqdetail && this.coinType && this.addr && this.hbmoney && this.hbnum && this.hbavater && this.hbnickname && this.hbdetail && this.grounddate && this.undercarriage){
        if(this.valPrice(this.hbmoney)){
          if(/^-?\d+$/.test(this.hbnum)){
            flag = true;
          }else{
            flag = false;
            alert('请输入正确的红包个数')
          }
        }else{
          flag = false;
          alert('请输入正确的红包金额')
        }
      }else{
        flag = false;
        alert('输入信息不能为空')
      }
      return flag;
    },
    valPrice(str){
      str = str.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      str = str.replace(/^\./g, ""); //验证第一个字符是数字而不是.
      str = str.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      str = str.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      str = str.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
      return str;
    }
  }
}
</script>
<style>
.squareadd input[type=text],.squareadd textarea{
  width:68%;
}
.squareadd select{
  width:75%;
}
.errinfo{
  color:red;
}
</style>
