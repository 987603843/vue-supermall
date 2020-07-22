<template>
  <div>
     <nav-bar>
       <div slot="left" @click="backclick">
         <img src="~assets/img/common/back.svg" alt="">
       </div>
      <div slot="center" class='title'>
       <div v-for="(item,index) in titles" :key="item.index" :class="{active:index == currentindex}" @click="itemclick(index)" class="title-item">
          {{item}}
       </div>
      </div>
     </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
export default {
   name:'DetailNavBar',
   data(){
     return{
       titles:['商品','参数','评论','推荐'],
       currentindex:0
     }
   },
   components:{
     NavBar
   },
   methods:{
     itemclick(index){
       this.currentindex=index
     },
     backclick(){
       this.$router.back()
     }
   }
}
</script>

<style>
.title{
  display:flex;
  font-size:13px;
}
.title-item{
  flex:1;
}
.active{
  color:skyblue;
}
</style>