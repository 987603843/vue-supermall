<template>
  <van-swipe :autoplay="3000" indicator-color="skyblue" :stop-propagation="false">
    <van-swipe-item v-for="(item,index) in banners" :key="index" class="swipe-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageload">
      </a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>

export default {
   name:'HomeSwiper',
   data() {
     return {
       isload:false
     }
   },
   props:{
     banners:{
       type:Array,
       default(){
         return []
       }
     }
   },
   methods: {
     imageload(){
         if(!this.isload){
           this.$emit('swipeload')
           this.isload=true
         }
     }
   },
}
</script>

<style scoped> 
 .swipe-item img{
   width: 100%;
   height: 100%;
 }
</style>