<template>
  <div class="weui-panel">

    <view class="weui-cells__title">我的推荐信息</view>
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">我的推广码</view>
        </view>
        <view class="weui-cell__bd">
          <input class="weui-input" disabled v-model="myCode"/>
        </view>
      </view>
      <view class="weui-cell weui-cell_input weui-cell_vcode">
        <view class="weui-cell__hd">
          <view class="weui-label">我的推广人</view>
        </view>
        <view class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入他人的推广码" v-model="otherCode"/>
        </view>
        <view class="weui-cell__ft">
          <view class="weui-vcode-btn" @click="updateInvitationInfo">确认</view>
        </view>
      </view>
    </view>

    <div class="weui-cells__title">我推荐的：{{dataList.length}}</div>
    <div class="weui-cells" style="margin-top: 5px;">
      <div class="weui-cell" v-for="(item, index) in dataList" :index="index" :key="index">
        <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <img :src="item.photoUrl" style="width: 50px;height: 50px;display: block"/>
          <!--<span class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;"></span>-->
        </div>
        <div class="weui-cell__bd">
          <p>{{item.name}}</p>
          <p style="font-size: 13px;color: #888888;" v-text="item.time"></p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import mpvuePicker from 'mpvue-picker';
  import api from '../../api/api-user'
  import show from '../../api/show-result'
  import timeUtil from '../../utils/TimeUtils'

  export default {
    components: {
      mpvuePicker
    },
    data() {
      return {
        canSet: 0,
        myCode: '',
        otherCode: '',
        dataList: [],
      };
    },

    methods: {

      parseTimeUtil(time) {
        return timeUtil.formatDate(new Date(time))
      },

      updateInvitationInfo() {
        if (this.canSet == 0) {
          this.otherCode = this.GLOBAL.user.recommendName
          return
        }
        let that = this;
        console.log("this.otherCode  →  ", this.otherCode)
        let from = {
          id: this.GLOBAL.user.uId,
          code: this.otherCode
        }
        api.updateInvitationInfo(from, (res) => {
          if (res.data.status == 1) {
            // 返回邀请人昵称
            that.otherCode = res.data.res
            show.show(true, '操作成功！')
            that.canSet = 0
          } else {
            show.show(false, res.data.msg)
          }
        })
      }

    },

    onLoad() {
      let that = this
      let id = this.GLOBAL.user.uId
      this.myCode = this.GLOBAL.user.invitationCode
      if (this.GLOBAL.user.recommendName == null) {
        this.canSet = 1;
        console.log('this.canSet', this.canSet);
      }

      // 将推荐人填写为他人的名称
      this.otherCode = this.GLOBAL.user.recommendName;
      api.getInvitationInfo(id, (res) => {
        if (res.data.status == 1) {
          let arr = res.data.res
          arr.forEach(function (item) {
            item.time = '推荐时间 ' +  that.parseTimeUtil(item.time);
          })
          that.dataList = arr
        }
      })
    }
  };
</script>

<style scoped>

</style>
