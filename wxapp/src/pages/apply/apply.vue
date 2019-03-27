<template>
  <view class="page">
    <view class="container">
      <div class="inp_context username">
        <span class="iconfont inp">&#xe6b6;<span class="title">姓名：</span></span>
        <input class="inputText" placeholder="请输入您的姓名" v-model="nickname"/>
      </div>
      <div class="inp_context username">
        <span class="iconfont inp">&#xe61b;<span class="title">手机号：</span></span>
        <input class="inputText" placeholder="请输入手机号码" v-model="tel"/>
      </div>

      <div class="inp_context username">
        <span class="iconfont inp">&#xe679;<span class="title">邀请码：</span></span>
        <input class="inputText" placeholder="没有可不填" v-model="code"/>
      </div>

      <div class="inp_context username">
        <span class="iconfont inp">&#xe609;<span class="title">备注：</span></span>
        <input class="inputText" placeholder="请输入备注信息" v-model="note"/>
      </div>

      <!--<view class="login-icon">
        <image class="login-img" :src="loginImg"></image>
      </view>-->
      <!--<view class="login-from">
        <view class="inputView">
          <image class="nameImage" src="../../static/img/icon/tel.png"></image>
          <label class="loginLab">手机号码：</label>
          <input class="inputText" placeholder="请输入手机号码" v-model="tel"/>
        </view>
        <view class="line"></view>
        <view class="inputView">
          <image class="nameImage" src="../../static/img/icon/user.png"></image>
          <label class="loginLab">姓名：</label>
          <input class="inputText" placeholder="请输入您的姓名" v-model="nickname"/>
        </view>
        <view class="line"></view>
        <view class="inputView">
          <image class="nameImage" src="../../static/img/icon/note.png"></image>
          <label class="loginLab">备注：</label>
          <input class="inputText" placeholder="请输入备注信息" v-model="note"/>
        </view>

      </view>-->
      <view class="loginBtnView">
        <button class="loginBtn" plain='true' open-type='getUserInfo' @getuserinfo='onGotUserInfo'>申请账号</button>
        <button class="loginBtn2" type="default" @click="toBack">返回首页</button>
      </view>
    </view>
  </view>
</template>

<script>
  // 导入其他组件
  import Splitter from '@/components/splitter'
  import api from '../../api/api-user'
  import show from '../../api/show-result'

  export default {
    components: {Splitter},
    data() {
      return {
        tel: '',
        nickname: '',
        code: '',
        note: '',
        loginImg: 'http://117.50.74.117:8080/image/login.jpg'
      }
    },

    methods: {

      onGotUserInfo: function (e) {
        let that = this

        // 判断是否有填写个人信息
        if (this.tel.length <= 0) {
          show.show(false, "请输入手机号码")
          return
        }

        if (this.nickname.length <= 0) {
          show.show(false, "请输入姓名")
          return
        }

        let userData = e.mp.detail
        // console.log('userData: ', userData);

        // 获取微信jscode
        let code = ''

        if ('userInfo' in userData) {
          this.GLOBAL.userinfo = userData.userInfo;

          // 替换rawData为申请信息
          userData.rawData = {
            tel: this.tel,
            nickname: this.nickname,
            note: this.note,
            code: this.code
          }

          // console.log('rawData', userData.rawData);
        } else {
          show.show(false, "获取信息失败")
          return;
        }
        // console.log(this.GLOBAL.userinfo);

        wx.login({
          timeout: 5000,
          success: function (res) {
            console.log("login", res)
            code = res.code
            // 查询用户信息
            api.applyAccount(userData, code, function (res) {
              if (res.data != null) {
                console.log('res.data.res', res.data.res)
                let title = res.data.res || '服务器异常'
                wx.showModal({
                  content: title,
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }
                });
              }
            });
          }
        });
      },

      toBack() {
        wx.navigateBack({
          delta: 1
        })
      }
    },
  }
</script>

<style scoped>

  .page {
    position: fixed;
    height: 100%;
    width: 100%;
    align-items: center;
  }
  .inp_context{
    font-size: 18px;
    background: white;
    display: inline-block;
    /*margin: 0px auto;*/
    width: 80%;
    padding: 8px 10%;
    /*background: #0bb20c;*/
  }
  .username{
    /*border-top: 1px solid gray;*/
    border-top: 1px solid #959595;
  }
  .password{
    /*border-top: 1px solid gray;*/
    /*border-bottom: 1px solid gray;*/
  }
  .inputText {
    display: inline-block;
    position: relative;
    margin-left: 5px;
    top: 4px;
    /*width: 60%;*/
    font-size: 14px;
  }


  .title{
    display: inline-block;
    font-size: 16px;
    color: gray;
    width: 70px;
  }
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    box-sizing: border-box;
    background-color: #f2f2f2
  }

  /*登录图片*/
  .login-icon {
    flex: none;
  }

  .login-img {
    width: 100%;
  }




  /*按钮*/
  .loginBtnView {
    width: 100%;
    height: auto;
    background-color: #f2f2f2;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;
  }

  .loginBtn {
    width: 80%;
    margin-top: 35px;
  }

  .loginBtn2 {
    width: 80%;
    margin-top: 20px;
  }
</style>
