<template>
    <div class="doodsupdate">
        <p><span>商品名称：</span><input type="text" v-model="name" ></p>
        <p><span>商品编号：</span><input type="text" v-model="number"></p>
        <p><span>商品类型：</span><input type="text" v-model="types" ><span>0:;1:;2:</span></p>
        <p><span>商品售价：</span><input type="text" v-model="price" ></p>
        <p><span>商品操作：</span><input type="text" v-model="status"><span>0:下架;1:上架</span></p>
        <div class="banner-egimg"></div>
        <div class="box">
            <div class="logo-egimg "></div>
            <Uploadpic title="上传商品图片" :store_id="store_id" @imgUrl="picUrl" multiple/>
        </div>
        <p class="btn" @click="updategoods">保存修改</p>
    </div>
</template>
<script>
import Uploadpic from "@/components/common/Upload.vue";
export default {
    name:"doodsupdate",
    data(){
        return{
            goods:{},
            name:"",
            number:"",
            types:"",
            price:"",
            status:"",
            imgUrl: "",
            carUrl:[],
            store_id:''
        }
    },
    created(){
        this.store_id=this.$route.params.storeid || "b677754d0282970d81e285ef6297100d";
    },
    components:{
        Uploadpic
    },
    mounted() {
        this.goods=this.$route.params.good
        if(this.goods){
            this.name=this.goods.goods_name
            this.number=this.goods.serial_number
            this.types=this.goods.type
            this.price=this.goods.market_price
            this.status=this.goods.status
        }
    },
    methods: {
        updategoods(){
            this.loading = this.$loading();
            this.$http.post("/store/goods/edit",{
                goods_id:this.goods.goods_id,
                goods_name:this.name,
                price:this.price.toString(),
                image:this.imgUrl,
                sku:'[{"group":"颜色","params":["白色","黑色"]},{"group":"尺码","params":["小号","大号"]}]',
                detail:"好看",
                type:this.types.toString()||""
            }).then(res=>{
                this.loading.close();
                if(res.code==1){
                    this.$router.push({
                    name:"shoplist",
                })
               }
            }).catch(()=>{
                this.loading.close();
            })
        },
    picUrl(url) {
      if (typeof url == "string") {
          this.imgUrl = url;

      } else if (url instanceof Array) {
        this.bannerUrl = [...url];
        this.carUrl = [...url];
      }
    }
    },
}
</script>
<style lang="scss">
.doodsupdate{
    width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
.doodsupdate p{
    line-height: 50px;
    margin-top: 5px;
}
.doodsupdate p span{
    margin-right: 5px;
}
.btn{
    text-align: center;
    background: rgb(13, 214, 164);
    padding: 5px 10px;
    border-radius: 20px;
    color: #fff;
    font-size: 24px;
}
.box{
    display: flex;
    .logo-egimg{
        height: 108px;
        display: flex;
        width: auto;
    }
}
</style>