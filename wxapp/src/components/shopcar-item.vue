<template>
  <div class="list_item">
    <div class="pick">
      <image class="del" v-bind:src="selImgUrl" @click="choose()"/>
    </div>
    <div class="body">
      <image class="pic" src="../../static/img/goods/pic01.jpg" />
      <div class="title">{{goods.title}}</div>
      <div class="price">￥{{goods.price * count}}</div>
      <div class="specs">{{goods.disc}}</div>
      <div class="option">
        <div class="small sub" @click="sub">-</div>
        <div class="small num">{{count}}</div>
        <div class="small add" @click="add">+</div>
      </div>
      <div class="del_img" @click="delSelf">
        <image class="del" src="../../static/img/icon/delect.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selImgUrl: '../../static/img/icon/pick.png',
      msg: '购物车',
      count: 1,
      select: false,
      item: {},
      goods: {
        id: 1,
        title: '3D亮白堵雨条',
        price: this.item.id,
        disc: '颜色：白色；镀银;'
      }
    }
  },
  props: ['item'],
  methods: {
    choose (item) {
      this.select = !this.select
      this.selImgUrl = this.select ? '../../static/img/icon/picked.png' : '../../static/img/icon/pick.png'
    },

    add () {
      this.count = this.count + 1
      this.updatuAllprice()
    },

    sub () {
      this.count = this.count - 1
      this.updatuAllprice()
    },

    updatuAllprice () {
      let allPrice = this.count * this.goods.price
      this.$emit('getChildPrice', {count: this.count, price: allPrice})
      console.log(allPrice + ', ' + this.count)
    },

    delSelf () {
      console.log('子节点 删除：' + this.item)
      this.$emit('delChild', this.item)
    }
  },

}
</script>

<style scoped>
.list_item {
  width: 100%;
  height: 120px;
  /* background: salmon; */
}

/* ---------------左边 */
.pick{
  width: 13%;
  line-height: 120px;
  text-align: center;
  display: inline-block;
}

.body{
  width: 87%;
  /* position: absolute; */
  display: inline-block;
  top: 10px;
}

.pick image{
  /* margin-top: 45px; */
  position: relative;
  top: -90px;
  height: 30px;
  width: 30px;
  display: inline-block;
}

/* ---------------右边 */
.pic{
  width: 100px;
  height: 100px;
  margin-top: 10px;
  border-radius: 3px;
  display: inline-block;
}

/* 标题 */
.title{
  position: relative;
  display: inline-block;
  left: 10px;
  top: -65px;
  font-size: 14px;
  width: 130px;
}
/* 规格文字信息 */
.specs{
  font-size: 14px;
  color: rgba(197, 197, 197, 0.87);
  position: relative;
  left: 110px;
  top: -60px;
  display: inline-block;
}

.price{
  position: relative;
  display: inline-block;
  right: -15px;
  top: -85px;
  font-size: 16px;
  color: red;
}

.option{
  position: relative;
  left: -25px;
  top: -30px;
  display: inline-block;
  color: rgb(163, 163, 163);
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid rgb(199, 199, 199);
  overflow: hidden;
  /* background: rgb(230, 230, 230); */
  background: rgb(255, 255, 255);
  padding: 0px 5px;
  height: 24px;
}

.sub{
  width: 10px;
}
.add{
  width: 10px;
}

.num{
  background: white;
  padding: 0px 10px;
  border-left: 1px solid rgb(199, 199, 199);
  border-right: 1px solid rgb(199, 199, 199);
}

.small{
  float: left;
  margin: 0px 5px;
  line-height: 24px;
  height: 24px;
}

.del{
  width: 24px;
  height: 24px;
}

.del_img{
  position: relative;
  right: -290px;
  top: -70px;
  bottom: 10px;
}
</style>
