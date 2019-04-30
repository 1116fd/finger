<style  lang="scss" scoped>
.shopbox {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}
.scroll {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.shopbox-a {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.shop-title {
  width: 100%;
  height: 45px;
  line-height: 45px;
  white-space: nowrap;
  padding: 0 20px;
  background: #fff;
  box-sizing: border-box;
  span {
    color: #ccc;
  }
}
.shop-fileimg {
  width: 105px;
  height: 105px;
  border: 1px dashed #ccc;
  display: flex;
  flex-direction: column;
  text-align: center;
  background: #fff;
  position: relative;
  .plus-btn {
    font-size: 40px;
    margin-top: 20px;
  }
  .plus-title {
    font-size: 12px;
  }
  .plus {
    width: 105px;
    height: 105px;
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    z-index: 2;
  }
}
.shopbox-b {
  width: 100%;
  height: auto;
}
.banner {
  width: 100%;
}
.banner-egimg {
  width: 100%;
  height: auto;
}
.shop-bannerimg {
  width: 100%;
  height: 105px;
  border: 1px dashed #ccc;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  .plus-btn {
    font-size: 40px;
    margin-top: 20px;
  }
  .plus-title {
    font-size: 12px;
  }
  .plus {
    width: 100%;
    height: 105px;
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
  }
}

.title-name-box {
  width: 100%;
  height: auto;
  margin-top: 10px;
  background: #fff;
  .title-name {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    box-sizing: border-box;
    span {
      width: 25%;
      height: 100%;
      display: inline-block;
      line-height: 50px;
    }
    input {
      width: 60%;
      height: 100%;
      padding-left: 30px;
      border: none;
      outline: 0;
      background: none;
      -webkit-appearance: none;
    }
  }
}
.checkbox {
  width: 100%;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .checkbox-item {
    width: 32%;
    height: 30px;
    vertical-align: center;
    display: flex;
    // background: red;
  }
  span {
    padding-left: 10px;
    box-sizing: border-box;
    margin-top: -2px;
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
.logo {
  width: 100%;
  height: 105px;
  display: flex;
  .logo-egimg {
    width: auto;
    height: 105px;
    display: flex;
  }
}
.timesipt{
  width: 70px;
  height: 25px;
  border-radius: 5px;
  border: solid 1px #ccc;
  padding-left: 5px;
  box-sizing: border-box;
}
</style>
<template>
  <div class="shopbox" ref="shopbox">
    <Storehead v-bind:title="title"/>
    <div class="scroll">
      <div class="shopbox-a">
        <p class="shop-title">店铺LOGO</p>
        <div class="logo">
          <div class="logo-egimg"></div>
          <Uploadpic title="上传logo" :store_id="store_id" @imgUrl="picUrl" multiple/>
        </div>
        <!-- <span class="plus-btn">+</span>
                <span class="plus-title">上传logo</span>
        <input type="file" class="plus"  @change="(e)=>fileLogo(e)">-->
      </div>
      <div class="shopbox-b">
        <p class="shop-title">
          店铺banner
          <span>(1~3张图片)</span>
        </p>
        <div class="banner">
          <div class="banner-egimg"></div>
          <div class="shop-bannerimg">
            <Uploadpic title="上传banner" :store_id="store_id" @imgUrl="picUrl" multiple="multiple"/>
            <!-- <span class="plus-btn">+</span>
                  <span class="plus-title">上传logo</span>
            <input type="file" class="plus"  multiple="multiple"  @change="(e)=>fileBanner(e)">-->
          </div>
        </div>
      </div>
      <div class="title-name-box">
        <p class="title-name">
          <span>店铺名称</span>
          <input type="text" placeholder="请输入店铺名称" v-model="getshopname">
        </p>
        <p class="title-name">
          <span>起送价格</span>
          <input type="text" placeholder="请输入起送价格" v-model="getprice">
        </p>
        <p class="title-name">
          <span>配 送 费</span>
          <input type="text" placeholder="请输入配送费" v-model="delivery_fee">
        </p>
      </div>
      <div class="shopbox-a">
        <p class="shop-title aaa">营业周期</p>
        <!-- <Checkbox v-model="bool" />   -->
        <div class="checkbox">
          <!-- <p v-for="(i,index) in week" :key="index">
            <input type="checkbox" :id="index" :value="i" @change="(e)=>businessTime(e)">
            <label :for="index">{{i}}</label>
          </p>-->
          <CheckboxGroup v-model="result" :result="result" :list="week" @businessTime="businessTime"></CheckboxGroup>
        </div>
      </div>
      <div class="time-box">
        <p class="shop-title">营业时间</p>
        <div class="dobusiness">
          <input class="ipt timesipt" @click="showselect1" ref="div" v-model="val1" placeholder="请选择"/>
       <Options :show="show1" :optionsarr="starttime" @goods="getgoods1" @hide="hidesel"></Options>
          <!-- <select v-model="selected" @change="(e)=>startTime(e,0)">
            <option
              v-for="(option,i) in starttime"
              v-bind:value="option.value"
              :key="i"
            >{{ option.text }}</option>
          </select> -->
          <span>至</span>
          <input class="ipt timesipt" @click="showselect2" ref="div" v-model="val2" placeholder="请选择"/>
       <Options :show="show2" :optionsarr="endtime" @goods="getgoods2" @hide="hidesel"></Options>
        </div>
      </div>
      <div class="time-box">
        <p class="shop-title">配送时效</p>
        <input class="ipt timesipt" @click="showselect3" ref="div" v-model="val3" placeholder="请选择"/>
       <Options :show="show3" :optionsarr="times" @goods="getgoods3" @hide="hidesel"></Options>
      </div>
      <div class="changestyle">
        <dl @click="picked1">
          <dt>
            <img src="/img/leftstyle.png" alt="">
          </dt>
          <dd>
            <input type="radio" id="one" name="picked" value="1" v-model="picked">
          </dd>
        </dl>
        <dl @click="picked2">
          <dt>
            <img src="/img/rightstyle.png" alt="">
          </dt>
          <dd>
            <input type="radio" id="two" name="picked" value="2" v-model="picked">
          </dd>
        </dl>
      </div>
      <button class="save" @click="saveinfo">保存</button>
      <div class="bottom-box"></div>
      <Success :success="successval" :isshow="shows"/> 
    </div>
    
  </div>
</template>

<script>
import loading from "@/common/Loading";
import Storehead from "../../components/common/Storehead.vue";
import Uploadpic from "@/components/common/Upload.vue";
import CheckboxGroup from "@/components/CheckboxGroup/index.vue";
export default {
  name: "shopset",
  components: {
    Storehead,
    Uploadpic,
    CheckboxGroup
  },
  data() {
    return {
      successval:"",
      shows:false,
      val1:"",
      val2:"",
      val3:"",
      show1:false,
      show2:false,
      show3:false,
      title: "店铺设置",
      getshopname: "",
      getprice: "",
      selected: "08:00",
      selecteds: "18:00",
      delivery: "A",
      changestyle: "A",
      picked: "1",
      starttime: ["08:00" ,"09:00","10:00","11:00","12:00" ],
      endtime: ["18:00" ,"19:00" ,"20:00" ,"21:00" ,"22:00" ],
      times:["30:00" ,"60:00" ,"90:00" ],
      deliverytime: ["A" ,"B" ,"C" ],
      bannerUrl: [],
      imgUrl: "",
      week: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ],
      result: {
        星期一: false,
        星期二: false,
        星期三: false,
        星期四: false,
        星期五: false,
        星期六: false,
        星期日: false
      },
      weeks: [],
      getTime: [],
      contact_number: "13612344321",
      myindexstyle: "1",
      delivery_fee: "",
      store_id: "62bc38d4ff9b0d67b54d1191f3f0c2e4"
    };
  },
  //请求时所要用的店铺id,已跑通到时候修改参数就可以
  created() {
    if (this.$route.query.storeid) {
      this.store_id = this.$route.query.storeid;
    } else {
      let storeinfo = this.$route.params.storeinfo;
      this.store_id = storeinfo.store_id;
      this.getshopname = storeinfo.store_name;
      this.imgUrl=storeinfo.logo
      this.bannerUrl=[storeinfo.banner]
      this.contact_number = storeinfo.contact_number
      this.picked = storeinfo.indexstyle_id;
      this.delivery_fee = storeinfo.delivery_fee;
    }
    console.log(this.store_id);
  },
  // 切换风格
  watch: {
    picked() {
      if (this.picked == "1") {
        console.log(this.picked);
      } else if (this.picked == "2") {
        console.log(this.picked);
      }
    }
  },
  methods: {
    // times(){
      
    //   },
    showselect1(){
      this.show1=true
    },
    showselect2(){
      this.show2=true
    },
    showselect3(){
      this.show3=true
    },
    getgoods1(data){
      this.val1=data
    },
    getgoods2(data){
      this.val2=data
    },
    getgoods3(data){
      this.val3=data
    },
    hidesel(){
      this.show1=false
      this.show2=false
      this.show3=false
    },
    picked1() {
      this.picked = 1;
      console.log(this.imgUrl);
    },
    picked2() {
      this.picked = 2;
    },
    picUrl(url) {
      if (typeof url == "string") {
        this.imgUrl = url;
      } else if (url instanceof Array) {
        this.bannerUrl = [...url];
      }
    },
    businessTime(e) {
      let weeks = this.weeks;
      if (weeks.length === 0) {
        
        weeks.push(e);
        return;
      }
      let isHas = weeks.filter(val => {
        return val === e;
      });
      if (isHas.length) {
        weeks = weeks.filter(item => {
          return item !== e;
        });
      } else {
        weeks.push(e);
      }
      this.weeks = weeks;
      console.log(weeks)
    },
    startTime(e, index) {
      let getTime = this.getTime;
      getTime[index] = e.target.value;
      this.getTime = getTime;
    },
    saveinfo() {
      localStorage.setItem(this.store_id,this.picked)
      let bannerUrl = "";
      this.bannerUrl.forEach(val => {
        bannerUrl += "," + val;
      });
      let business_time = "";
      this.weeks.forEach(val => (business_time += val + ","));
      this.getTime.forEach(val => (business_time += val + "-"));
      let params = {
        banner: bannerUrl.substring(1, bannerUrl.length),
        store_name: this.getshopname,
        store_id: this.store_id,
        brand_name: this.getshopname,
        main_image: "",
        contact_number: this.contact_number,
        business_time: business_time.substring(0, business_time.length - 1),
        indexstyle_id: JSON.parse(this.picked),
        delivery_fee: JSON.parse(this.delivery_fee),
        logo: this.imgUrl
      };
      console.log(params);
      

      this.$http
        .post("/store/decorate", params)
        .then(res => {
          console.log(res);
          if (res.code === 1) {
            this.$router.push({path:'/index',query: {storeid:this.store_id}})
            this.loading.close();
            this.shows=true;
            this.successval="店铺设置成功"
            setTimeout(()=>{
                this.shows=false
            },2000)
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.loading = this.$loading();
    }
  }
};
</script>