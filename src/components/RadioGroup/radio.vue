<template>
    <div>
        <span :class="styleObj" @click="toggleChecked"></span>
    </div>
</template>

<script>
export default {
  name: "radio",
  model:{
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
  computed: {
    styleObj() {
      return { radio: true, checked: this.checked };
    }
  },
  methods:{
      toggleChecked(){
          this.$emit('change',{name:this.name,checked:true});
      }
  }
};
</script>

<style lang="scss" scoped>
.radio{
    width: 15px;
    height: 15px;
    display: inline-block;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #ccc;
    position: relative;
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