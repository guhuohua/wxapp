<template>
  <div class="body">
    <SplitterLine/>
    <div class="l_bd">
      <block v-for='(item, index) in typeList' :index='index' :key='index'>
        <div :class="'typeItem' + (select_flag == index ? ' btn_select' : '')" :id="item.gtId"
             @click="changeNodeList(index)">
          {{item.name}}
        </div>
      </block>
    </div>
    <div class="r_bd" v-if="typeList.length > 0">
      <block v-for='(item, index) in typeList[flag].nodes' :index='index' :key='index'>
        <div class="nodeItem" @click="getTypeGoodsList(item.gtId)">
          <!--<image src="../../static/img/goods/pic01.jpg" />-->
          <image class="img_icon" :src="item.icon"/>
          {{item.name}}
        </div>
      </block>
    </div>
  </div>
</template>

<script>

  import SplitterLine from '@/components/splitter-line'
  import api from '../../api/api-goods'

  export default {

    components: {SplitterLine},

    data() {
      return {
        flag: 0,
        select_flag: 0,
        gtId: 0,
        node: {
          name: '分类名',
          icon: 'icon'
        },

        typeList: []
      }
    },

    methods: {
      changeNodeList: function (index) {
        console.log(index);
        this.select_flag = index;
        this.flag = index;

      },

      getTypeGoodsList: function (id) {
        console.log('id', id);
        wx.navigateTo({
          url: '../typeGoodsList/main?id=' + id
        })
      }

    },

    onLoad() {

      let that = this;

      api.getGoodsTypeList(function (res) {
        let data = res.data;
        if (data.status == 1) {
          that.typeList = data.res;
        }
      });

      /*wx.request({
        url: "http://localhost:8080/type/select",
        success: function (res) {
          let data = res.data;
          if (data.status == 1) {
            that.typeList = data.res;
          }
        }
      });*/

      // let that = this;
      // api.getGoodsTypeList(
      //   function (res) {
      //     let data = res.data;
      //     if (data.status == 1) {
      //       that.goodsList = data.res;
      //     }
      //   }
      // );
    }
  }
</script>

<style scoped>

  .body {
    font-size: 14px;
  }

  .l_bd {
    /* margin-top: 1px; */
    width: 20%;
    height: 100%;
    line-height: 30px;
    /* display: inline-block; */
    background: rgb(245, 245, 245);
    font-size: 14px;
    color: rgb(88, 88, 88);
    text-align: center;
    /* position: fixed; */
    float: left;
  }

  .typeItem {
    border-bottom: 1px solid rgb(231, 231, 231);
    height: 40px;
    line-height: 40px;
    /* margin-bottom: 5px; */
  }

  .btn_select {
    background: white;
    color: #ff6e4c;
  }

  .r_bd {
    /* margin-top: 1px; */
    width: 80%;
    background: white;
    padding: 10px 0px;
    /* position: absolute; */
    right: 0px;
    top: 0px;
    /* display: inline-block; */
    float: left;
    /* text-align: center */
  }

  .nodeItem {
    width: 33%;
    display: inline-block;
    font-size: 14px;
    text-align: center;
    margin-bottom: 10px;
  }

  .nodeItem image {
    width: 80px;
    height: 80px;
    display: block;
    margin: 0px auto;
    margin-bottom: 5px;
  }

</style>
