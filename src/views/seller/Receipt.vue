<style lang="scss" scoped>
.search{
  width: 100%;
  height:55px;
  border-top: 1px #999 solid;
  border-bottom: 1px #999 solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchbox{
  width: 90%;
  height:34px;
  background: #ccc;
  border-radius: 20px;
  line-height: 34px;
  padding: 0 15px;
  box-sizing: border-box;
}
.allorder{
  width: 100%;
  height: auto;
}
.nav{
  width: 100%;
  height: 44px;
}
.nav ul{
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px #999;
}
.nav ul li{
  width: 33%;
  text-align: center;
}
.bscroll{
        width: 100%;
        height: 530px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .bscroll-container ul{
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .bscroll-container ul li{
      width: 90%;
      height: 120px;
      margin-top: 10px;
      box-shadow: 2px 2px 8px #999;
    }
    .itemtop{
      width: 100%;
      height: 44px;
      background: #F8F8F8 ;
      display: flex;
      // justify-content: center;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .itembottom{
      width: 100%;
      height: 76px;
      padding: 0 15px;
      box-sizing: border-box;
    }
    .itembottom p{
      font-size: 14px;
      line-height: 25px;
    }
    .itembottom .total{
      color:#F2922F;
    }
    .itembottom .takegods{
      color: #999;
    }
    .itembottom .takegods span{
      color:#000;
    }
</style>
<template>
  <div class="receipt-box">
     <Head title="订单明细"/>
     <div class="search">
       <div class="searchbox">请输入商品名称/收件人手机号</div>
     </div>
      <div class="allorder">
        <div class="nav">
          <ul>
             <li><span>起始日期</span><i class="iconfont icon-triangle-down"></i></li>
             <li><span>结束日期</span><i class="iconfont icon-triangle-down"></i></li>
             <li><span>全部</span><i class="iconfont icon-triangle-down"></i></li>
          </ul>
        </div>
        <div class="bscroll" ref="bscroll">
           <div class="bscroll-container">
             <ul>
               <li @click="gotodetail">
                 <div class="itemtop">点单：<span>XW412412412412</span></div>
                 <div class="itembottom">
                   <p class="total">待结算：￥<span>10.00</span></p>
                   <p class="takegods">收货地址：<span>北京市海淀区花园桥</span></p>
                   <p class="takegods">收货人信息：<span>唐倩 17622547789</span></p>
                 </div>
               </li>
                <li>
                 <div class="itemtop">点单：<span>XW412412412412</span></div>
                 <div class="itembottom">
                   <p class="total">待结算：￥<span>10.00</span></p>
                   <p class="takegods">收货地址：<span>北京市海淀区花园桥</span></p>
                   <p class="takegods">收货人信息：<span>唐倩 17622547789</span></p>
                 </div>
               </li>
             </ul>
           </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Head from '@/components/seller/head.vue'
import BScroll from "better-scroll";
export default {
  name: 'receipt',
  components: {
    Head
  },
  methods:{
    gotodetail(){
      this.$router.push({
        name:"orderdetail"
      })
    }
  },
  mounted(){
    this.$nextTick(() => {
        let bscrollDom = this.$refs.bscroll;
        this.aBScroll = new BScroll(bscrollDom,{
          probeType:2,
           click:true
        })
      })   
  }
}
</script>

