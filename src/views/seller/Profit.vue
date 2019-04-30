<style lang="scss" scoped>
  .profit{
    width: 100%;
    height: 100%;
    background: rgb(236, 234, 234);;
  }
  .marrybox{
    width: 100%;
    height: 120px;
    background: #cccc;
  }
  .kong{
    width: 100%;
    height: 15px;
  }
  .jiesuan{
    width: 100%;
    height: 15px;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    padding:0 15px;
    box-sizing: border-box;
  }
  .ketixian{
    width: 100%;
    height: 20px;
    font-size: 14px;
    color: orange;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .marry{
    width: 100%;
    height: 70px;
    font-size: 40px;
    color:#333333;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .qiehuan{
    width: 100%;
    height: auto;
    background: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  .qiehuannav{
    width: 100%;
    height: 100px;
  }
   .qiehuannav ul{
     width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom:#999 1px solid;
   }
   .qiehuannav ul li{
     width: 33%;
     text-align: center;
     box-sizing: border-box;
   }
   .time{
     padding: 15px 0;
   }
   .qiehuantime{
     width: 100%;
     height: 50px;
     background: #ccc;
   }
   .qiehuantime ul{
     width: 100%;
     height: 50px;
     display: flex;
     justify-content: center;
     align-items: center; 
   }
   .qiehuantime ul li{
     padding: 0 10px;
     //border: solid 1px #ccc;
   }
   .active{
     border-bottom: solid 2px orange;
     color: orange;
   }
  .qiehuancon{
    width: 100%;  
    height: auto;
    border: solid 1px #999;
  }
  .showdiv{
    display: block;
  }
   .order{
     width: 100%;
     height: auto;
     background: #fff;
   }
   .order p{
     width: 100%;
     height: 50px;
     padding: 0 15px;
     box-sizing: border-box;
     border-bottom: 1px #999 solid;
     
   }
   .order p .sellerorderlink{
     text-decoration: none;
     width: 100%;
     height: 50px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     color: #333333;
   }
   .order p .sellerorderlink i{
     font-size: 25px;
   }
   
   .cats{
     height: 25px!important;
     li{
       height: 25px!important;
       font-size: 14px;
     }
   }
   .styles{
     height: 25px!important;
     li{
       height: 25px!important;
       font-size: 14px;
     }
     
   }
   .act{
        background: red;
        height: 100%;
        color: #fff;
      }
</style>
<template>
     <div class="profit">
       <Head title="销售报表"/>
      <!-- <div class="marrybox">
        <div class="kong"></div>
        <p class="jiesuan"><i></i><span>结算说明</span></p>
        <div class="ketixian">可提现</div>
        <div class="marry"><span>1,800.00</span></div>
      </div> -->
      <div class="qiehuan">
        <div class="qiehuannav">
          <ul>
            <li :class="index==y ?'active time':'time' " v-for="(x,y) in timetable" :key="y" @click="timeSelect(y)">{{x}}</li>
          </ul>
          <ul class="cats">
            <li :class="cat==y ?'act':'' " v-for="(x,y) in family" :key="y" @click="catSelect(y)">{{x}}</li>
          </ul>
          <ul class="styles">
            <li :class="styleind==y ?'act':'' " v-for="(x,y) in linestyle" :key="y" @click="styleSelect(y)">{{x}}</li>
          </ul>
        </div>
        <div>
          <div id="myChart" :style="{width: '110%', height: '300px',margin:'0px 0px',boxSizing:'border-box'}"></div>
          <!-- <div id="myChart1" :style="{width: '110%', height: '300px',margin:'0px 0px',boxSizing:'border-box'}"></div>
          <div id="myChart2" :style="{width: '110%', height: '300px',margin:'0px 0px',boxSizing:'border-box'}"></div> -->
        </div>
        <!-- <div class="qiehuancon">
          <ul>
            <li v-for="(item,i) in timearr" :key="item.id" @click="addtime(i)"  :class="idx1==item.id-1?'active':''">{{item.val}}</li>
          </ul>
        </div> -->
      </div>
      <!-- <div class="order">
        <p><router-link to="/receipt" class="sellerorderlink"><span>订单明细</span><i class="iconfont icon-angle-right"></i></router-link></p>
      </div> -->
     </div>
</template>

<script>
import Head from "@/components/seller/head.vue"
export default {
  name:"profit",
  data(){
    return {
      timetable:['本周数据','本月数据','本年数据'],
      family:['销售统计','收益统计','类别统计'],
      linestyle:['柱形','折线','饼图'],
      store_id:'',
      index:0,
      cat:0,
      styleind:0,
      flag:0,
      date:null,
      monday:null,
      sunday:null,
      firstday:null,
      lastday:null,
      firstyear:null,
      lastyear:null,
      categoryname:[],
      categoryvalue:[]
    }
  },
  components:{
    Head
  },
  created(){
    this.store_id =
      this.$route.query.storeid || "b677754d0282970d81e285ef6297100d";
    let date = new Date();
    this.date = this.getNowFormatDate(date);
    this.firstday = this.getMonth(date,'s',0) 
    this.lastday = this.getMonth(date,'e',0) 
    this.firstyear = this.getYear(date,'s',0); 
    this.lastyear = this.getYear(date,'e',0); 
    this.getDays(date);
    
  },
  mounted() {
    this.option();
  },
  methods:{
    timeSelect(y){
      this.index = y;
      this.option();      
    },
    catSelect(y){
      this.cat = y;
      this.option();
    },
    styleSelect(y){
      this.styleind = y;
      console.log(y)
      this.echartsStyle();
    },
    echartsStyle(){
      if(this.styleind==0){
        this.flag = 0;
        this.setECharts('myChart');
      }else if(this.styleind==1){
        this.flag = 1;
        this.setBrokenECharts('myChart');
      }else{
        this.flag = 2;
        this.setSectorECharts('myChart');
      }
    },
    option(){
      if(this.index==0){
        if(this.cat==0){
          this.sale(this.monday,this.sunday);
        }else if(this.cat==1){
          this.profit(this.firstday,this.lastday);
        }else{
          this.category(this.firstyear,this.lastyear);
        }
      }else if(this.index==1){
        if(this.cat==0){
          this.sale(this.monday,this.sunday);
        }else if(this.cat==1){
          this.profit(this.firstday,this.lastday);
        }else{
          this.category(this.firstyear,this.lastyear);
        }
      }else{
        if(this.cat==0){
          this.sale(this.monday,this.sunday);
        }else if(this.cat==1){
          this.profit(this.firstday,this.lastday);
        }else{
          this.category(this.firstyear,this.lastyear);
        }
      }
    },
    sale(from,to){
      this.$http.get(`/store/statistics/count?from=${from}&to=${to}&store_id=${this.store_id}`)
      .then(res=>{
        console.log(res)
        if(res.code == 1){
          this.categoryname.length =0;
          this.categoryvalue.length =0;
          res.result.forEach(item=>{
            this.categoryname.push(item.date);
            this.categoryvalue.push(item.count);
            this.echartsStyle();
          })
        }
      })
    },
    profit(from,to){
      this.$http.get(`/store/statistics/profit?from=${from}&to=${to}&store_id=${this.store_id}`)
      .then(res=>{
        if(res.code == 1){
          this.categoryname.length =0;
          this.categoryvalue.length =0;
          res.result.forEach(item=>{
            this.categoryname.push(item.date);
            this.categoryvalue.push(item.count);
            this.echartsStyle();
          })
        }
      })
    },
    category(from,to){
      this.$http.get(`/store/statistics/catcount?from=${from}&to=${to}&store_id=${this.store_id}`)
      .then(res=>{
        console.log(res)
        if(res.code == 1){
          this.categoryname.length =0;
          this.categoryvalue.length =0;
          res.result.forEach(item=>{
            this.categoryname.push(item.name);
            this.categoryvalue.push(item.value);
            this.echartsStyle();
          })
        }
      })
    },
    setECharts(box){
      let myChart = this.$echarts.init(document.getElementById(box))
      myChart.setOption({
        xAxis: {
        type: 'category',
        data: this.categoryname
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.categoryvalue,
          type: 'bar'
        }]
      });
    },
    setBrokenECharts(box){
      let myChart = this.$echarts.init(document.getElementById(box))
      let arr = []
      this.categoryname.forEach(item=>{
        arr.push([item])
      })
      this.categoryvalue.forEach((item,index)=>{
        arr[index][1] = item
      })
      myChart.setOption({
        title: {text: ''},
        tooltip: {},
        toolbox: {
            feature: {
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                },
                restore: {}
            }
        },
        xAxis: {
          type: 'category',
          data: this.categoryname
        },
        yAxis: {
          type: 'value'
        },
        series: [{
            type: 'line',
            smooth: true,
            data: arr
        }]
      });
    },
    setSectorECharts(box){
      let myChart = this.$echarts.init(document.getElementById(box))
      let arr = []
      this.categoryname.forEach(item=>{
        arr.push({name:item,value:0})
      })
      this.categoryvalue.forEach((item,index)=>{
        arr[index].value = item
      })
      myChart.setOption({
            series: {
                type: 'pie',
                data: arr
            }
        });
    },
    //获取当前时间，格式YYYY-MM-DD
    getNowFormatDate(date) {
        
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    // 获取本星期日期
    getDays(now){
      let nowTime = now.getTime() ; 
      let day = now.getDay();
      let oneDayLong = 24*60*60*1000 ; 
      let MondayTime = nowTime - (day-1)*oneDayLong  ; 
      let SundayTime =  nowTime + (7-day)*oneDayLong ; 
      let monday = new Date(MondayTime);
      let sunday = new Date(SundayTime);
      
      this.monday = this.getNowFormatDate(monday);
      this.sunday = this.getNowFormatDate(sunday);
    },
    // 获取本月 //d代表今日，type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，months为数字类型，不传或0代表本月，-1代表上月，1代表下月
    getMonth(d,type, months) {
    
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (Math.abs(months) > 12) {
        months = months % 12;
    };
    if (months != 0) {
        if (month + months > 12) {
            year++;
            month = (month + months) % 12;
        } else if (month + months < 1) {
            year--;
            month = 12 + month + months;
        } else {
            month = month + months;
        };
    };
    month = month < 10 ? "0" + month: month;
    let date = d.getDate();
    let firstday = year + "-" + month + "-" + "01";
    let lastday = "";
    if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
        lastday = year + "-" + month + "-" + 31;
    } else if (month == "02") {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
            lastday = year + "-" + month + "-" + 29;
        } else {
            lastday = year + "-" + month + "-" + 28;
        };
    } else {
        lastday = year + "-" + month + "-" + 30;
    };
    let day = "";
    if (type == "s") {
        day = firstday;
    } else {
        day = lastday;
    };
    return day;
},
//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表今年，-1代表去年，1代表明年
getYear(dd,type, dates) {
    let n = dates || 0;
    let year = dd.getFullYear() + Number(n);
    let day;
    if (type == "s") {
        day = year + "-01-01";
    };
    if (type == "e") {
        day = year + "-12-31";
    };
    if (!type) {
        day = year + "-01-01/" + year + "-12-31";
    };
    return day;
}
 


  }

}
</script>