<template>
  <div class="squarelist">
    <div class="main-bread">
      <p class="lefttr"></p>
      <div class="bread-title"><p class="title">活动详情</p></div>
      <p class="navrb"></p>
    </div>
    <div class="main-content">
      <p class="maillbg"></p>
      <div class="main-wrap">
        <table width="100%" class="cont">
            <tr>
                <td width="2%">&nbsp;</td>
                <td width="5%">活动名称：</td>
                <td width="20%"><input class="inp" type="text" v-model.trim="activity.title" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td width="5%">活动标题：</td>
                <td width="20%"><input class="inp" type="text" v-model.trim="activity.subTitle" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td>活动图片：</td>
                <td width="20%"><input type="file" name="activityImg" @change="uploadFile" /><img :src="activity.activityImg" class="imgwrap" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>活动描述：</td>
                <td><textarea class="inp" v-model.trim="activity.activityDes"></textarea></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>币种：</td>
                <td>
                    <select v-model="activity.btcType">
                      <option v-for="item in coinlist" :value="item.symbol" :selected="activity.btcType == item.symbol">{{item.symbol}}</option>
                    </select>
                </td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td>充值地址：</td>
                <td width="20%"><input class="inp" type="text" v-model.trim="activity.rechargeUrl" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td>红包金额：</td>
                <td width="20%"><input class="inp" type="number" v-model.trim="activity.point" value="" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td>红包个数：</td>
                <td width="20%"><input class="inp" type="number" v-model.trim="activity.count" value="" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td>红包头像：</td>
                <td width="20%"><input type="file" name="img" @change="uploadFile" /><img :src="activity.img" class="imgwrap" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td>红包昵称：</td>
                <td width="20%"><input class="inp" type="text" v-model.trim="activity.nickname" value="" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td>红包描述：</td>
                <td width="20%"><input class="inp" type="text" v-model.trim="activity.redbagDes" value="" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td>上架时间：</td>
                <td width="20%"><input class="inp" type="date" v-model="activity.upTime" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td>下架时间：</td>
                <td width="20%"><input class="inp" type="date" v-model="activity.downTime" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td width="2%">&nbsp;</td>
                <td>分享状态：</td>
                <td width="20%">
                  <select v-model="activity.shareStatus">
                    <option value="0">分享</option>
                    <option value="1">不分享</option>
                  </select>
                </td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td><input class="sbtn" type="button" value="保存" @click="saveInfos" /></td>
                <td width="2%" class="errinfo"></td>
                <td width="71%">&nbsp;</td>
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
        activity:{},
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

      var params = new URLSearchParams();
      params.append('id', this.$route.query.id);
      axios.post(this.HOST+'/manager/square/forward',params).then(res => {
          res.data.data.upTime = this.getTime(res.data.data.upTime);
          res.data.data.downTime = this.getTime(res.data.data.downTime);
          res.data.data.shareStatus = res.data.data.shareStatus ? res.data.data.shareStatus : 0;
          this.activity = res.data.data;
          this.isShow = false;
      }).catch(err => {
        this.isShow = true;
        this.showTxt = '网络出错';
      });
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
          if(e.target.name == 'activityImg'){
            this.activity.activityImg = res.data.data.imgUrl;
          }else if(e.target.name == 'img'){
            this.activity.img = res.data.data.imgUrl;
          }
          this.isShow = false;
        })
      },
      getTime(date){
        var d = new Date(date);
        return d.getFullYear()+'-'+this.fNumber((d.getMonth()+1))+'-'+this.fNumber(d.getDate());
      },
      getTimeSamp(date){
        return new Date(date).getTime();
      },
      fNumber(n){
        n = n.toString()
        return n[1] ? n : '0' + n
      },
      check(str){
          str=str.toString();
          if(str.length<2){
              str='0'+ str;
          }
          return str;
      },
      saveInfos(){
        if(this.valFormData()){
          this.isShow = true;
          this.showTxt = '加载中';
          var params = new URLSearchParams();
          params.append('id', this.activity.id);
          params.append('title', this.activity.title);
          params.append('subTitle', this.activity.subTitle);
          params.append('activityImg', this.activity.activityImg);
          params.append('activityDes', this.activity.activityDes);
          params.append('btcType', this.activity.btcType);
          params.append('rechargeUrl', this.activity.rechargeUrl);
          params.append('point', this.activity.point);
          params.append('count', this.activity.count);
          params.append('img', this.activity.img);
          params.append('nickname', this.activity.nickname);
          params.append('redbagDes', this.activity.redbagDes);
          params.append('shareStatus', this.activity.shareStatus);
          params.append('upTime', new Date(this.activity.upTime).getTime());
          params.append('downTime', new Date(this.activity.downTime).getTime());
          axios.post(this.HOST+'/manager/square/update',params).then(res => {
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
        if(this.activity.activityImg && this.activity.activityDes && this.activity.btcType && this.activity.rechargeUrl && this.activity.point && this.activity.count && this.activity.img && this.activity.nickname && this.activity.redbagDes && this.activity.upTime && this.activity.downTime){
          if(this.valPrice(this.activity.point)){
            if(/^-?\d+$/.test(this.activity.count)){
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
.imgwrap{
  max-width:150px;
  max-height:150px;
}
</style>
