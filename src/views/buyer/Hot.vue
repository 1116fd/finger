<template>
  <div id="hot">
    <router-view/>
    <div id="nav" class="footer">
      <router-link to="/hot"><i class="iconfont icon-shouye"></i>首页</router-link> 
      <router-link to="/hot/shopcar"><i class="iconfont icon-gouwuche"></i>购物车</router-link>
      <router-link to="/hot/mine"><i class="iconfont icon-wode"></i>我的</router-link>
    </div>
  </div>
</template>

<style lang="scss">
#hot {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}
#nav {
  width: 100%;
  height: 10%;
  background: #fff;
  box-shadow: #eee 2px 2px 0;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  flex: 1;
  height: 100%;
  text-align: center;
  display: inline-block;
  text-decoration: none;
  padding-top: 5px;
  i{
    display: inline-block;
    width: 100%;
    height: 40%;
    font-size: 20px!important;
  }
}

#nav a.router-link-exact-active {
  color: #F2922F!important;
}
</style>
