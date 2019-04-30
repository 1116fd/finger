<template>
  <div class="head">
    <span @click="back"><i class="iconfont icon-angle-left"></i><span class="fanhui">返回</span></span>
    <h4>{{title}}</h4>
    <span><i class="iconfont icon-share"></i></span>
  </div>
</template>

<script>
export default {
  name: 'Head',
  props:["title"],  //父元素传过来的值
  methods: {
    back(){
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss" scoped>
.iconfont{
  font-size: 20px;
  color:#fff;
}
.head{
  width: 100%;
  height: 44px;
  background: #1B1A1F;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:#fff;
  padding: 0 15px;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
}
.fanhui{
  font-size: 14px;
}
h4{
  font-size: 18px;
  font-weight: normal;
}
</style>
