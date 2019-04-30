<template>
    <scroll class="wrapper store-list-page" ref="wrapper" @scrollmsg="scrollmsg">
        <div>
            <div class="store-list" v-for="(i ,ind) in all" :key="ind">
                <div class="left" @click="toStore(i.store_id)">
                  <img class="imglogo" :src="i.logo" alt="">
                  <p>
                    店铺名称：
                    <span>{{i.store_name}}</span>
                </p>
                <p>
                    经验范围：
                    <span>{{i.sub_catagory}}</span>
                </p>
                </div>
                <div class="right">
                  <!-- <div :class="bookmark[ind].follow ?'follow':'follow nofollow' " @click="handleor(i,ind)"><i class="iconfont icon-shoucang"></i><span>{{bookmark[ind].follow? '收藏':'取消收藏'}}</span></div> -->
                  <span @click="deleteStore(i.store_id)">删除</span>
                </div>
            </div>
            <Success :success="successval" :isshow="shows"/>  
        </div>
    </scroll>
</template>

<script>
import scroll from "@/components/buyer/Scroll.vue";
export default {
  name: "storeList",
  components: {
    scroll
  },
  data() {
    return {
      successval:"",
      shows:false,
      all: [],
      scroll: null,
      follow:[],
      bookmark:[]
    };
  },
  created() {
    this.getstorelist();
  },
  beforeRouteLeave(to, from, next) {
    let positiony = this.scroll.y;
    console.log(positiony);
    if (positiony == null) positiony = 0;
    this.$store.commit("changeScrollY2", positiony);
    next();
  },
  methods: {
     times(){
    setTimeout(()=>{
            this.shows=false
          },2000)
  },
    scrollmsg(scroll) {
      this.scroll = scroll;
      //   this.$emit('scrollmsg',this.scroll)
      if (this.scroll) {
        this.scroll.scrollTo(0, this.$store.state.scrolly2);
        this.scroll.hasVerticalScroll = true;
        this.scroll.maxScrollY = -1289;
      }
    },
    getstorelist(){
    this.$http.get("/store/storelist").then(res => {
      this.all = res.result;
    });
  },
    deleteStore(store_id){
      this.$http.delete("/store/delete",{
        data:{
          store_id,
          uid:'jack',
          pwd:'123456'
        }
      }).then(res => {
        if(res.code == 1){
          this.getstorelist();
          this.goods_id = res.goods_id;
            this.shows=true;
          this.successval="添加店铺成功"
          this.times()
        }
      });
    },
    toStore(store_id){
      // this.$router.push({
      //   name: `tabdetail`,
      //   params: {
      //     store_id
      //   }
      // });
      this.$router.push({path:'/index',query: {storeid:store_id}})
    },
    // handleor(i){
    //   this.follow = !this.follow;
    //   this.book(i);
    // },
    // book(i){
      
    //   if(this.follow){
    //     this.loading = this.$loading();
    //     this.$http.post(`/buyer/user/store.collect.add`,{
    //       token:this.token,
    //       store_id:this.store_id
    //     }).then(res=>{
    //       this.loading.close();
    //       console.log(res)
    //     })
    //     if(!this.bookmark.length){
    //       this.bookmark.push(i);
    //     }else{
    //       this.bookmark = this.bookmark.filter(item=>item.store_id!=i.store_id)  
    //       this.bookmark.push(i)
    //     }
    //   }else{
    //     this.loading = this.$loading();
    //     this.$http.post(`/buyer/user/store.collect.remove`,{
    //       token:this.token,
    //       store_id:this.store_id
    //     }).then(res=>{
    //       this.loading.close();
    //       console.log(res)
    //     }) 
    //    this.bookmark =  this.bookmark.filter(item=>item.store_id!=i.store_id);
    //   }
    //   console.log(this.bookmark)
    //   this.$store.commit("setbookmark", this.bookmark);
    // }
  }
};
</script>

<style lang='scss'>
.follow{
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999999;
  i{
    width: 25px;
    height: 25px;
    text-align: center;
    margin: 0 auto;
    display: inline-block;
    color: orange!important;
  }
}
.nofollow{
  i{
    margin: 0 auto;
    color: #ccc!important;
  }
}
.store-list-page {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .store-list {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;
    display: flex;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 2px 2px #eee;
    font-size: 14px;
    .left{
      width: 56%;
    }
    .right{
      width: 44%;
      display: flex;
      align-items: center;
      span{
        text-align: center;
        flex: 1;
      }
    }
    .imglogo{
      width: 100px;
      height: 100px;
    }
    p {
      width: 100%;
      padding: 10px 5px;
      box-sizing: border-box;
      span {
        color: #666;
      }
    }
  }
}
</style>
