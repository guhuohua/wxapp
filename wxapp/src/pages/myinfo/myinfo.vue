<template>
  <view class="page">
    <view class="page__bd">
      <view class="weui-toptips weui-toptips_warn" v-if="showTopTips">错误提示</view>

      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
            <view class="weui-label">用户名</view>
          </view>
          <view class="weui-cell__bd">
            <!-- <input class="weui-input" placeholder=""/> -->
            <div class="weui-input">{{userInfo.nickname}}</div>
          </view>
        </view>
        <!-- </view> -->

        <!-- <view class="weui-cells weui-cells_after-title"> -->
        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
            <view class="weui-label">手机号</view>
          </view>
          <view class="weui-cell__bd">
            <!-- <input class="weui-input" placeholder=""/> -->
            <div class="weui-input">{{userInfo.tel}}</div>
          </view>
        </view>
        <!-- </view> -->
        <!-- <view class="weui-cells weui-cells_after-title"> -->
        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
            <view class="weui-label">性别</view>
          </view>
          <view class="weui-cell__bd">
            <!-- <input class="weui-input" placeholder="男"/> -->
            <div class="weui-input">{{userInfo.gender === 1 ? '男' : '女'}}</div>
          </view>
        </view>
        <!-- </view> -->


        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
            <view class="weui-label">我的邀请码</view>
          </view>
          <view class="weui-cell__bd">
            <!-- <input class="weui-input" placeholder=""/> -->
            <div class="weui-input">{{userInfo.invitationCode}}</div>
          </view>
        </view>


        <!-- <view class="weui-cells weui-cells_after-title"> -->
        <!--<view class="weui-cell weui-cell_input">-->
          <!--<view class="weui-cell__hd">-->
            <!--<view class="weui-label">生日</view>-->
          <!--</view>-->
          <!--<view class="weui-cell__bd">-->
            <!--<picker mode="date" :value="date" start="1990-01-01" :end="nowDate" @change="bindDateChange">-->
              <!--<view class="weui-input">{{date}}</view>-->
            <!--</picker>-->
          <!--</view>-->
        <!--</view>-->
        <!--1.关于权限：
        开始是说没开发完，不好添加，一直没有添加，
        后来许总一直说权限问题，后来才一部分一部分添加，
        2.关于超级管理员：
        因为现在项目架构就是已session里的organizationId去完成一切请求操作
        所有存在2种情况：
            a.超级管理员没有orgId -> 解决方案：在检测到是超级管理员的时候让其选择要操作的组织机构
            b.默认orgId为1的是超级管理员，可以看到全部门店，可以编辑门店
        3.所说的原型修改是关于绑定微信公众号的信息，
        之前原型确实不能满足现在项目正常进入一个微信公众号的需求，
        在绑定公总号的菜单上做了一些调整

        接入一个微信服务号：
          1.appId
          2.secret
          3.密匙文件
        如果接入支付还需要
          1.mch_id
          2.支付key
        现在的原型上确实没有地方填写这些
        只有一个上传二维码-->



      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">消费总额</view>
        </view>
        <view class="weui-cell__bd">
          <!-- <input class="weui-input" placeholder=""/> -->
          <div class="weui-input">{{userInfo.moneyAllUsed}}</div>
        </view>
      </view>
      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">账户余额</view>
        </view>
        <view class="weui-cell__bd">
          <!-- <input class="weui-input" placeholder=""/> -->
          <div class="weui-input">{{userInfo.moneyCanUsed}}</div>
        </view>
      </view>
      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">获得赠送</view>
        </view>
        <view class="weui-cell__bd">
          <!-- <input class="weui-input" placeholder=""/> -->
          <div class="weui-input">{{userInfo.moneyLayered}}</div>
        </view>
      </view>
      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">积分</view>
        </view>
        <view class="weui-cell__bd">
          <!-- <input class="weui-input" placeholder=""/> -->
          <div class="weui-input">{{userInfo.integral}}</div>
        </view>
      </view>

      <!-- <view class="weui-cells__tips">底部说明文字底部说明文字</view> -->

      </view>
      <view class="weui-btn-area">
        <button class="weui-btn" type="primary" @click="showTopTips">确定</button>
      </view>
    </view>
  </view>
</template>

<script>
  import Splitter from "@/components/splitter";
  import com_orderlist from "@/components/com-orderList";
  import api from '../../api/api-user'

  export default {
    // 声明组件
    components: {Splitter, com_orderlist},

    data() {
      return {
        userInfo: {},
        date: '',
        nowDate: '',
      };
    },

    methods: {
      bindDateChange(e) {
        console.log(e);
        this.date = e.target.value
      },

      getNowFormatDate() {
        var date = new Date()
        var seperator1 = "-"
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = "0" + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate
        return currentdate
      }
    },

    onLoad: function (option) {
      this.nowDate = this.getNowFormatDate()
      console.log(this.nowDate)
      let that = this
      let id = this.GLOBAL.user.uId
      api.getUserInfo(id, res => {
        console.log('res', res)
        if (res.data.status === 1) {
          that.GLOBAL.user = res.data.res
          that.userInfo = res.data.res
          that.date = that.userInfo.birthday
        }
      })
    }
  };
</script>

<style>
</style>


