<template>
  <div class="title">
      <input class="inp_serach" type="text" placeholder="搜索">
  </div>
</template>

<script>
export default {
  date () {
    return {
      msg: '搜索'
    }
  },

  methods: {
  }
}
</script>

<style>
.title {
  position: absolute;
  text-align: center;
  width: 85%;
  margin: 0px auto;
  border: 1px solid gray;
  background-color: #FFF;
  border-radius: 5px;
  padding: 6px;
  opacity: 0.7;
}

.inp_serach{
  text-align: center;
  z-index: 1;
}

</style>


