<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topimage"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
            <detail-params-info :paramInfo="paramInfo"/>
            <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
        </scroll>
    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topimage: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo:{},
      };
    },
    created() {
      this.iid = this.$route.params.iid;

      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result;
        this.topimage = data.itemInfo.topImages
        //获取整合后的数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取店铺详情信息数据
        this.shop = new Shop(data.shopInfo)

        //获取商品详情数据
        this.detailInfo = data.detailInfo

        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //获取评论
        if (data.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Scroll,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo
    }
  };
</script>

<style scoped>
    #detail {
        height: 100vh;
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        /* 减号两边必须留空格 不然无效 */
        height: calc(100% - 44px);

    }
</style>
