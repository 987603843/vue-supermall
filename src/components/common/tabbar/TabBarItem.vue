<template>
  <div class='tab-bar-item' @click='itemclick'>
    <div v-if="!isActive"><slot name='item-icon'></slot></div>
    <div v-else><slot name='item-icon-active'></slot></div>
    <div :style='activestyle'><slot name='item-text'></slot></div>
  </div>
</template>

<script>
export default {
   name:'TabBarItem',
   props:{
     path:String,
     activecolor:{
       type:String,
       default:'red'
     }
   },
   data(){
     return{
      //  isActive:true
     }
   },
   computed: {
     isActive(){
       return this.$route.path.indexOf(this.path)!==-1
     },
     activestyle(){
       return this.isActive?{color:this.activecolor}:{}
     }
   },
   methods: {
     itemclick(){
       if(this.$route.path!=this.path){
         this.$router.replace(this.path)
       }
     }
   },
}
</script>

<style>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  height: 24px;
  width: 24px;
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
}

</style>