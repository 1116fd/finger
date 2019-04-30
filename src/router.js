import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Home from './views/buyer/Home.vue'
import Shopcar from './views/buyer/Shopcar.vue'
import Mine from './views/buyer/Mine.vue'
import Hot from './views/buyer/Hot.vue'
import Tabdetail from './views/buyer/Tabdetail.vue'
import Goodsdetail from './views/buyer/Goodsdetail.vue'
import Search from './views/buyer/Search.vue'
import Sellrules from './views/seller/Sellrules.vue'
import Createstore from './views/seller/Createstore.vue'
import Collect from "./views/buyer/collect"
import Order from "./views/buyer/order"
import Index from './views/seller/Index.vue'
import Receipt from './views/seller/Receipt.vue'
import Sweepcode from './views/seller/Sweepcode.vue'
import Refund from './views/seller/Refund.vue'
import Shoplist from './views/seller/Shoplist.vue'
import Addshop from './views/seller/Addshop.vue'
import Sortmanager from './views/seller/Sortmanager.vue'
import Shopset from './views/seller/Shopset.vue'
import Profit from './views/seller/Profit.vue'
import Shopdetail from './views/seller/Shopdetail.vue'
import Applylist from './views/seller/Applylist.vue'
import Store from './views/seller/store.vue'
import StoreMy from './views/seller/store-my.vue'
import Sku from './views/seller/Sku.vue'
import SkuResult from './views/seller/skuResult.vue'
import Orderdetail from './views/seller/orderdetail.vue'
import Sellerorder from './views/seller/sellerorder.vue'
import Ordermanage from './views/seller/ordermanage.vue'
import Doodsupdate from "./views/seller/goodsupdate.vue"
import Start from "./views/Start.vue"
import Yesorder from './views/buyer/Yesorder.vue'

import Address from "./views/buyer/address.vue"
import Addaddress from "./views/buyer/addaddress"
import Updateaddress from "./views/buyer/upaddress"
Vue.use(Router)


const vueRouter = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { // 店铺详情切换
      path: '/hot',
      name: 'hot',
      component: Hot,
      children:[
        {path:'/hot',redirect:'tabdetail'},                  
        {  // 进入店铺详情
          path: 'tabdetail',
          name: 'tabdetail',
          component: Tabdetail,
        },
        {
          path: 'shopcar',
          name: 'shopcar',
          component: Shopcar
        },
        { //个人中心
          path: 'mine',
          name: 'mine',
          component: Mine
        }
       ]
    },
    { // 商品详情
      path: '/goodsdetail',
      name: 'goodsdetail',
      component: Goodsdetail
    },
    { // 店铺规则
      path: '/rule',
      name: 'rule',
      component: Sellrules
    },
    { // 创建店铺
      path: '/createstore',
      name: 'createstore',
      component: Createstore
    },
    { // 店铺列表
      path: '/storelist',
      name: 'store',
      component: Store
    },
    { // 我的店铺
      path: '/storemy',
      name: 'storemy',
      component: StoreMy
    },
    { // 买家首页
      path:'/',
      component:Start,
      // redirect:'store'
    },
    {path:'/home',component:Home},
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path:'/yesorder',
      component:Yesorder
    },
    {  //订单
      path:'/order',
      name: 'order',
      component:Order
    },
    {
      path:'/collect',
      name: 'collect',
      component:Collect
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/receipt',
      name: 'receipt',
      component: Receipt
    },
    {
      path: '/sweepcode',
      name: 'sweepcode',
      component: Sweepcode
    },
    {
      path: '/refund',
      name: 'refund',
      component: Refund
    },
    {
      path: '/shoplist',
      name: 'shoplist',
      component: Shoplist,
      children: [{
        path: 'shopdetail',
        component: Shopdetail
      }]
    },
    {
      path: '/addshop',
      name: 'addshop',
      component: Addshop
    },
    {
      path: '/sortmanager',
      name: 'sortmanager',
      component: Sortmanager
    },
    {
      path: '/shopset',
      name: 'shopset',
      component: Shopset
    },
    { // 收益
      path: '/profit',
      name: 'profit',
      component: Profit
    },
    {
      path: '/applylist',
      name:'applylist',
      component: Applylist
    },{ 
      path:'/sellerorder',
      name:'sellerorder',
      component: Sellerorder
    },{ // 设置Sku
      path:'/sku',
      name:'sku',
      component: Sku
    },{ // 生成Sku
      path:'/skuresult',
      name:'skuresult',
      component: SkuResult
    },{// 订单详情
      path:'/orderdetail',
      name:'orderdetail',
      component: Orderdetail
    },{ //订单管理
      path:'/ordermanage',
      name:'ordermanage',
      component: Ordermanage
    },{
      path:'/goodsupdate',
      name:"goodsupdate",
      component:Doodsupdate
    },{  //地址列表
      path:'/address',
      name:"address",
      component:Address
    },{  //编辑地址
      path:'/addaddress',
      name:"addaddress",
      component:Addaddress
    },{  //修改地址
      path:'/updateaddress',
      name:"updateaddress",
      component:Updateaddress
    }
    
  ]
})
vueRouter.beforeEach(function (to, from, next) {
  const nextRoute = [ 'createstore', 'order', 'yesorder'];
  const auth = sessionStorage.getItem("token") || '';
  //跳转至上述3个页面
  if (nextRoute.indexOf(to.name) >= 0) {
      //未登录
      if (!auth) {
          vueRouter.push({name: 'login'})
      }
  }
  //已登录的情况再去登录页，跳转至首页
  if (to.name === 'login') {
      if (auth) {
          vueRouter.push({name: 'start'});
      }
  }
  next();
});


export default vueRouter;