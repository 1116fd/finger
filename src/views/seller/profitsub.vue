<style lang="scss" scoped>
.header-box{
  width: 100%;
  height: 32px;
  display: flex;
  
  span{
    width: 20%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    display: inline-block;
    border-right:1px solid #ccc;
    border-bottom:3px solid #ccc;
    
  }
  span:nth-child(5){
      border-right:none;
  }
  .active{
      font-weight: 600;
      border-bottom:3px solid green;
  }
}
.sell-type{
    height: 50px;
    margin: 20px 0 0 100px;
    margin-top: 20px;
    display: flex;
    p{
      border:1px solid #ccc;
      height: 30px;
      font-size: 15px;
      text-align: center;
      line-height: 30px;
      width: 50px;
    }
    p:nth-child(1){
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    p:nth-child(3){
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .now{
      font-weight: 600;
      background: pink;
  }
}
</style>

<template>
  <div>
      <header class="header-box">
        <span v-for="(item,index) in typearr" :key="item.id" @click="lighthige(index,item)" :class='{active:active==item.type}'>{{item.type}}</span>
      </header>
      <div class="sell-type">
        <p v-for="(item,index) in typesubarr" :key="item.id" @click="lightnow(index,item)" :class='{now:now==item.type}'>{{item.type}}</p>
      </div>
      <div>
          <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
       typearr:[{
         id:0,
         type:"返回"
       },{
         id:1,
         type:"本周"
       },{
         id:2,
         type:"本月"
       },{
         id:3,
         type:"本季"
       },{
         id:4,
         type:"本年"
       }],
       typesubarr:[{
         id:0,
         type:"销售"
       },{
         id:1,
         type:"收益"
       },{
         id:2,
         type:"类别"
       }],
       active:"本周",
       now:"销售",
       typestatus:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
       typecount:[120, 200, 150, 80, 70, 110, 130],
       arr1:[],
       arr2:[],
       storeid:""
    }
  },
   mounted(){
      this.storeid=this.$route.query.storeid;
      this.drawLine()
      let nowdate = new Date();
      let y = Number(nowdate.getFullYear());
      let m = Number(nowdate.getMonth()+1);
      let d = Number(nowdate.getDate());
      let formatnowdate = y+'-'+m+'-'+d;
      console.log(formatnowdate)
   },
   methods:{
    getWeek(){  
      //按周日为一周的最后一天计算  
      var date = new Date();  
      //今天是这周的第几天  
      var today = date.getDay();  
      //上周日距离今天的天数（负数表示）  
      var stepSunDay = -today + 1; 
      // 如果今天是周日  
      if (today == 0) {  
    
          stepSunDay = -7;  
      }  
      // 周一距离今天的天数（负数表示）  
      var stepMonday = 7 - today;  
      var time = date.getTime();  
      var monday = new Date(time + stepSunDay * 24 * 3600 * 1000);  
      var sunday = new Date(time + stepMonday * 24 * 3600 * 1000);  
      //本周一的日期 （起始日期）  
      var startDate = transferDate(monday); // 日期变换  
      //本周日的日期 （结束日期）  
      var endDate = transferDate(sunday); // 日期变换  
      return startDate + ' - ' + endDate;  
    },  
      lighthige(index,item){
        this.active=item.type;
        if(item.type=="本周"){
          this.typestatus= ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          this.typecount=[120, 200, 150, 80, 70, 110, 130];
          this.drawLine();
        }
      },
      lightnow(index,item){
        this.now=item.type;
        switch(this.now){
          case "销售":{
            this.$http.get(`/store/statistics/count?from=2019-05-30&to=2019-06-01&store_id=${this.storeid}`).then(res=>{
             console.log(res)
             this.typestatus=[];
              this.typecount=[];
              res.result.forEach(item=>{
                  this.typestatus.push(item.date);
                  this.typecount.push(item.count);
              })
              this.drawLine();
            })
            break;
          }
          case "收益":{
            this.$http.get(`store/statistics/profit?from=2019-05-30&to=2019-06-01&store_id=${this.storeid}`).then(res=>{
              console.log(res)
              this.typestatus=[];
              this.typecount=[];
              res.result.forEach(item=>{
                  this.typestatus.push(item.date);
                  this.typecount.push(item.count);
              })
              this.drawLine();
            })
            break;
          }
          case "类别":{
            this.$http.get(`/store/statistics/catcount?from=2019-05-30&to=2019-06-01&store_id=${this.storeid}`).then(res=>{
              console.log(res)
              this.typestatus=[];
              this.typecount=[];
              res.result.forEach(item=>{
                  this.typestatus.push(item.name);
                  this.typecount.push(item.value);
              })
              this.drawLine();
            })
            break;
          }
        }
      },
      drawLine(){
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: this.typestatus
          },
          yAxis: {
            type: 'value'
          },
          series: [{
              data: this.typecount,
              type: 'bar'
          }]
        });
      }
   }
  

}
</script>
