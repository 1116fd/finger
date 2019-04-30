<style lang="scss" scoped>

</style>

<template>
    <div>
        retrtert
         <!-- <Storehead v-bind:title="title" /> -->
    </div>
</template>

<script>
import Storehead from '../../components/common/Storehead.vue'
export default {
  name:"shopdetail",
  components: {
    Storehead
  },
  data(){
    return {
      title:"商品详情"
    }
  }
}
</script>
