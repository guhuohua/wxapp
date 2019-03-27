<template>
  <view class="page">
    <view class="container">
      <view class="login-icon">
        <image class="login-img" :src="loginImg"></image>
      </view>

      <div class="inp_context username">
        <span class="iconfont inp">&#xe6b6;<span class="title">账号：</span></span>
        <input class="inputText" placeholder="请输入账号" v-model="username"/>
      </div>
      <div class="inp_context password">
        <span class="iconfont inp">&#xe619;<span class="title">密码：</span></span>
        <input class="inputText" password="true" placeholder="请输入密码" v-model="password"/>
      </div>

      <view class="loginBtnView">
        <button class="loginBtn" type="primary" @click="userLogin">立即登录</button>
        <!--<button class="loginBtn2" type="default" @click="getUserInfo">进入商城</button>-->
        <!--<button class="loginBtn2" v-if="!hasUserInfo" plain='true' open-type='getUserInfo' @getuserinfo='onGotUserInfo'>进入商城</button>-->
        <button class="loginBtn2" type="default" @click="toApply">申请账号</button>
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
        username: '',
        password: '',
        usernameErr: false,
        passwordErr: false,
        loginImg: 'http://117.50.74.117:8080/image/login.jpg'
      }
    },

    methods: {
      userLogin() {
        if (this.username.length <= 0) {
          show.show(false, "请输入账号")
          return;
        }

        if (this.password.length <= 0) {
          show.show(false, "请输入密码")
          return;
        }

        api.userLogin(this.username, this.password, this.loginSuccess);
      },

      loginSuccess(res) {
        console.log("res:", res);
        let user = {};
        let data = res.data
        if (data.status == 1) {
          user = data.res
          this.GLOBAL.user = user;
          console.log("用户登录成功！", user);
          wx.switchTab({
            url: '../index/main'
          })
          console.log("跳转结束");
        } else {
          show.show(false, "账号或密码错误")
        }
      },

      toApply() {
        wx.navigateTo({
          url: '../apply/main'
        })
      },
      onGotUserInfo: function (e) {
        let that = this
        let userData = e.mp.detail
        console.log('userData: ', userData);

        // 获取微信jscode
        let code = ''

        if ('userInfo' in userData) {
          that.GLOBAL.userinfo = userData.userInfo;

          // 替换rawData为申请信息
          userData.rawData = {
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
            api.getUserInfoFromServer(userData, code, function (res) {
              if (!res) {
                // console.log("调用失败");
                show.show(false, "拉取信息失败")
              } else {
                console.log("用户信息：");
                console.log(res);
                let user = res.data.res
                that.GLOBAL.user = user
                wx.switchTab({
                  url: '../index/main'
                })
              }
            });
          }
        });
      },
    },
    onLoad() {
    }
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
    font-size: 16px;
    background: white;
    display: inline-block;
    /*margin: 0px auto;*/
    width: 80%;
    padding: 8px 10%;
    /*background: #0bb20c;*/
  }
  .username{
    /*border-top: 1px solid gray;*/
    border-bottom: 1px solid #959595;
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
    font-size: 14px;
    color: gray;
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
