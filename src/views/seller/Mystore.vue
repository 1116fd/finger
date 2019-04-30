<template>
  <scroll class="wrapper mystore" ref="wrapper" @scrollmsg="scrollmsg">
    <div class="mylist-box">
      <div class="my-list" v-for="(i ,ind) in myList" :key="ind">
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
          <!-- <div :class="follow ?'follow':'follow nofollow' " @click="handleor(i)"><i class="iconfont icon-shoucang"></i><span>{{follow? '收藏':'取消收藏'}}</span></div> -->
          <span @click="deleteStore(i.store_id)">删除</span>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import scroll from "@/components/buyer/Scroll.vue";
export default {
  name: "mystore",
  components: {
    scroll
  },
  created() {
    this.getstorelist();
    let flag;
    if(!this.$store.state.bookmark.length){
        flag =  this.$store.state.bookmark.filter(item=>item==this.store_id)
        if(flag){
          this.follow = true;
        }else{
          this.follow = false;
        }
    }else{
        this.follow = false;
    }
  },
  data() {
    return {
      myList: [],
      scroll: null,
      follow:false,
      bookmark:[]
    };
  },
  beforeRouteLeave(to, from, next) {
    let positiony = this.scroll.y;
    console.log(positiony);
    if (positiony == null) positiony = 0;
    this.$store.commit("changeScrollY3", positiony);
    next();
  },
  methods: {
    scrollmsg(scroll) {
      this.scroll = scroll;
      console.log(this.$store);
      if (this.scroll) {
        this.scroll.scrollTo(0, this.$store.state.scrolly3);
        this.scroll.hasVerticalScroll = true;
        this.scroll.maxScrollY = -1289;
      }
    },
    getstorelist() {
      this.$http.get("/store/ustorelist").then(res => {
        this.myList = res.result;
      });
    },
    deleteStore(store_id) {
      console.log(store_id, sessionStorage.getItem("pwd"));
      this.$http
        .delete("/store/delete", {
          data: {
            store_id,
            uid: "jack",
            pwd: "123456"
          }
        })
        .then(res => {
          if (res.code == 1) {
            this.getstorelist();
          }
        });
    },
    toStore(store_id) {
      this.$router.push({
        name: `tabdetail`,
        params: {
          store_id
        }
      });
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

<style lang="scss">
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
.mystore {
  width: 100%;
  height: 100%;
  position: relative;
  // background: #f8f8f8;
}
.mylist-box {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .my-list {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;

    border: 1px solid #ccc;
    box-shadow: 2px 2px 2px 2px #eee;
    font-size: 14px;
    display: flex;
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

.checkbox {
  width: 100%;
  height: 100px;
  p {
    width: 32%;
    height: 30px;
    text-align: center;
    display: inline-block;
  }
}
.aaa {
  padding-left: 0;
  box-sizing: border-box;
}
.time-box {
  width: 100%;
  height: 8%;
  display: flex;
  background: #fff;
  align-items: center;
  padding-right: 10px;
  box-sizing: border-box;
  .dobusiness {
    width: 120%;
  }
  select {
    width: 40%;
    border: 1px solid #ccc;
    border-radius: 7px;
    padding: 5px 8px;
    font-size: 14px;
    outline: 0;
    option {
      border: 1px solid #ccc;
    }
  }
  span {
    padding: 0 10px;
    box-sizing: border-box;
  }
}
.bottom-box {
  width: 100%;
  height: 50px;
}
#deliverytime {
  padding-right: 10px;
  box-sizing: border-box;
  select {
    padding: 0 9%;
    border: none;
    outline: 0;
  }
}
.changestyle {
  width: 100%;
  display: flex;
  background: #fff;
  height: auto;
  padding: 0 10px 30px 10px;
  box-sizing: border-box;
  dl {
    width: 50%;
    text-align: center;
    img {
      width: 100%;
    }
  }
}
.save {
  width: 100%;
  height: 8%;
  background: orange;
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #ffffff;
  text-align: center;
  border: 0;
  outline: 0;
}
</style>
