<template>
  <div class="body">
    <!--<view class="weui-search-bar">-->
      <!--<view class="weui-search-bar__form">-->
        <!--<view class="weui-search-bar__box">-->
          <!--<icon class="weui-icon-search_in-box" type="search" size="14"></icon>-->
          <!--<input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="inputVal" @focus="inputShowed" @input="inputTyping" />-->
          <!--<view class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">-->
            <!--<icon type="clear" size="14"></icon>-->
          <!--</view>-->
        <!--</view>-->
        <!--<label class="weui-search-bar__label" v-show="inputShowed" @click="showInput">-->
          <!--<icon class="weui-icon-search" type="search" size="14"></icon>-->
          <!--<view class="weui-search-bar__text">搜索</view>-->
        <!--</label>-->
      <!--</view>-->
      <!--<view class="weui-search-bar__cancel-btn" v-show="!inputShowed" @click="hideInput">取消</view>-->
    <!--</view>-->
    <div class="title_swiper">

      <!--<div class="serach_title">-->
        <!--<click-counter/>-->
      <!--</div>-->
      <swiper class="swiper_banner" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
        <block v-for="(item, index) in swiperGoodsList" :index="index" :key="index">
          <swiper-item>
            <image :src="item.imgUrl" class="slide-image" @click="clickGoods(item.gflag)"></image>
            <!--<image :src="item.imgUrl" class="slide-image" mode="aspectFill"/>-->
          </swiper-item>
        </block>
      </swiper>


      <!-- 分隔条 -->
      <splitter/>


      <div class="recommend cross">
        <div class="recommend_title">— 精品推荐 —</div>

        <scroll-view :style="{'height': '150px'}" :scroll-x="true" @scrolltolower="scrolltolower" @scroll="scroll">
          <block v-for="(item, index) in qualityList" :index="index" :key="index">
            <div class="goods_type01" @click="clickGoods(item.gflag)">
              <image :src="item.imgUrl" class="slide-image"/>
              <div class="goods_title">{{item.gtitle}}</div>
              <div class="goods_price">￥{{item.gprice}}</div>
            </div>
          </block>
        </scroll-view>
      </div>

      <!-- 分隔条 -->
      <splitter/>

      <div class="recommend vertical">
        <div class="recommend_title">— 热门推荐 —</div>
        <!-- <scroll-view  :style="{'height': '150px'}" :scroll-y="true" @scrolltolower="scrolltolower" @scroll="scroll" > -->
        <block v-for="(item, index) in hotGoodsList" :index="index" :key="index">
          <div class="goods_type02" @click="clickGoods(item.gflag)">
            <image :src="item.imgUrl" class="slide-image"/>
            <div class="goods_title">{{item.gtitle}}</div>
            <div class="goods_price">￥{{item.gprice}}</div>
          </div>
        </block>
        <!-- </scroll-view> -->
      </div>
    </div>
  </div>
</template>

<script>
  // 导入其他组件
  import ClickCounter from '@/components/search'
  import Splitter from '@/components/splitter'
  import api from '../../api/api-index'
  import show from '../../api/show-result'

  export default {
    // 声明当前组件下使用 click-counter 组件
    components: {ClickCounter, Splitter},
    data() {
      return {
        goodsList: [],
        qualityList: [],
        hotGoodsList: [],
        swiperGoodsList: [],
        imgUrls: []
      }
    },

    methods: {
      clickGoods (flag) {
        wx.navigateTo({
          url: '../goods/main?id=' + flag
        })
      },


      getInitInfo() {
        wx.showNavigationBarLoading(); //在标题栏中显示加载
        wx.showLoading({
          title: '数据加载中',
        })

        console.log(this.APPID);

        let that = this;
        console.log("获取服务器信息");

        // 获取首页滚动图
        api.getIndexSwiper(function (res) {
          let data = res.data;
          if (data.status == 1) {
            that.swiperGoodsList = data.res;
          }
        }, function () {
          show.show(false)
        })

        api.getIndexQualityList(function (res) {
          let data = res.data;
          if (data.status == 1) {
            that.qualityList = data.res;
          }
        }, function () {
          show.show(false)
        })

        api.getIndexHotList(function (res) {
          let data = res.data;
          if (data.status == 1) {
            that.hotGoodsList = data.res;
          }
        }, function () {
          show.show(false)
        })


        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        wx.hideLoading();
      }

    },

    onLoad(options) {
      this.getInitInfo()
    },

    onPullDownRefresh() {
      this.getInitInfo()
    }
  }
</script>

<style scoped>

  .body {
    background-color: rgb(219, 219, 219);
  }

  .title_swiper {
    height: 200px;
    /*background-color: gray*/
  }

  .swiper_banner {
    height: 100%;
    width: 100%;
  }

  .slide-image {
    height: 100%;
    width: 100%;
  }

  .serach_title {
    position: absolute;
    width: 100%;
    margin: 0px auto;
    left: 5%;
    top: 10px;
    z-index: 1;
  }

  .recommend {
    /* margin-top: 10px; */
    padding: 5px 10px;
    /* background-color: rgba(245, 245, 245, 0.966); */
    text-align: center;
    white-space: nowrap;
  }

  .recommend_title {
    font-size: 14px;
    margin-bottom: 5px;
    /* background-color: rgba(245, 245, 245, 0.966); */
  }

  /* 横向 */
  .cross {
    height: 175px;
  }

  .goods_type01 {
    width: 110px;
    height: 145px;
    /* background-color: rgb(250, 117, 117); */
    display: inline-block;
    font-size: 14px;
    overflow: hidden;

  }

  .goods_type01 image {
    height: 100px;
    width: 100px;
  }

  .goods_type01 .goods_title {
    bottom: 20px;
    left: 10px;
    padding: 0px 5px;
  }

  .goods_type01 .goods_price {
    color: red;
  }

  /* 纵向 */

  .vertical {
    /* background-color: rgba(245, 245, 245, 0.966); */
  }

  .goods_type02 {
    width: 167px;
    /* background: gold; */
    font-size: 14px;
    float: left;
    margin: 0px 5px;
    margin-bottom: 5px;
    overflow: hidden;
  }

  .goods_type02 image {
    width: 167px;
    height: 165px;
  }

  .goods_type02 .goods_title {
    bottom: 20px;
    left: 10px;
    padding: 0px 2.5px;
  }

  .goods_type02 .goods_price {
    color: red;
  }

  page {
    background-color: rgba(245, 245, 245, 0.966);
  }
</style>
