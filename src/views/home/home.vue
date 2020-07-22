<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabclick="tabclick" ref="tabcontrol1" v-show="isfixed"/>
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentscroll"  :pullUpLoad="true" @pullingUp="loadmore">
 <home-swiper :banners="banners" @swipeload="swipescroll" />
  <recommend-view :recommends="recommends"  />
  <feature-view/>
  <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabclick="tabclick" ref="tabcontrol2"/>
  <goods-list :goods="showGoods" />
 </scroll>
 <back-top @click.native="backclick" v-show="isShow" />
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home';
export default { 
   name:'home',
   components:{
     NavBar,
     TabControl,
     GoodsList,
     Scroll,
     BackTop,
     HomeSwiper,
     RecommendView,
     FeatureView
   },
   data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShow:false,
        taboffsettop:0,
        isfixed:false,
        saveY:0
      }
   },
   computed: {
     showGoods(){
       return this.goods[this.currentType].list
     }
   },
 
    activated() {
     this.$refs.scroll.scroll.scrollTo(0,this.saveY)
     this.$refs.scroll.refresh()
     
   },
   deactivated() {
     this.saveY = this.$refs.scroll.getscrolly()
   
   },
   created() {
     this.getHomeMultidata()
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
     
     
     
    
   },
   mounted() {
     const refresh = this.debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('imgload',()=>{
      //  console.log('-----')
      refresh()
     })
   },

   methods: {
     loadmore(){
       this.getHomeGoods(this.currentType)
     },
    //防抖动函数
     debounce(func,delay){
       let timer=null
       return function(...args){
          if(timer) clearTimeout(timer)
          timer = setTimeout(()=>{
            func.apply(this,args)
          },delay)
       }
     },
    
    //  事件监听方法
     tabclick(index){
       switch(index){
         case 0:
           this.currentType='pop'
           break
         case 1:
           this.currentType='new'
           break
         case 2:
           this.currentType='sell'
           break    
       }
       this.$refs.tabcontrol1.currentindex=index;
       this.$refs.tabcontrol2.currentindex=index;
     },
    //网络请求方法
     getHomeMultidata(){
           getHomeMultidata().then(res =>{
           this.banners=res.data.banner.list
           this.recommends=res.data.recommend.list
     })
     },
     getHomeGoods(type){
       const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          
          this.$refs.scroll.finishPullUp()
     })
     },
     backclick(){
     this.$refs.scroll.scroll.scrollTo(0,0,500)
   },
   contentscroll(position){
     //决定是否显示backtop
     this.isShow = (-position.y)>1000
      //决定是否吸顶
     this.isfixed = (-position.y)>this.taboffsettop
   },
   swipescroll(){
     //获取tabcontrol的offsettop值
     this.taboffsettop = this.$refs.tabcontrol2.$el.offsetTop
     
   }
   },
   
   
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
 .home-nav{
   background-color: skyblue;
   color: #fff;
   position:fixed;
   left:0;
   right:0;
   top:0;
   z-index:9;
 }
 .tab-control{
   position: sticky;
   top: 44px;
   z-index: 9;
 }
 .content{
   overflow: hidden;
   position:absolute;
   top:44px;
   bottom: 49px;
   left: 0;
   right: 0;
 }
</style>