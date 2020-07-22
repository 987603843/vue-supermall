<template>
  <van-swipe :autoplay="3000" indicator-color="skyblue" :stop-propagation="false" >
    <van-swipe-item v-for="(item,index) in topImages" :key="index" class="swipe-item">
      <img :src="item" alt="" >
      </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name:'DetailSwiper',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.swipe-item{
height:250px;
}
.swipe-item img{
  
  width:100%;
}
</style>