<template>
    <div class="head">
       <span @click="back"><i class="iconfont icon-angle-left"></i><span class="fanhui">返回</span></span>
       <h4>{{title}}</h4>
       <span></span>
    </div>
</template>

<script>
export default {
  name:"head",
  props:["title"],  //父元素传过来的值
  methods: {
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont{
  font-size: 20px;
  color:#333;
}
.head{
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:#333;
  padding: 0 15px;
  box-sizing: border-box;
  border-bottom: solid 1px #3333;
  background: #fff!important;
}
.fanhui{
  font-size: 14px;
}
h4{
  font-size: 18px;
  font-weight: normal;
}
.head span{
    width: 50px;
    display: inline-flex;
    align-items: center;
}
</style>