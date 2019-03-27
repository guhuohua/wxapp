<template>
  <div class="splitter" :ttt="bgcolor" :style="'height: ' + ( h == null ? '10' : h ) + 'px; background: ' + ( bgcolor == null ? 'rgba(221, 221, 221, 0.863)' : ('#' + bgcolor)) + ';'"></div>
</template>

<script>
export default {
  date () {
    return {
    }
  },

  methods: {
  },

  props: ['h', 'bgcolor']
}
</script>

<style scoped>
</style>


