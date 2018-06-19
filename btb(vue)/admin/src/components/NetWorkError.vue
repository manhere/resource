<template>
  <div v-if="isShow" class="pop">
    {{showTxt}}
  </div>
</template>

<script>
  export default {
    props: {
      isShow:Boolean,
      showTxt:String
    }
  }
</script>
<style scoped>
.pop{
  position: fixed;
  left: 50%;
  top: 50%;
  width: 100px;
  height: 100px;
  line-height:100px;
  border-radius:10px;
  margin:-50px 0 0 -50px;
  text-align:center;
  background-color: rgba(0, 0, 0, .54);
  z-index: 9999999;
  color:#fff;
}
</style>
