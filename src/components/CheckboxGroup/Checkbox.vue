<template>
    <p @click="()=>toggleChecked(name)"><span :class="styleObj"></span>{{name}}</p>
</template>

<script>
export default {
  name: "checkbox",
  model: {
    prop: "checked",
    event: "change"
  },
  props:{
      checked:{
        //   type:Boolean,
          required:true,
        //   default:false
      },
      name:{
          type:String,
          required:true,
          default:false
      }
  },
  computed:{
      styleObj(){
          return {vcheckbox:true,checked:this.checked}
      }
  },
  methods:{
      toggleChecked(){
          this.$emit('change',{name:this.name,checked:!this.checked});
      }
  }
};
</script>

<style lang="scss" scoped>
.vcheckbox {
  width: 15px;
  height: 15px;
  position: relative;
  display: inline-block;
  border-radius: 2px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.checked{
    background: darkgreen;
    border:none;
}
.checked::after{
    content: '';
    position: absolute;
    width: 8px;
    left: 3px;
    top: 2px;
    height: 4px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(-45deg);
}
</style>