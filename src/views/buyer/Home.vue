<template>
  <div class="home">
    <div class="h-head">
      <div class="input" @click="tosearch">搜索店铺</div>
    </div>
    <scroll
      class="wrapper"
      ref="wrapper"
      :data="data"
      :pulldown="pulldown"
      :pullup="pullup"
      @pulldown="loadData"
      @scrollToEnd="loadData2"
      @scrollmsg="scrollmsg"
    >
      <div>
        <button class="set-store" @click="handleSetStore">我要开店</button>
        <div class="banner swiper-container">
          <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="(img,k) in imgs" :key="k">
              <img v-lazy="img" alt="">
            </li>
          </ul>
          <ol class="swiper-pagination"></ol>
        </div>
        <div class="tab">
          <dl v-for="(item,k) in classifylist" :key="k" @click="handledetail(item)">
            <dt>
              <img v-lazy="item.src" alt="">
            </dt>
            <dd>{{item.title}}</dd>
          </dl>
        </div>
        <ol>
          <li
            :class="i==index?'active':''"
            v-for="(item,i) in tabList"
            :key="i"
            @click="handletab(i)"
            :i="i"
          >{{item}}</li>
        </ol>
        <ul :class="indexstyle_id==0 ? 'content':'columnstyle' ">
            <dl v-for="(item,i) in data"
            :key="i"
            @click="handledetail(item,item.store_id,item.goods_id)"
            :id="item.store_id">
              <dt>
                <img v-if="item.cart_image" :v-lazy="item.cart_image" alt="">
                <img v-else :v-lazy="item.logo" alt="">
              </dt>
              <dd>
                <h4>{{item.goods_name}}</h4>
              </dd>
            </dl>
        </ul>
        <div class="loading-wrapper"></div>
      </div>
    </scroll>
  </div>
</template>

<script>
// @ is an alias to /src
import scroll from "@/components/buyer/Scroll.vue";
import tabsrc from "../../assets/img/tab1.jpg";
import banner from "../../assets/img/banner1.jpg";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "home",
  components: {
    scroll
  },
  data() {
    return {
      imgs: [banner, banner, banner],
      data: [],
      pulldown: true,
      pullup: true,
      tabList: ["热卖商品", "店家推荐", "跳楼促销"],
      index: 0,
      classifylist: [
        {
          title: "喵掌柜杂货铺",
          src: tabsrc
        },
        {
          title: "喵掌柜杂货铺",
          src: tabsrc
        },
        {
          title: "喵掌柜杂货铺",
          src: tabsrc
        },
        {
          title: "喵掌柜杂货铺",
          src: tabsrc
        },
        {
          title: "喵掌柜杂货铺",
          src: tabsrc
        },
        {
          title: "喵掌柜杂货铺",
          src: tabsrc
        },
        {
          title: "喵掌柜杂货铺",
          src: tabsrc
        },
        {
          title: "喵掌柜杂货铺",
          src: tabsrc
        }
      ],
      scroll: null
    };
  },
  computed:{
    indexstyle_id(){
      return localStorage.getItem(this.store_id)
    }
  },
  beforeRouteLeave(to, from, next) {
    let positiony = this.scroll.y;
    if (positiony == null) positiony = 0;
    this.$store.commit("changeScrollY", positiony);
    next();
  },
  methods: {
    scrollmsg(scroll) {
      this.scroll = scroll;
      if (this.scroll) {
        this.scroll.scrollTo(0, this.$store.state.scrolly);
        this.scroll.hasVerticalScroll = true;
        this.scroll.maxScrollY = -1289;
      }
    },
    handleSetStore() {
      if (sessionStorage.getItem("user")) {
        console.log("开店");
        this.$router.push("/rule");
      } else {
        alert("请先登陆");
        this.$router.push("/login");
      }
    },
    handletab(i) {
      this.index = i;
    },
    handledetail(item, store_id,goods_id) {
      console.log(goods_id)
      this.$router.push({
        name: `tabdetail`,
        params: {
          item: JSON.stringify(item),
          store_id: JSON.stringify(store_id),
          goods_id
        }
      });
    },
    loadData() {
      console.log("pulldown");
    },
    loadData2() {
      // this.$http.get("/store/storelist").then(res => {
      //   let result = res.result.filter(item => {
      //     return item.logo != null;
      //   });
      //   console.log(result);
      //   // this.data = result.concat(this.data)
      //   // console.log(this.data)
      //   this.$store.commit("loadHomedata", result);
      //   this.data = this.$store.state.homedata;
      // });
      this.$http
        .get(`/buyer/homelist?type=${this.index.toString()}&pagesize=5&page=1&store_id=b677754d0282970d81e285ef6297100d`)
        .then(res => {
          if (res.code === 1) {
            let result = res.result.filter(item => {
              return item.cart_image != null;
            });
            this.data = result.concat(this.data)
            console.log(result);
            this.$store.commit("loadHomedata", result);
            this.data = this.$store.state.homedata;
          }
        });
    },
    tosearch() {
      this.$router.push("/search");
    }
  },
  created() {
    if (!this.$store.state.homedata.length) {
      // 店铺首页列表
      this.$http
        .get(`/buyer/homelist?type=${this.index.toString()}&pagesize=5&page=1&store_id=b677754d0282970d81e285ef6297100d`)
        .then(res => {
          console.log(res)
          if (res.code === 1) {
            let result = res.result.filter(item => {
              return item.cart_image != null;
            });
            console.log(result);
            this.$store.commit("loadHomedata", result);
            this.data = this.$store.state.homedata;
          }
        });
    }
  },
  mounted() {
    // console.log(this.$store.state);
    // this.$store.commit("changeTest");
    this.data = this.$store.state.homedata;
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: true,
      // 如果需要分页器
      pagination: ".swiper-pagination"
      // 如果需要前进后退按钮
      // nextButton: '.swiper-button-next',
      // prevButton: '.swiper-button-prev',
      // // 如果需要滚动条
      // scrollbar: '.swiper-scrollbar',
    });
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 90%;
  // flex: 1;
  // overflow: hidden;
  position: relative;
  box-sizing: border-box;
  .h-head {
    height: 54px;
    width: 100%;
    background: blue;
    padding-top: 2.5%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999;
    box-sizing: border-box;

    .input {
      height: 80%;
      width: 90%;
      margin: 0 auto;
      border: 1px solid #ccc;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
      border-radius: 25px;
    }
  }
  .wrapper {
    height: 92%;
    margin-top: 54px;
  }
  .set-store {
    width: 100px;
    height: 30px;
    background: seagreen;
    color: #fff;
    border: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 111111111;
  }
}
.tab {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
dl {
  width: 22%;
  height: 75px;
  margin: 4px;
  dt {
    width: 100%;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  dd {
    line-height: 25px;
    text-align: center;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
ol {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  li {
    flex: 1;
    text-align: center;
  }
  li.active {
    color: orange;
    border-bottom: 1px solid orange;
  }
}
ul.content {
  width: 100%;
  height: auto;
  // li {
    
  //   width: 100%;
    dl {
      height: 140px;
      width: 100%;
      display: flex;
      dt {
        width: 40%;
        height: 100%;
      }
      dd {
        width: 60%;
        height: 100%;
        text-align: left;
        padding: 0 10px;
        h4 {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          line-height: 28px;
          text-align: left;
        }
        .size {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          line-height: 24px;
        }
        p.bot {
          display: flex;
          justify-content: space-between;

          .price {
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #333333;
            line-height: 32px;
          }
          .addcar {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: #5adad0;
            border-radius: 6px;
            color: #fff;
            text-align: center;
            line-height: 30px;
          }
        }
      }
    }
  // }
}
ul.columnstyle{
    display: flex!important;
    width: 100%;
    flex-wrap: wrap;
    dl{
      width: 48%!important;
      height: 200px;
      flex-direction: column!important;
      margin: 3% 1%;
      dt{
        padding: 0 5px;
        box-sizing: border-box;
        width: 100%;
      }
      dd{
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      h4{
        font-size: 14px;
        line-height: 20px;
      }
    }
}
</style>
