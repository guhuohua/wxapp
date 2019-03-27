<script>
  export default {
    created () {
      console.log('Mini app created!!!' + Date())
      console.log("环境：  →  ", process.env.NODE_ENV === 'development' ? 'dev' : 'env')
      const BaseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080'
        : 'http://qqmxd.xyz:10030';
      console.log("BaseUrl  →  ", BaseUrl)
    }
  }
</script>

<style>
  @import '../static/iconfont.css';

  .container {
    background-color: #ccc;
  }
</style>
