<template>
  <view class="page">
    <view class="page__bd">
      <view class="weui-search-bar">
        <view class="weui-search-bar__form">
          <view class="weui-search-bar__box">
            <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
            <input type="text" class="weui-search-bar__input" :placeholder="keyword" v-model="inputVal"
                   @click="showInput" @input="inputKeyword"/>
            <view class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
              <icon type="clear" size="14"></icon>
            </view>
          </view>
          <label class="weui-search-bar__label" v-show="inputShowed" @click="showInput">
            <icon class="weui-icon-search" type="search" size="14"></icon>
            <view class="weui-search-bar__text">搜索</view>
          </label>
        </view>
        <view class="weui-search-bar__cancel-btn" v-show="!inputShowed" @click="hideInput">取消</view>
      </view>

      <view class="weui-cells searchbar-result" v-if="inputVal.length > 0">

        <view class="weui-cell" hover-class="weui-cell_active">
          <view class="weui-cell__bd" @click="search(inputVal)">
            <view>{{inputVal}}</view>
          </view>
        </view>

        <block v-for="(item, index) in keyList" :index="index" :key="index">
          <view class="weui-cell" hover-class="weui-cell_active">
            <view class="weui-cell__bd" @click="search(item.keyword)">
              <view>{{item.keyword}}</view>
            </view>
          </view>
        </block>
      </view>
    </view>
    <div class="recommend vertical">
      <div class="recommend_title">&nbsp;</div>
      <scroll-view :style="{'height': '100%'}" :scroll-y="true" @scrolltolower="scrolltolower" @scroll="scroll">
        <block v-for="(item, index) in goodsList" :index="index" :key="index">
          <div class="goods_type02" @click="clickGoods(item.gflag)">
            <image :src="item.imgUrl" class="slide-image"/>
            <div class="goods_title">{{item.title}}</div>
            <div class="goods_price">￥{{item.price}}</div>
          </div>
        </block>
      </scroll-view>
    </div>
  </view>
</template>

<script>
  import api from '../../api/api-goods'
  import show from "../../api/show-result";

  export default {
    data() {
      return {
        keyList: [],
        keyword: '收索',
        typeId: 1,
        inputShowed: true,
        inputVal: "",
        goodsList: [],
        imgUrls: []
      };
    },
    methods: {
      clickGoods(flag) {
        wx.navigateTo({
          url: "../goods/main?id=" + flag
        });
      },

      showInput: function () {
        this.inputShowed = false
      },
      hideInput: function () {
        this.inputVal = ""
        this.inputShowed = true;
      },
      clearInput: function () {
        this.inputVal = ""
      },

      inputKeyword: function () {
        let that = this
        if (this.inputVal.length > 0) {
          api.getKeywordList(this.inputVal, function (res) {
            if (res.data.status == 1) {
              that.keyList = res.data.res;
              if (that.keyList.length > 0) {
                if (that.keyList[0].keyword == that.inputVal) {
                  that.keyList.splice(0, 1);
                }
              }
            }
          });
        }
      },
      search: function (key) {
        let that = this
        let id = this.GLOBAL.user.uId
        // id = 1
        api.searchGoods({
          id: id,
          key: key,
          type: that.typeId
        }, function (res) {
          if (res.data.status == 1) {
            that.goodsList = res.data.res;
          } else {
            show.show(false, "未找到此类商品")
          }
        })
        this.keyword = key
        this.inputVal = ''
      }
    },

    onLoad(op) {
      let that = this;
      this.typeId = op.id
      api.getGoodsByTypeId(op.id,
        function (res) {
          let data = res.data;
          if (data.status == 1) {
            that.goodsList = data.res;
            console.log(data.res);
          }
        }
      );
    }
  }
</script>

<style scoped>
  /* 纵向 */

  .vertical {
    /* background-color: rgba(245, 245, 245, 0.966); */
    text-align: center;
  }

  .goods_type02 {
    width: 42.5%;
    /* width: 167px; */
    /* background: gold; */
    font-size: 14px;
    float: left;
    padding-left: 5%;
    /* margin: 0px 5px; */
    margin-bottom: 5px;
  }

  .goods_type02 image {
    width: 167px;
    height: 165px;
  }

  .goods_type02 .goods_title {
    bottom: 20px;
    left: 10px;
    height: 25px;
    overflow: hidden;
  }

  .goods_type02 .goods_price {
    color: red;
  }

  page {
    background-color: rgba(245, 245, 245, 0.966);
  }
</style>
