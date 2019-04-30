<style  lang="scss" scoped>
   .storehead{
       width: 100%;
       height: 50px;
       display: flex;
       justify-content: space-between;
       align-items: center;
       padding:0 20px;
       box-sizing: border-box;
       border-bottom:1px solid #ccc;
   }
   .iconfont{
       font-size: 15px;
   }
   .title{
       font-family: PingFangSC-Regular;
        font-size: 17px;
        color: #333333;
        flex-shrink: 0;
        text-align: center;
   }
</style>

<template>
    <div class="storehead">
        <span class="back" @click="back"><i class="iconfont icon-xiangzuo"></i></span>
        <p class="title">{{title}}</p>
        <span><router-link :to="{path:'/applylist',query:{storeid:storeid}}">{{applist?applist:""}}</router-link></span>
    </div>
</template>

<script>
export default {
   props:{
       title:{
           type:String
       },
       applist:{
           type:String
       },
       storeid:{
           type:String
       }
   },
   methods:{
       back(){
           this.$router.go(-1)
       }
   }

}
</script>
