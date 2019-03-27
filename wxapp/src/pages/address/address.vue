<template>
    <div class="body">
        <div class="addr_list">
            <block v-for="(item, index) in addrList" :index="index" :key="index">
                <div class="list">
                  <div class="addr_statu">
                    <image @click="selectAddr(index)" :src="selected == index ? '../../static/img/icon/picked.png' : '../../static/img/icon/pick.png'" />
                  </div>
                  <div class="addr_info" @click="selectAddr(index)">
                    <div class="addr_name">{{item.nikename}}</div>
                    <div class="addr_tel">{{item.tel}}</div>
                    <div class="addr_addr">{{item.area}},{{item.addr}}</div>
                  </div>
                  <div class="addr_edit" @click="editAddr(index)">
                      编辑
                  </div>
                </div>
            </block>
        </div>
        <view class="weui-btn-area">
            <button class="weui-btn" type="primary" @click="btn_use">使用该收货地址</button>
            <button class="weui-btn" type="defult"  @click="btn_add">新增收货地址</button>
        </view>
    </div>
</template>

<script>

import api from '../../api/api-address'

export default {
  data() {
    return {
      btn_statu: false,
      selected: 0,
      addrList: [
       /* {
          id: 1,
          uId: 1,
          name: "球球球",
          tel: "1234567890",
          area: "湖北-武汉-洪山区",
          addr: "很长很长的地址花果山1号点"
        },
        {
          id: 2,
          uId: 1,
          name: "球球二号",
          tel: "9876543210",
          area: "湖北-武汉-洪山区",
          addr: "花果山2号点，不够啊，再长一点试试"
        },
        {
          id: 3,
          uId: 1,
          name: "球球三号",
          tel: "9876543210",
          area: "维吾尔族-维吾尔城-维吾尔街",
          addr: "花果山2号点，不够啊，再长一点试试"
        }*/
      ],
      name: "用户名"
    };
  },

  methods: {
    selectAddr(index) {
      this.selected = index
    },

    // 编辑地址
    editAddr(index) {
      let addr = this.addrList[index]
      console.log(addr)

      // 保存到其他地方，方便调用
      this.GLOBAL.addrNewAddr = {
        index: index,
        addr: addr
      }
      console.log("编辑新地址信息：")
      console.log(this.GLOBAL.addrNewAddr)

      wx.navigateTo({
        url: "../addAddress/main?op=edit"
      });

    },

    // 添加新地址
    btn_add: function() {
      this.GLOBAL.newAddress = null
      wx.navigateTo({
        url: "../addAddress/main?op=add"
      });
    },

    // 使用选中的地址
    btn_use: function() {
      let pages = getCurrentPages()
      // 保存到前一个页面的data
      let prevPage = pages[pages.length - 2]
      prevPage.setData({
        addr: this.addrList[this.selected],
        haveAddr: true
      })
      console.log(prevPage)
      wx.navigateBack({
        delta: 1
      })
    }
  },

  onLoad() {
    let that = this;
    let uid = this.GLOBAL.user.uId;
    // 获取到的地址信息
    api.getAddressInfoByUserId(uid, function (res) {
      let data = res.data;
      // console.log(res);
      if (data.status == 1) {
        that.addrList = data.res;
        console.log(that.addrList);
      }
    });
  },

  onShow() {
    if (this.GLOBAL.newAddress != null) {
      this.addrList.push(this.GLOBAL.newAddress)
      this.GLOBAL.newAddress = null
    }
  }
}
</script>

<style>
.body {
  border-top: 1px solid rgb(230, 230, 230);
}

.addr_statu{
  width: 15%;
  height: 100%;
  float: left;
  /* line-height: 80px; */
  text-align: center;
}

.addr_statu image{
  width: 30px;
  height: 30px;
  margin-top: 25px;
}

.add_list {
  padding: 10px;
  font-size: 14px;
  /* background: rgb(54, 165, 209); */
}

.list {
  height: 80px;
  width: 100%;
  border-bottom: 1px solid rgb(230, 230, 230);
}

.addr_info {
  /* display: inline-block; */
  float: left;
  width: 65%;

  /* background: rgb(230, 230, 230); */
  height: 100%;
}

.addr_name {
  margin-top: 5px;
  /* margin-left: 10px; */
  font-size: 16px;
  display: inline-block;
}

.addr_tel {
  margin-left: 10px;
  margin-top: 5px;
  font-size: 16px;
  display: inline-block;
  color: rgb(199, 199, 199);
}

.addr_addr {
  padding-right: 10px;
  font-size: 14px;
  /* margin-left: 10px; */
}

.addr_edit {
  width: 20%;
  display: inline-block;
  line-height: 80px;
  text-align: center;
  font-size: 14px;
  background: rgb(236, 236, 236);
}

.btn_add {
  width: 80%;
  margin: 10px 10%;
}
</style>


