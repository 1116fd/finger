<template>
  <div class="about">
    <h1 @click="open">This is an about page open</h1>
    <h1 @click="close">This is an about page</h1>
  </div>
</template>

<script>
  export default {
    name:'about',
    methods:{
      open(){
        this.loading = this.$loading()
        this.loading.close();
        // setTimeout(()=>{
        //   this.loading.close();
        // },1000)
      },
      close(){
        
        // this.loading.visible = false
      }
    }
  }
</script>

<style scoped>

</style>