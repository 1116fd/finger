<style lang="scss" scoped>
.order{
  width: 100%;
  height: 100%;
  background: rgb(236, 234, 234);
  overflow: hidden;
}
.bscroll{
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
  .statusbox{
    width: 100%;
    height: 105px;
    background: #fff;
    display: flex;
    flex-direction: column;
    border-bottom: solid 1px #999999;
  }
  .statusbox ul{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #999999;
  }
  .statusbox ul li{
    width: 20%;
    text-align: center;
    padding: 15px 0;
    // padding: 15px 5px;
    font-size: 14px;
  }
  .active{
    color:#F2922F;
    border-bottom: solid 2px #F2922F;
  }
  .iptbox{
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .iptbox input{
    width: 90%;
    height: 40px;
    background: #eee;
    border:none;
    border-radius: 20px;
    padding-left: 20px;
  }
  .itembox{
    width: 100%;
    height: 188px;
    background: #fff;
    margin-bottom:10px;
  }
  .itemtitle{
    width: 100%;
    height: 44px;
    border-bottom:solid 1px #999999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .itemgoods{
    width: 100%;
    height: 100px;
    background: rgb(236, 234, 234);
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .itemgoodsleft{
    width: 20%;
    height: 80%;
    padding: 0 5px;
  }
  .itemgoodsleft img{
    width: 100%;
    height: 100%;
  }
  .itemgoodscon{
    width: 70%;
    height: 80%;
    padding: 0 5px;
  }
  .itemgoodscon .itemgoodscontitle{
    font-size: 14px;
    color:#000;
  }
   .itemgoodscon .itemgoodscontime{
    font-size: 14px;
    color:#999;
  }
   .itemgoodscon .itemgoodsconstatus{
    font-size: 14px;
    color:#555555 ;
  }
  .itemgoodscon .itemgoodsconstatus span{
    color: #F2922F;
  }
  .itemgoodsright{
    width: 10%;
    height: 80px;
    padding: 0 5px;
    display: flex;
  }
  .itemstatus{
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .itemstatus p{
    display: inline-block;
    width: 80px;
    height: 27px;
    color: #F2922F;
    border: solid 1px #F2922F;
    text-align: center;
    line-height: 27px;
    border-radius: 20px;
    // padding: 5px 10px;
  }
</style>

<template>
  <div class="order">
    <Head title="全部订单"/>
    <div class="statusbox clearposition">
      <ul>
        <li v-for="(item,i) in titlearr" :class="idx==i?'active':''"  :key="i" @click="changcss(i)">{{item.title}}</li>
      </ul>  
      <div class="iptbox">
        <input type="text" placeholder="搜索订单">
      </div>
    </div> 
    <div class="bscroll" ref="bscroll">
      <div class="bscroll-container">
         <div class="itembox">
           <div class="itemtitle">
             <p>订单编号：<span>wt15458745</span></p>
             <i class="iconfont icon-angle-right"></i>
           </div>
           <div class="itemgoods" v-for="(item,index) in orderdata" :key="index">
             <div class="itemgoodsleft"><img src="../../assets/logo.png" alt=""></div>
             <div class="itemgoodscon">
               <p class="itemgoodscontitle">{{item.goods_name}}</p>
               <p class="itemgoodscontime">下单时间：<span>{{item.create_time}}</span></p>
               <p class="itemgoodsconstatus">订单状态：<span>待付款</span></p>
             </div>
             <div class="itemgoodsright">x<span>{{item.count}}</span></div>
           </div>
           <div class="itemstatus">
             <p>支付</p>
           </div>
         </div>
     </div>
    </div>
  </div>
</template>
<script>
import Head from '@/components/Head.vue'
import "../../common/common.css"
import BScroll from "better-scroll";
export default{
  name:"order",
  components: {
    Head
  },
  data() {
    return {
      titlearr:[{
        id:1,
        title:"全部"
      },{
        id:2,
        title:"待付款"
      },{
        id:3,
        title:"待发货"
      },{
        id:4,
        title:"待收货"
      },{
        id:5,
        title:"已完成"
      },{
        id:6,
        title:"退货售后"
      }],
      page: '',
      idx:0,
      orderdata:[]
    }
  },
  created() {
    this.getRouterData()
  },
  mounted(){
    this.$nextTick(() => {
        let bscrollDom = this.$refs.bscroll;
        this.BScroll = new BScroll(bscrollDom,{
          probeType:2,
           click:true
        })
    })   
    this.orderdata=Object.values(this.$route.query);
  },
  methods:{
    getRouterData() {
      this.page = this.$route.params.page
      this.idx=this.$route.params.is
      console.log('page', this.idx)
    },
    changcss(i){
      this.idx=i
    }
  }
}
</script>