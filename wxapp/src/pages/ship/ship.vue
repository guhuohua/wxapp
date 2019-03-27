<template>
  <div class="body">
    <div class="shipInfo">
      <p>订单号：{{shipSn}}</p>
      <p>快递公司：{{comCode}}</p>
    </div>
    <div class="shinData">
      <div class="dataSpilce" v-for="(item, index) in deliveryInfo" :key="index" :index="index">
        <p class="time">{{item.ftime}}</p>
        <p class="context">{{item.context}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import show from '../../api/show-result'
  import api from '../../api/api-order'
  export default {
    data() {
      return {
        shipSn: '',
        comCode: '',
        deliveryInfo: []
      };
    },
    methods: {
      physicalOrder(shipSn) {
        let that = this
        this.shipSn = shipSn
        wx.request({
          url: 'http://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=' + shipSn,
          // url: 'http://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=3379390063473',
          data: {resultv2: 1, text: shipSn},
          method: 'POST',
          success: function (res) {
            // console.log('res:true', res)
            // console.log('res.auto', res.data.auto)
            let comCode = res.data.auto[0].comCode
            that.comCode = comCode
            wx.request({
              url: 'http://www.kuaidi100.com/query?type=' + comCode + '&postid=' + shipSn,
              // url: 'http://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=3379390063473',
              method: 'GET',
              success: function (res) {
                let data = res.data.data;
                console.log('data', data)
                that.deliveryInfo = data
              }
            })
          },
          fail: function (res) {
            show.show(false, '查询失败')
          }
        });
      },
      physicalOrder2(shipSn) {
        let that = this
        api.physicalOrder(shipSn, function (res) {
          if (res.data.status === 1) {
            console.log('res.data.res', res.data.res)
            that.deliveryInfo = res.data.res
          }
        });
      }

    },
    onLoad(ship) {
      console.log('ship', ship)
      this.shipSn = ship.shipSn
      this.comCode = ship.comCode
      this.physicalOrder2(this.shipSn)
    }
  };
</script>

<style scoped>
  .body {
    font-size: 14px;
  }

  .shipInfo {
    padding: 20px;
    border-top: 8px solid #cccccc;
    border-bottom: 8px solid #cccccc;
  }

  .shinData {
    padding: 20px;
  }

  .dataSpilce {
    /*border-bottom: 1px solid #b4b4b4;*/
    margin-top: 5px;
  }

  .time {
    font-size: 12px;
    color: #878787;
  }
</style>
