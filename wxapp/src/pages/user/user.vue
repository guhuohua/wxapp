<template>
  <div class="body">
    <div class="userInfo">
      <image class="userPhoto" :src="userPhoto"/>
      <div class="username">
        <button v-if="!hasUserInfo" plain='true' open-type='getUserInfo' @getuserinfo='onGotUserInfo'>{{loginStr}}
        </button>
        <div v-if="hasUserInfo">{{username}}</div>
        <div class="money" v-if="hasUserInfo">
          <image src="../../static/img/icon/meso.png"/>
          {{integral}}
          <image src="../../static/img/icon/money.png"/>
          {{money}}
        </div>
      </div>
    </div>
    <Splitter/>
    <div class="orderInfo">
      <div class="btn_ord" @click="linkOrder(1)">
        <image src="../../static/img/icon/buy.png"/>
        待付款
      </div>
      <div class="btn_ord" @click="linkOrder(2)">
        <image src="../../static/img/icon/order_01.png"/>
        待发货
      </div>
      <div class="btn_ord" @click="linkOrder(3)">
        <image src="../../static/img/icon/car.png"/>
        已发货
      </div>
      <div class="btn_ord" @click="linkOrder(4)">
        <image src="../../static/img/icon/selfbefor.png"/>
        已完成
      </div>
      <div class="btn_ord" @click="linkOrder(5)">
        <image src="../../static/img/icon/record.png"/>
        全部订单
      </div>
    </div>
    <Splitter/>
    <div class="other">
      <div class="btn_oth" @click="linkMenu(1)">
        <image class="left_icon" src="../../static/img/icon/info_edit.png"/>
        <div>我的信息</div>
        <image class="btn_right" src="../../static/img/icon/right.png"/>
      </div>
      <SplitterLine/>
      <div class="btn_oth" @click="linkMenu(4)">
        <image class="left_icon" src="../../static/img/icon/info_edit.png"/>
        <div>推广推荐</div>
        <image class="btn_right" src="../../static/img/icon/right.png"/>
      </div>
      <SplitterLine/>
      <!--<div class="btn_oth" @click="linkMenu(2)">-->
        <!--<image class="left_icon" src="../../static/img/icon/address.png"/>-->
        <!--<div>收货地址</div>-->
        <!--<image class="btn_right" src="../../static/img/icon/right.png"/>-->
      <!--</div>-->
      <!--<SplitterLine/>-->
      <!--<div class="btn_oth" @click="linkMenu(3)">-->
        <!--<image class="left_icon" src="../../static/img/icon/shop.png"/>-->
        <!--<div>订单售后</div>-->
        <!--<image class="btn_right" src="../../static/img/icon/right.png"/>-->
      <!--</div>-->
    </div>
    <!--<Splitter/>-->
    <!--<div class="btn_oth" @click="linkMenu(3)">-->
      <!--<image class="left_icon" src="../../static/img/icon/shop.png"/>-->
      <!--<div>#我的优惠券(beat02)</div>-->
      <!--<image class="btn_right" src="../../static/img/icon/right.png"/>-->
    <!--</div>-->
    <!--<SplitterLine/>-->
    <!--<div class="btn_oth" @click="linkMenu(3)">-->
      <!--<image class="left_icon" src="../../static/img/icon/shop.png"/>-->
      <!--<div>#车友圈(beat02)</div>-->
      <!--<image class="btn_right" src="../../static/img/icon/right.png"/>-->
    <!--</div>-->
    <!--<SplitterLine/>-->
    <Splitter/>
  </div>
</template>

<script>

  import Splitter from '@/components/splitter'
  import SplitterLine from '@/components/splitter-line'
  import api from '../../api/api-user'
  import show from '../../api/show-result'

  export default {

    components: {Splitter, SplitterLine},

    data() {
      return {
        hasUserInfo: false,
        userinfo: {},
        userPhoto: '',
        username: '',
        loginStr: '立即登录',
        money: 0,
        integral: 0
      }
    },

    methods: {

      onGotUserInfo: function (e) {
        // console.log(e)
        // console.log(e.mp.detail.userInfo)
        console.log(e.mp.detail);
        var tmp_data = e.mp.detail;

        // 获取微信jscode
        var code = '';
        let that = this
        if ('userInfo' in tmp_data) {
          this.userinfo = tmp_data.userInfo;
          // this.hasUserInfo = true;
          this.username = this.userinfo.nickName;
          this.userPhoto = this.userinfo.avatarUrl;
          this.GLOBAL.userinfo = this.userinfo;
        } else {
          this.loginStr = '重新登录';
        }
        console.log(this.GLOBAL.userinfo);

        wx.login({
          timeout: 5000,
          success: function (res) {
            console.log("login");
            console.log(res);
            code = res.code;

            // 查询用户信息
            api.getUserInfoFromServer(tmp_data, code, function (res) {
              if (!res) {
                console.log("调用失败");
              } else {
                console.log("用户信息：");
                console.log(res);
                let u = res.data.res
                that.GLOBAL.user = u;
                that.hasUserInfo = true
                that.money = u.moneyCanUsed
                that.integral = u.integral
              }
            });

          }
        });
      },

      // 链接到其他页面内容
      linkMenu: function (index) {
        console.log(index);
        var linkUrl = [
          'myinfo',
          'address',
          'test',
          'recommend'
        ];
        wx.navigateTo({
          url: '../' + linkUrl[index - 1] + '/main'
        })
      },

      linkOrder: function (index) {
        console.log(index);
        wx.navigateTo({
          url: '../orderList/main?id=' + index
        })
      }
    },
    computed: {

      showUserInfo() {
        let user = this.GLOBAL.user
        console.log("用户信息user  →  ", user)
        this.hasUserInfo = user.uid > 0 || user.uId > 0
        this.integral = user.integral
        this.money = user.moneyCanUsed
        this.userPhoto = user.photoImg
        this.username = user.nickname
      }
    },

    onLoad() {

      if (this.GLOBAL.userErrMsg != null) {
        show.show(false, this.GLOBAL.userErrMsg)
        this.GLOBAL.userErrMsg = null
      }

      let user = this.GLOBAL.user;
      console.log("user  →  ", user)
      if (user.uid != null || user.uId != null) {
        this.hasUserInfo = true
        this.userInfo = user
      }
    }
  }
</script>

<style scoped>

  .userInfo {
    background: rgb(240, 240, 240);
    height: 100px;
    display: flex;
    align-items: Center;
  }

  .userPhoto {
    height: 70px;
    width: 70px;
    border-radius: 50px;
    background: rgb(221, 221, 221);
    border: 1px solid rgba(248, 248, 248, 0.89);
    margin: 15px;
    display: inline-block;
  }

  .username {
    font-size: 18px;
    display: inline-block;
  }

  .money {
    margin-top: 5px;
    float: right;
  }

  .money image {
    width: 20px;
    height: 20px;
    margin: 0px 5px;
  }

  /* 订单 */
  .orderInfo {
    height: 80px;
    background: rgba(248, 248, 248, 0.89);
    font-size: 12px;
  }

  .btn_ord {
    display: inline-block;
    width: 20%;
    text-align: center;
    height: 100%;
  }

  .btn_ord image {
    display: block;
    height: 30px;
    width: 30px;
    margin: 5px auto;
    margin-top: 15px;
  }

  /* 其他 */
  .other {
    width: 100%;
    line-height: 30px;
  }

  .btn_oth {
    height: 50px;
    font-size: 14px;
    background: rgb(253, 253, 253);
    display: flex;
    align-items: Center;
  }

  .btn_oth .left_icon {
    margin: 10px;
    margin-left: 15px;
    height: 25px;
    width: 25px;
  }

  .btn_oth .btn_right {
    /* float: right; */
    position: absolute;
    right: 10px;
    height: 20px;
    width: 20px;
  }
</style>
