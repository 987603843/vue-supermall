<template>
  <div class="tab-control">
    <div class="tabitem" v-for="(item,index) in titles" :key="item.label" 
                         :class="{active:index == currentindex}"
                         @click="itemclick(index)">
      <span>{{ item  }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentindex:0
    }
  },
  methods:{
    itemclick(index){
      this.currentindex=index;
      this.$emit('tabclick',index)
    }
  }
}
</script>

<style>
.tab-control{
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size:15px;
  background-color:#fff;
}
.tabitem{
  flex: 1;
}
.active{
  color:skyblue;
}
.active span{
  padding:3px;
  border-bottom:3px solid skyblue;
}
</style>