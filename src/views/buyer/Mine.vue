<template>
  <div class="home">
    <Head title="推荐"/>
    <div class="userinfo">
      <dl>
        <dt><img src="../../assets/logo.png" alt=""></dt>
        <dd>李惠</dd>  
      </dl>
      <i class="iconfont icon-set"></i>
    </div>
    <div class="order">
      <div class="myorder" @click="routerTo('0')"><span>我的订单</span><i class="iconfont icon-angle-right"></i></div>
      <div class="routerorder">
        <dl @click="routerTo('1')">
            <dt><i class="iconfont icon-qianbao"></i></dt>
            <dd>待付款</dd>
        </dl>
        <dl @click="routerTo('2')">
            <dt><i class="iconfont icon-tijiaodingdan"></i></dt>
            <dd>待发货</dd>
        </dl>
        <dl @click="routerTo('3')">
            <dt><i class="iconfont icon-daishouhuo-01"></i></dt>
            <dd>待收货</dd>
        </dl>
        <dl @click="routerTo('4')">
            <dt><i class="iconfont icon-wodedingdan"></i></dt>
            <dd>已完成</dd>
        </dl>
        <dl @click="routerTo('5')">
            <dt><i class="iconfont icon-gongzuojilu"></i></dt>
            <dd>退货/售后</dd>
        </dl>
      </div>
    </div>  
    <div class="userlist">
    <ul>
      <li><router-link to="/address" class="collectlist"><span>地址管理</span><i class="iconfont icon-angle-right"></i></router-link></li>
      <li><span>我的快递</span><i class="iconfont icon-angle-right"></i></li>
      <li><router-link to="/collect" class="collectlist"><span>收藏店铺</span><i class="iconfont icon-angle-right"></i></router-link></li>
    </ul>  
    </div> 
    <div class="customer">
    <ul>
      <li><span>客服电话</span><span>400-135-2403</span></li>
      <li><span>在线客服</span><i class="iconfont icon-kefu"></i></li>
      <li class="open" @click="handleSetStore"><span>我要开店</span></li>
      <li></li>
    </ul>  
    </div> 
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import "../../common/common.css"
export default {
  name: "mine",
  components: {
    Head,
  },
  methods:{
    routerTo(i){
       console.log(i)
     this.$router.push({
       name:"order",
       params:{
         page:"1",
         is:i
       }
     })
    },
    storedetail(){
      this.$router.push('/storedetail')
    },
    handleSetStore() {
      this.$router.push("/rule");
    }
  }
};
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  background: rgb(236, 234, 234);
  margin-top: 44px;
  overflow-y: scroll;
}
.userinfo{
  width: 100%;
  height:70px ;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.userinfo dl{
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.userinfo dl>dt{
  width: 40px;
  height: 40px;
}
.userinfo dl>dt img{
  width: 100%;
  height: 100%;
  border-radius:50%; 
}
.userinfo dl>dd{
  margin-left: 15px;
}
.userinfo>i{
  font-size: 25px;
}
.order{
  width: 100%;
  height: 130px;
  background: #fff; 
  padding-left:15px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.order .myorderlink{
  text-decoration: none;
  color: #333333;
}
.myorder{
  width: 100%;
  height: 50px;
  padding-right:15px;
  box-sizing: border-box;
  border-bottom: 1px solid #999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #333333;
}
.myorder i{
  font-size: 25px;
}
.routerorder{
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding-right:15px;
  box-sizing: border-box;
}
.routerorder .routerordeitem{
  text-decoration: none;
  color:#999999;
}
.routerorder dl{
  width: 20%;
  text-align: center;
  color:#999999;
}
.routerorder dl .router-link-exact-active{
  color:#999999;
}
.routerorder dl dt i{
  font-size: 25px;
  line-height: 30px;
}
.routerorder dl dd{
  font-size: 12px;
}
.userlist{
  width: 100%;
  height: 150px;
  background: #fff;
  padding-left:15px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.userlist ul li{
  padding-right:15px;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #333333;
}
.userlist ul li .collectlist{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #333333;
}
.userlist ul li i{
  font-size: 25px;
  color: #333333;
}
.customer{
  width: 100%;
  height: auto;
  background: #fff;
  padding-left:15px;
  box-sizing: border-box;
}
.customer ul li{
  padding-right:15px;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #333333;
}
.customer ul li i{
  font-size: 25px;
  color: #333333;
}
</style>