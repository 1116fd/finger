<style lang="scss" scoped>
    .collect{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .bscroll{
        width: 100%;
        height: 625px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .bscroll-container ul{
        width: 100%;
        height: auto;
        padding:0 15px;
        box-sizing: border-box;      
    }
    .bscroll-container ul li{
        width: 100%;
        height: 75px;
        display: flex;
        align-items: center;
        border-bottom: #EBEBEB 1px solid;
    }
    .itemleft{
        width: 20%;
        height: 65px;
        padding: 0 5px;
        box-sizing: border-box;
    }
    .itemleft img{
        width: 100%;
        height: 100%;
    }
     .itemcon{
        width: 60%;
        height: 65px;
        padding: 0 5px;
        box-sizing: border-box;
    }
    .itemcon p{
        line-height: 30px;
    }
    .itemcon span{
        border:solid 1px #9999;
        padding: 3px 5px;
        background:#ccc;
    }
     .itemright{
        width: 20%;
        height: 65px;
    }
    .itemright dl{
        width: 100%;
        height: 65px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .itemright dl dt i{
        font-size: 25px;
        color: rgba(199, 6, 6, 0.788);
    }
    .itemright .dls dt i{
        font-size: 25px;
    }
    .itemright dl dd{
        font-size: 12px;
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
            color: red!important;
        }
    }
    .nofollow{
        i{
            color: #ccc!important;
        }
    }
</style>
<template>
    <div class="collect">
        <Head title="收藏店铺列表"/>
        <div class="bscroll clearposition" ref="bscroll">
            <div class="bscroll-container">
                <ul v-if="none">
                    <li v-for="(x) in bookmark" :key="x.store_id">
                        <div class="itemleft"><img :src="x.logo" alt=""></div>
                        <div class="itemcon"><p>{{x.store_name}}</p><span>{{x.catagory}}</span></div>
                        <div class="follow " @click="handleor(x.store_id)"><i class="iconfont icon-shoucang"></i><span>取消关注</span></div>
                        <!-- <div class="itemright">
                            <dl @click="changecolor">
                            <dt><i class="iconfont icon-shoucang"></i></dt>
                            <dd>取消关注</dd>
                            </dl>
                        </div> -->
                    </li>
                    <!-- <li v-if="none">
                        <div class="itemleft"><img src="../../assets/logo.png" alt=""></div>
                        <div class="itemcon"><p>秀色可餐蛋糕店</p><span>蛋糕</span></div>
                        <div class="itemright">
                            <dl>
                            <dt><i class="iconfont icon-shoucang"></i></dt>
                            <dd>取消关注</dd>
                            </dl>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Head from '@/components/Head.vue'
import BScroll from "better-scroll";
import "../../common/common.css"
export default {
    data(){
        return{
            iscolor:true,
            bookmark:[],
            follow:true,
            none:true
        }
    },
  name: "collect",
  components: {
    Head
  },
  created(){
      this.bookmark = this.$store.state.bookmark;
      console.log(this.bookmark)
  },
   mounted(){
    this.$nextTick(() => {
        let bscrollDom = this.$refs.bscroll;
        this.aBScroll = new BScroll(bscrollDom,{
          probeType:2,
           click:true
        })
      })   
  },
  methods:{
    handleor(store_id){
      this.loading = this.$loading();
      this.$http.post(`/buyer/user/store.collect.remove`,{
        token:sessionStorage.getItem('token'),
        store_id:store_id
      }).then(res=>{
        this.loading.close();
        console.log(res)
      }).catch(()=>{
          this.loading.close();
      }) 
      this.bookmark =  this.bookmark.filter(item=>item.store_id!=store_id);
      this.$store.commit("setbookmark", this.bookmark);
      this.bookmark = this.$store.state.bookmark;
      console.log(this.bookmark)
      if(!this.bookmark.length){
          this.none = false;
      }else{
          this.none = true;
      }
    }
  }
};
</script>
