<template>
     <div class="order">
      <Slottest>
        <template v-slot:h2><h2>hahhah</h2></template>
        <template><h3>hahhah</h3></template>
        <template><h4>hahhah</h4></template>
      </Slottest>
       <!-- <h3 @click="showselect">分类管理</h3>
       <Actionsheet  :flag="show" @select="hideselect" :optionsarr="optionsitem" @selects="getval"/> -->
       <div class="ipt" @click="showselect" ref="div">点击</div>
       <Options :show="show" :optionsarr="optionsitem" @goods="getgoods" @hide="hidesel"></Options>
     </div>
</template>

<script>
 import Actionsheet from "@/components/lianxiactionsheet/index.vue"
 import Slottest from "@/components/slottest/indx.vue"
export default {
  data(){
    return{
      show:false,
      values:"",
      optionsitem:[
        {
          name:"颜色"
        },
        {
          name:"型号"
        },
        {
          name:"内容"
        },
      ]
    }
  },
  components:{
   Slottest
  },
  methods: {
    showselect(){
      this.show=true
    },
    getgoods(data){
      coosle.log(data)
      this.values=data.cat_name
      this.show=false
      this.$refs.div.innerHTML=this.values
    },
    hidesel(){
      this.show=false
    }
    // showselect(){
    //   this.show=true
    // },
    // hideselect(){
    //   this.show=false
    // },
    // getval(data){
    //   this.show=false
    //   console.log(data)
    // }
  },
  components:{
    Actionsheet
  }
}
</script>

<style  lang="scss" scoped>
.order{
  width: 100%;
  height: 100%;
}
.ordermanage{
  width: 100%;
  height: 100%;
}

</style>
