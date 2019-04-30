<template>
    <div class="seller-box">
         <header>
          <div class="search-box">
              <i class="iconfont icon-fangdajing"></i>
              <p class="address">海淀区社区派件配送...></p>
              <i class="iconfont icon-xiaoxi1"></i>
          </div>
          <dl class="user-info">
            <dt></dt>  
            <dd>
               <p class="user-info-number">13611277554</p>
               <p class="user-info-manager">高级管理员</p>
            </dd>  
          </dl>
      </header>
      <section>
        <p class="store-name"><b  class="store-name-line">|</b> 指尖杂货铺</p>
        <ul class="store-detail">
          <li><router-link to="/ordermanage">接单</router-link></li> 
          <li><router-link to="/sweepcode">扫码</router-link></li>
          <li><router-link to="/refund">退款</router-link></li>
          <li><router-link :to="{path:'/shoplist',query:{storeid:storeid}}">商品列表</router-link></li>
          <li><router-link :to="{path:'/addshop',query:{storeid:storeid}}">添加商品</router-link></li>
          <li><router-link :to="{path:'/sortmanager',query:{storeid:storeid}}">分类管理</router-link></li>
          <li><router-link :to="{path:'/shopset',query:{storeid:storeid}}">店铺设置</router-link></li>
          <li><router-link :to="{path:'/profit',query:{storeid:storeid}}">收益</router-link></li>
          <li><router-link to="/storemy">我的店铺</router-link></li>
        </ul> 
      </section>
    </div>
</template>

<script>
export default {
   data(){
     return{
       storeid:""
     }
   },

   //请求时所要用的店铺id,已跑通到时候修改参数就可以
   created(){
      this.storeid=this.$route.query.storeid
   }
}
</script>

<style  lang="scss" scoped>
a{
  text-decoration: none;
  color:#999;
}
.seller-box{
    width: 100%;
    height: 100%;
}
.iconfont { 
    font-size: 20px;
    vertical-align: -0.25em; 
    fill: currentColor; 
    overflow: hidden;
    color:#fff;
    flex-shrink: 0;
}
  header{
    width: 100%;
    height: 25%;
    padding:0 20px;
    box-sizing: border-box;
    background: orange;
  }
  .search-box{
      width: 100%;
      height: 45%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .address{
          color:#fff;
          font-size: 18px;
      }
  }
  .user-info{
    width: 100%;
    height: 55%;
    display: flex;
    color:#fff;
    padding:10px 0;
    box-sizing: border-box;

    dt{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #fff;
      flex-shrink: 0;
    }
    dd{
      line-height: 30px;
      padding-left:15px;
      box-sizing: border-box;
    }
  }

  section{
    flex:1;
    .store-name{
      width: 100%;
      height: 10%;
      line-height: 50px;
      padding:0 20px;
      box-sizing: border-box;
      background: #f5f5f5;
      white-space:nowrap;
    }
    .store-name-line{
      color:aquamarine;
    }
    .store-detail{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        width: 32%;
        height: 120px;
        line-height: 120px;
        text-align: center; 
        border:1px solid #ccc;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
