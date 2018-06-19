<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '404 Not Found'
    }
  }
}
</script>
<style>
  .hello{
    text-align: center;
  }
  .hello h1{
    font-size: 30px;
    height: auto;
    width: 100%;
    margin-top: 5%;
  }
</style>
