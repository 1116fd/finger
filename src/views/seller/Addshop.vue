<template>
  <div class="addshop-box">
    <Storehead v-bind:title="title" v-bind:applist="applist" v-bind:storeid="store_id"/>
    <div class="shopdetail-box">
      <p>
        <span class="import">*</span>
        <span class="name">商品名称</span>
        <input type="text" placeholder="请输入商品名称" v-model="shopname">
      </p>
      <p>
        <span class="import">*</span>
        <span class="name">分类</span>
        <input class="ipt" @click="showselect1" ref="div" v-model="val" placeholder="请选择"/>
       <Options :show="shows1" :optionsarr="catlist" @goods="getgoods1" @hide="hidesel"></Options>
        <!-- <select v-model="selected" @change="changecat">
          <option disabled value="">请选择</option>
          <option v-for="(item,index) in catlist" :key="index">{{item.cat_name}}</option>
        </select> -->
      </p>
      <p>
        <span class="import">*</span>
        <span class="name">重量</span>
        <input type="text" class="weight" placeholder="请输入重量" v-model="shopweight">
        <input class="ipt ipt1" @click="showselect2" ref="div" v-model="weight" placeholder="请选择"/>
       <Options :show="shows2" :optionsarr="weightarr" @goods="getgoods2" @hide="hidesel"></Options>
        <!-- <select v-model="selectweight">
          <option disabled value="">请选择</option>
          <option>克</option>
          <option>千克</option>
          <option>升</option>
          <option>毫升</option>
        </select> -->
      </p>
      <p>
        <span class="import">*</span>
        <span class="name">商品售价</span>
        <input type="text" placeholder="请输入商品售价" v-model="shopprice">
      </p>
      <p>
        <span class="import">*</span>
        <span class="name">商品条码</span>
        <input type="text" placeholder="请输入商品条形码" v-model="shopcode">
      </p>
      <div class="p updatebox">
        <div class="update">
          <Uploadpic title="上传商品图片" :store_id="store_id" @imgUrl="picUrl" multiple/>
          <Uploadpic title="上传购物车图片" :store_id="store_id" @imgUrl="picUrl" multiple="multiple"/>
        </div>
        <div>
          <div class="logo-egimg"></div>
          <div class="banner-egimg"></div>
        </div> 
        <!-- <input
          type="file"
          id="upload_ele"
          multiple="false"
          accept="image/*"
          @change="(e)=>uploadshopFile(e)"
        > -->
        
      </div>
      <!-- <div class="p">
        <span class="import">*</span>
        <span class="name">购物车图片</span>
        <p class="banner-egimg"></p>
         -->
        <!-- <input
          type="file"
          id="upload_ele"
          multiple="false"
          accept="image/*"
          @change="(e)=>uploadcarFile(e)"
        > -->
      <!-- </div> -->
      <p class="goodsdetail">
        <span class="import">&nbsp;&nbsp;</span>
        <span class="name">商品详情</span>
        <textarea type="text" placeholder="请输入商品详情" v-model="shopdiscribe"></textarea>
      </p>
      <div class="addskubox">
        <button @click="toSku">添加SKU</button>
        <button @click="changeshow">+</button>
      </div>
      <div class="addbox" v-show="show2">
        <p v-for="(item,index) in skucat" :key="index">
          <span class="import">*</span>
          <span class="name" @click="selectShow(item,index)">{{item}}</span>
          <input type="text" class="weight" placeholder="请输入" v-model="catdata[index]">
        </p>
        <!-- <p>
          <span class="import">*</span>
          <span class="name">内存</span>
          <input type="text" class="weight" placeholder="请输入内存" v-model="category2">
        </p>-->
        <p>
          <span class="import">*</span>
          <span class="name">商品售价</span>
          <input type="text" placeholder="请输入商品售价" v-model="shopprice2">
        </p>
        <p>
          <span class="import">*</span>
          <span class="name">商品库存</span>
          <input type="text" placeholder="请输入商品库存" v-model="stock">
        </p>
        <p>
          <button class="" @click="saveSku">保存</button>
          <button class="" @click="createSku">生成</button>
        </p>
      </div>
    </div>
    <div class="addbtn">
      <button @click="addgoods">添加平台商品</button>
      <button>申请上架</button>
    </div>
    <Actionsheet :flag="showss" @select="onSelect" :actions="actions"/>
    <Success :success="successval" :isshow="shows"/>  
  </div>
</template>

<script>
import Storehead from "../../components/common/Storehead.vue";
import Uploadpic from "@/components/common/Upload.vue";
import Actionsheet from "@/components/Actionsheet/index.vue";
export default {
  name: "addshop",
  components: {
    Storehead,
    Uploadpic,
    Actionsheet
  },
  data() {
    return {
      successval:"",
      shows:false,
      weight:"",
      weightarr:["克","千克","升","毫升"],
      val:"",
      title: "添加商品",
      applist: "申请列表",
      showss:false,
      shows1: false,
      shows2: false,
      show2: false,
      actions: [],
      selected: "",
      shopname: "",
      shopweight: "",
      shopprice: "",
      shopcode: "",
      shopweight2: "",
      selectweight2: "",
      shopprice2: "",
      shopcode2: "",
      shopdiscribe: "",
      selectweight: "",
      catlist: [],
      imgUrl: "",
      carUrl: "",
      store_id: "",
      goods_id: "",
      cat_id: "",
      arr: [],
      arrcount: 0,
      category1: "",
      category2: "",
      stock: "",
      skuresult: [],
      skucat: ["颜色", "内存"],
      skucat2: ["单价", "库存"],
      cat: "",
      catdata: [],
      index:0,
      cats: [],
      result:[]
    };
  },
  created() {
    this.store_id =
      this.$route.query.storeid || "b677754d0282970d81e285ef6297100d";
    this.$http.post("/store/goods/cat.list",{
      store_id:this.store_id
    }).then(res => {
      console.log(res)
      if (res.code == 1) {
        this.catlist = [...res.result];
      }
    });
  },
  methods: {
     times(){
    setTimeout(()=>{
            this.shows=false
          },2000)
  },
    showselect1(){
      this.shows1=true
    },
    showselect2(){
      this.shows2=true
    },
    getgoods1(data){
      console.log(data)
      this.val=data.cat_name
      this.cat_id=data.cat_id
      this.show=false
      this.$refs.div.innerHTML=this.values
    },
    getgoods2(data){
      this.weight=data
    },
    hidesel(){
      this.shows1=false
      this.shows2=false
    },
    selectShow(cat) {
      this.showss = true;
      console.log(cat);
      this.cat = cat;
      this.index = index;
      this.actions = this.result[index].params;
      
    },
    onSelect(data) {
      console.log(data);
      console.log(this.result)
      if(data!=undefined){
        this.catdata[this.index] = data;
        let cat = this.cat;
        this.cats.push({ cat: data });
      }
      
      this.showss = false;
    },
    saveSku() {
      let a = this.cats.map((item)=>{
        return item.cat
      })
      this.skuresult.push(a.concat([this.shopprice2,this.stock]));
      console.log(this.skuresult);
      this.show2 = false;
    },
    createSku() {
      let a = this.cats.map((item)=>{
        return item.cat
      })

      this.skuresult.push(a.concat([this.shopprice2,this.stock]));
      
      this.$router.push({
        name: `skuresult`,
        params: {
          skuhead:this.skucat.concat(this.skucat2),
          skubody:this.skuresult
        }
      });
    },
    picUrl(url) {
      if (typeof url == "string") {
          this.imgUrl = url;

      } else if (url instanceof Array) {
        this.bannerUrl = [...url];
        this.carUrl = [...url];
      }
    },
    changecat() {
      this.catlist.forEach(item => {
        if (item.cat_name === this.selected) {
          this.cat_id = item.cat_id;
        }
      });
      console.log(this.cat_id);
    },
    toSku() {
      this.$router.push({
        name: `sku`,
        params: {
          cat_id: this.cat_id.toString(),
          store_id: this.store_id,
          goods_id:this.goods_id
        }
      });
    },
    changeshow() {
      // this.show = true;
      this.show2 = true;
      // let params = {
      //   shopweight2:this.shopweight2,
      //   selectweight2:this.selectweight2,
      //   shopprice2:this.shopprice2,
      //   shopcode2:this.shopcode2,
      //   carUrl2:this.carUrl2
      // }
      this.loading = this.$loading();
      console.log("get",this.cat_id.toString(), this.store_id);

      let result = JSON.parse(sessionStorage.getItem(this.$store.state.goods_id));
      console.log(result)
      this.result = result;
      this.skucat = result.map(item=>{
        return item.group
      })
      this.$http
        .post(`/store/goods/sku.get`, {
          // cat_id: "8217c3fdb19242d7fd86f558d1872b48",
          // store_id: '1e01685654c1cb5672e896c58f011dbf'
          cat_id: this.cat_id.toString(),
          store_id: this.store_id
        })
        .then(
          res => {
            console.log(res);
          
            this.loading.close();
          },
          () => {
            this.loading.close();
          }
        ).catch(()=>{
          this.loading.close();
        });
    },
    uploadshopFile(e) {
      let formData = new FormData();
      formData.append("files", e.target.files[0]);
      this.$http
        .post(`/upload?store_id=${this.store_id}`, formData)
        .then(res => {
          console.log(res);
          if (res.code === 1 && res.url.length) {
            this.imgUrl = res.url[0].url;
          }
        });
    },
    uploadcarFile(e) {
      let formData = new FormData();
      formData.append("files", e.target.files[0]);
      this.$http
        .post(`/upload?store_id=${this.store_id}`, formData)
        .then(res => {
          console.log(res);
          if (res.code === 1 && res.url.length) {
            this.carUrl = res.url[0].url;
          }
        });
    },
    uploadcarFile2(e) {
      let formData = new FormData();
      formData.append("files", e.target.files[0]);
      this.$http
        .post(`/upload?store_id=${this.store_id}`, formData)
        .then(res => {
          console.log(res);
          if (res.code === 1 && res.url.length) {
            this.carUrl2 = res.url[0].url;
          }
        });
    },
    addgoods() {
      console.log(this.carUrl)
      this.$http
        .post("/store/goods/create", {
          store_id: this.store_id,
          goods_name: this.shopname,
          cat: this.val,
          price: this.shopprice,
          image: this.imgUrl,
          detail: this.shopdiscribe,
          sku:'[{"group":"颜色","params":["白色","黑色"]}]',
          cat_id: this.cat_id.toString(),
          cart_image: JSON.stringify(this.carUrl),
          market_price: this.shopprice,
          cost_price: "12"
          // code_bar:''
        })
        .then(res => {
          console.log(res);
          if (res.code === 1) {
            this.goods_id = res.goods_id;
            this.$store.commit("savegoodsid", res.goods_id);
            this.shows=true;
          this.successval="添加商品成功"
          this.times()

          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.ipt1{
  width: 50px;
}
.addshop-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.shopdetail-box {
  flex: 1;
  border-top: 1px solid #ccc;
  background: #f8f8f8;
  padding: 15px;
  box-sizing: border-box;
}
p,
.p {
  width: 100%;
  height: 6%;
  line-height: 100%;
  .import {
    color: red;
    padding-right: 10px;
    box-sizing: border-box;
  }
  select {
    height: 80%;
  }
  .weight {
    width: 45%;
  }
  .name {
    display: inline-block;
    width: 24%;
  }
  input {
    width: 60%;
    height: 80%;
  }
  textarea {
    width: 60%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
}
.goodsdetail{
  display: flex;
  align-items: center;
  height: 70px;
}
.logo-egimg{
  height: 108px;
}
.banner-egimg {
    width: 100%;
    height: auto;
    img{
      width: 108px;
      height: 108px;
    }
  }
.addskubox,
.addbtn {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}
.addskubox {
  margin-top: 20px;
}
button {
  width: 40%;
  height: 60%;
  background: skyblue;
  border: none;
  color: #fff;
  border-radius: 7px;
  font-size: 17px;
}
.updatebox{
  display: flex;
  height: 210px;
  margin-bottom: 10px;
}
</style>
