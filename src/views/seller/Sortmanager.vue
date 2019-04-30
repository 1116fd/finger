<template>
     <div class="catmanager">
       <Head title="分类列表" />
       <scroll class="wrapper" ref="wrapper">
         <div class="catlist">
           <div class="catitem" v-for="(item) in catlist" :key="item.cat_id">
             <div class="catleft">
               <h4>分类名称：{{item.cat_name}}</h4>
               <p>添加时间：2019-06-21</p>
             </div>
             <div class="catright">
               <i class="iconfont icon-shezhi" @click="toSku(item.cat_id)"></i>
               <i class="iconfont icon-bianji1" @click="edit(item.cat_id)"></i>
               <i class="iconfont icon-shanchu-01" @click="deleteCat(item.cat_id)"></i>
             </div>
           </div>
         </div>
       </scroll>
       <button class="addcat" @click="addcat">添加分类</button>
      </div>
</template>

<script>
import Head from '@/components/seller/head.vue'
import bus from '@/utils/bus.js'
import scroll from "@/components/buyer/Scroll.vue";
export default {
  name:"sortmanager",
  components:{
    Head,
    scroll
  },
  data(){
    return {
      store_id:'',
      catlist:[]
    }
  },
  created(){
    if(this.$route.query.storeid){
      this.store_id = this.$route.query.storeid
    }
    // if(!this.catlist.length){
      this.updateCatlist();
    // }
  },
  mounted(){
      bus.$on('update',()=>{
        this.updateCatlist();
      })
  },
  methods:{
    addcat(){
      this.dialog = this.$dialog('addcat');
    },
    updateCatlist(){
      console.log(this.store_id)
      this.$http.post('/store/goods/cat.list',{
        store_id:this.store_id
      }).then(res=>{
          console.log(res);
          if(res.code===1){
              this.catlist = res.result;
          }
      })
    },
    deleteCat(cat_id){
      this.$http.delete('/store/goods/cat.delete',{
        data:{
          cat_id:cat_id
        }
      }).then(res=>{
          console.log(res);
          if(res.code===1){
              // this.catlist = res.result;
            this.updateCatlist();
          }
      })
    },
    edit(cat_id){
      console.log(cat_id)
      // this.$store.commit('editCatid',cat_id);
      // bus.$emit('cat_id',cat_id)
      this.$dialog('editcat',cat_id);
      // console.log(this.$store)
      bus.$on('updatecat',()=>{
        console.log(0)
        this.updateCatlist();
      })
      
    },
    toSku(cat_id){
        console.log(typeof cat_id === Number)

      if(typeof cat_id === Number){
        cat_id = JSON.stringify(cat_id);
      }
      this.$router.push({
        name: `sku`,
        params:{
          cat_id,
          store_id:this.store_id
        }
      });
    }
  }
}
</script>

<style  lang="scss" scoped>
.catmanager{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 0;
  div{
    flex-shrink: 0
  }
}
.addcat{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background: orange;
  border: 0;
  color: #fff;
}
.wrapper{
  flex: 1;
  width: 100%;
  height: 80%;
}
.catlist{
  width: 100%;
  height:auto;
  .catitem{
    width: 80%;
    margin: 10px auto;
    height: 70px;
    display: flex;
    border: 1px solid #ccc;
    box-shadow: #ccc 2px 2px 2px;
    padding: 5px;
    .catleft{
      width: 70%;
      height: 100%;
      h4{
        line-height: 35px;
      }
      p{
        line-height: 25px;
      }
    }
    .catright{
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
      i{
        font-size: 28px;
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>