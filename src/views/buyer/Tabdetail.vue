<template>
    <div class="box">
        <Head :title="every.store_name"/>
        <div class="top">
          <div class="place">
            <i class="iconfont icon-dingwei1"></i><p ref="address">请选择配送地址</p>
          </div>
          <dl class="dl">
            <dt>
              <img class="logo" v-lazy="every.logo" alt="">
            </dt>
            <dd>
              <div class="hh"><h3>{{every.store_name}}<span v-if="open">(营业中)</span><span v-else>(已打烊)</span></h3><p>满49包邮</p></div>
              <div :class="follow ?'follow':'follow nofollow' " @click="handleor"><i class="iconfont icon-shoucang"></i><span>{{follow? '已关注':'未关注'}}</span></div>
            </dd>
          </dl>
        </div>
        <scroll 
          class="wrapper"
          ref="wrapper"
          :data="datas"
          :pulldown="pulldown"
          :pullup="pullup"
          @pulldown="loadData"
          @scrollToEnd="loadData2"
          @scrollmsg="scrollmsg">
            <div>
            <Swiper :imgs="imgs"></Swiper>
            <ol>
                <li
                :class="i==index?'active':''"
                v-for="(item,i) in tabList"
                :key="i"
                @click="handletab(i)"
                :i="i"
                >{{item}}</li>
            </ol>
            <p class="showbox" v-if="tips">亲爱的，你还没有添加任何商品哦~</p>
            <ul :class="every.indexstyle_id==0 ? 'content':'columnstyle' " v-else>
                <dl v-for="(item,i) in datas"
                :key="i" 
                :id="item.store_id">
                    <dt @click="handledetail(item.store_id,item.goods_id)">
                      <img v-if="item.cart_image" v-lazy="item.cart_image" alt="">
                      <img v-else v-lazy="item.logo" alt="">
                    </dt>
                    <dd>
                    <h4>{{item.goods_name}}</h4>
                    <p class="size">专柜价：￥{{item.market_price}}.00</p>
                    <p class="bot">
                        <span class="price">￥{{item.price}}.00</span>
                        <span class="addcar" @click="handleadd(item)">+</span>
                    </p>
                    </dd>
                </dl>
               
            </ul>
           
            <div class="loading-wrapper"></div>
            </div>
        </scroll>
    </div>
</template>

<script>
import scroll from "@/components/buyer/Scroll.vue";
import banner from "@/assets/img/banner1.jpg";
import Head from '@/components/Head.vue'
import Swiper from '@/components/common/Swiper.vue'
    export default {
        name:'tabdetail',
        components: {
            scroll,
            Swiper,
            Head
        },
        data(){
            return {
                imgs: [banner, banner, banner],
                datas: [],
                pulldown: true,
                pullup: true,
                scroll: null,
                tabList: ["热卖商品", "店家推荐", "跳楼促销"],
                index: 0,
                every:{},
                follow:true,
                count:0,
                role:true,
                open:false,
                store_id:'',
                address:{},
                bookmark:[],
                token:'',
                listdata:[],
                page:1,
                pagesize:4,
                lat:"",
                lng:"",
                tips:true
            }
        },
        beforeRouteLeave(to, from, next) {
          let positiony = this.scroll.y;
          if (positiony == null) positiony = 0;
          this.$store.commit("changeScrollY", positiony);
          next();
        },
        created(){
            this.store_id=this.$route.params.store_id || 'b677754d0282970d81e285ef6297100d';
            this.token = sessionStorage.getItem("token") || ''
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

            //获取地址
            this.$http.get('/location',{
               params:{
                    lat:"39.95933",
                    lng:"116.29845"
               }
            }).then(res=>{
               this.address=res.result.address
               this.$refs.address.innerHTML=this.address
            })

            
            // 获取店铺信息
            this.$http.get('/store/getstore?store_id='+this.store_id).then(res=>{
              if(res.code == 1){
                this.$store.commit("Toevery",res.result[0]);
                this.every = this.$store.state.every;
                // // 收藏店铺    
                // this.book(); 
                this.imgs = this.every.banner.split(',');
                if(this.every.business_time!==''){
                  let newweek =this.getWeekDate();
                  if(this.every.business_time){
                    let business_time = this.every.business_time.split(',');
                    this.open = business_time.map(item=>{
                      if(item==newweek){
                        return true;
                      }else{
                        return false;
                      }
                    })
                  }
                }
              }
        })

        if (!this.$store.state.homedata.length) {
           this.tips==false
          // 店铺首页列表
          this.$http
            .get(`/buyer/homelist?type=${this.index.toString()}&pagesize=5&page=1&store_id=${this.store_id}`)
            .then(res => {
              if (res.code === 1) {
                let result = res.result.filter(item => {
                  return item.cart_image != null;
                });
                this.$store.commit("loadHomedata", result);
                this.datas = this.$store.state.homedata;
                
              }
            });
        }   
        this.listdata = JSON.parse(localStorage.getItem('listdata')) || []
    },
    methods:{
      scrollmsg(scroll) {
        this.scroll = scroll;
        if (this.scroll) {
          this.scroll.scrollTo(0, this.$store.state.scrolly);
          this.scroll.hasVerticalScroll = true;
          this.scroll.maxScrollY = -1289;
        }
      },
      handledetail(store_id,goods_id) {
        this.$router.push({
          name: `goodsdetail`,
          params: {
            store_id,
            goods_id,
            open:this.open
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
      //   // this.datas = result.concat(this.datas)
      //   // console.log(this.datas)
      //   this.$store.commit("loadHomedata", result);
      //   this.datas = this.$store.state.homedata;
      // });
      this.page++;
      this.$http
        .get(`/buyer/homelist?type=${this.index.toString()}&pagesize=${this.pagesize}&page=${this.page}&store_id=${this.store_id}`)
        .then(res => {
          console.log(res)
          if (res.code === 1) {
            let result = res.result.filter(item => {
              return item.cart_image != null;
            });
            this.datas = result.concat(this.datas)
            this.$store.commit("loadHomedata", result);
            this.datas = this.$store.state.homedata;
          }
        });
    },
    getWeekDate() {
      var now = new Date();
      var day = now.getDay();
      var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      var week = weeks[day];
      return week;
    },
    handletab(i) {
        this.index = i;
    },
    handleadd(i) {
      i.count = 1;
      if(sessionStorage.getItem('token')){
        // this.loading = this.$loading();
        this.$http.post(`/buyer/cart/add`,{
          token:sessionStorage.getItem('token'),
          goods_id:i.goods_id,
          price:i.price,
          count:i.count,
          sku:'[{"group":"颜色","params":["白色","黑色"]}]'
        }).then(res=>{
          // this.loading.close();
        }).catch(()=>{
          // this.loading.close();
        })
      }
      
      if(this.listdata.length==0){
         this.listdata.push(i);
        console.log(this.listdata)
      }else{
        this.listdata = this.listdata.filter(item=>{
            if(item.goods_id!=i.goods_id){         
                return item
            }
        })
        this.listdata.push(i);
      }
      localStorage.setItem('listdata',JSON.stringify(this.listdata))
    },
    handleor(){
      this.follow = !this.follow;
      this.book();
    },
    book(){
      
      if(this.follow){
        this.$http.post(`/buyer/user/store.collect.add`,{
          token:this.token,
          store_id:this.store_id
        }).then(res=>{
        })
        if(!this.bookmark.length){
          this.bookmark.push(this.every);
        }else{
          this.bookmark = this.bookmark.filter(item=>item.store_id!=this.every.store_id)  
          this.bookmark.push(this.every)
        }
      }else{
        this.$http.post(`/buyer/user/store.collect.remove`,{
          token:this.token,
          store_id:this.store_id
        }).then(res=>{
        }) 
       this.bookmark =  this.bookmark.filter(item=>item.store_id!=this.every.store_id);
      }
      this.$store.commit("setbookmark", this.bookmark);
    },
    }
    
  }
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
    height: 100%;
  display: flex;
  flex-direction: column;
}
.home{
    width: 100%;
    height: 80%;
    margin-top: 100px;
}
.top{
  width: 100%;
    margin-top: 44px;
    position: absolute;
    left: 0;
    z-index: 999999999;
    background: #fff;
    .place{
      display: flex;
      color: #fff;
      background: #333333;
      font-size: 16px;
      height: 44px;
      line-height: 44px;
      i{
        margin: 0 5px;
      }
    }
    dl{
      display: flex;
      height: 78px;
      dt{
        width: 20%;
        height: 78px;
        display: flex;
        align-items: center;
        padding-left:15px;
        box-sizing: border-box;
        .logo{
          width: 46px;
          height: 46px;
        }

      }
      dd{
        display: flex;
        flex: 1;
        padding-left: 5px;
        .hh{
          flex: 1;
          text-align: left;
          h3{
            font-size: 16px;
          }
        }
        .follow{
          width: 30%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #999999;
          i{
            width: 25px;
            height: 25px;
            display: inline-block;
            color: orange!important;
          }
        }
        .nofollow{
          i{
            color: #ccc!important;
          }
        }
      }
    }
}
.wrapper {
    height: 63%;
    margin-top: 166px;
  }
ol {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  border-bottom: 1px solid #ccc;
  li {
    flex: 1;
    text-align: center;
  }
  li.active {
    color: orange;
    border-bottom: 1px solid orange;
  }
}
// .banner{
//   height: 100px;
//   margin-top: 1px;
// }
// .bannerimg{
//   width: 100%;
//   height: 100%;
// }
.content {
  width: 100%;
  height: auto;
  dl {
      height: 150px;
      width: 100%;
      display: flex;
      dt {
        width: 48%;
        height: 100%;
        img{
          width: 100%;
        }
      }
      dd {
        width: 52%;
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
}
.showbox{
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  backface-visibility: red;
}
ul.columnstyle{
    display: flex!important;
    flex-wrap: wrap;
    dl{
      width: 50%;
      height: 240px;
      flex-direction: column!important;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 10px 10px;
      box-sizing: border-box;
      dt{
        box-sizing: border-box;
        width: 100%;
        height: 140px;
        img{
          width: 100%;
          
        }
      }
      dd{
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
      }
      h4 {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
          line-height: 28px;
          text-align: left;
        }
        .size {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          line-height: 24px;
          text-align: left;
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
</style>