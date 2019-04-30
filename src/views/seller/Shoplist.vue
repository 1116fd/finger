<template>
     <div class="shoplist-box">
       <Storehead v-bind:title="title" />
       <div class="conteiner">
          <div class="search-box">
            <input type="text" placeholder="请输入商品名称"><button>搜索</button>
          </div>
        <div class="bscroll" ref="bscroll">
         <div class="bscroll-container">
          <table class="table">
          <thead>
              <tr>
                  <th><input type="checkbox" v-model="checkAll.check" @change="checkAllChange()"></th>
                  <th>商品编号</th>
                  <th>商品名称</th>
                  <th>类型</th>
                  <th>售价</th>
                  <th>操作</th>
                  <th>删除</th>
                  <th>修改</th>
              </tr>
          </thead>
          <!--  -->
          <tbody class="tbody">
            <tr v-for="(item,i) in lists" :key="i">
                <td><input type="checkbox" v-model="item.check"  @change="curChange()"></td>
                <td>{{item.serial_number}}</td>
                <td>{{item.goods_name}}</td>
                <td>{{item.type}}</td>
                <td>{{item.price}}</td>
                <td @click="upordown(item.goods_id,item.status,i)">{{item.status==0?"上架":"下架"}}</td>
                <td @click="removegoods(item.goods_id)">删除</td>
                <td @click="updategoods(item)">修改</td>
            </tr> 
          </tbody>
      </table>
      </div>
       </div> 
      <div class="btn-box">
          <button @click="alldwon">批量下架</button>
          <button @click="allup">批量上架</button>
      </div>
       </div>
       <Success :success="successval" :isshow="shows"/>  
    </div>
</template>

<script>
import Storehead from '../../components/common/Storehead.vue'
import BScroll from "better-scroll";
export default {
  name:"shoplist",
  components: {
    Storehead
  },
  data(){
    return {
      successval:"",
      shows:false,
      title:"商品列表",
      checkAll: { name: '全选', check: false },
      lists: [],
      store_id:"",
      goodsid:[]
    }
  },
  created(){
    //console.log(this.$route.query.storeid)
      this.store_id=this.$route.query.storeid || "b677754d0282970d81e285ef6297100d";
      this.$http.get("/store/goods/totallist").then(res=>{
     //console.log(res)
      if(res.code===1){
       let list= res.result.map((item)=>{
          item.check=false
          return item
        })
        this.lists=list
      }
    })
  },
 
  mounted(){
    this.$nextTick(()=>{
      let bscroll=new BScroll(this.$refs.bscroll,{
        probeType:2,
        click:true
      })
    })
    // this.$http.post("/store/goods/list",{
    //   store_id:"b677754d0282970d81e285ef6297100d"
    // }).then(res=>{
    //   if(res.code===1){
    //     this.lists=res.result
    //   }
    //   // console.log(res.result)
    // })
  },
  methods: {
     times(){
    setTimeout(()=>{
            this.shows=false
          },2000)
  },
    updategoods(goods){
      this.$router.push({
        name:"goodsupdate",
        params:{
          good:goods,
          store_id:this.store_id
        }
      })
    },
    removegoods(goodsid){
      this.$http.delete("/store/goods/delete",{
        data: {
          goods_id:goodsid
        }
        
      }).then(res=>{
        if(res.code==1){
          this.shows=true;
          this.successval="删除成功"
          this.times()
          this.$http.get("/store/goods/totallist").then(res=>{
     // console.log(res)
          if(res.code===1){
            this.lists=res.result
          }
        })
        }
      })
    },
    upOrDownFn(status,res){
      console.log(status)
      for(let i=0;i<=this.lists.length-1;i++){
        for(let j=0;j<=res.result.length-1;j++){
          if(this.lists[i].goods_id==res.result[j]){
            this.lists[i].status=status
          }
        }
      }
    },
    allup(){
      //console.log(this.goodsid)
      if(this.goodsid.length>0){
          this.$http.post("/store/goods/shelfInBulk",{
          goods_id_list:JSON.stringify(this.goodsid) ,
          status:"1"
        }).then(res=>{
          if(res.code==1){
          this.shows=true;
          this.successval="批量上架成功"
          this.times()
         this.upOrDownFn("1",res)
        }
        })
      }else{
        this.shows=true;
          this.successval="请选择要上架的商品"
          this.times()
      }
      
    },
    alldwon(){
      //console.log(this.goodsid)
      if(this.goodsid.length>0){
        //console.log()
          this.$http.post("/store/goods/shelfInBulk",{
          goods_id_list:JSON.stringify(this.goodsid) ,
          status:"0"
        }).then(res=>{
          if(res.code==1){
            this.shows=true;
          this.successval="批量下架成功"
          this.times()
          this.upOrDownFn("0",res)
        }
        })
      }else{
        this.shows=true;
          this.successval="请选择要下架的商品"
          this.times()
      }
    },
    upordown(codes,status,i){
      if(status===1){
        this.$http.post("/store/goods/onshelf",{  //上架
        goods_id:codes
      }).then(res=>{
        if(res.code==1){
          this.shows=true;
          this.successval="上架成功"
          this.times()
          this.lists[i].status=0
        }
      })
      }else{
        this.$http.post("/store/goods/offshelf",{   //下架
        goods_id:codes
      }).then(res=>{
        if(res.code==1){
          this.shows=true;
          this.successval="下架成功"
          this.times()
          this.lists[i].status=1
        }
      })
      }
    },
      checkAllChange: function () {
        //this.goodsid=[];
          //使用箭头函数 this的作用域指当前实例化对象
          this.lists.forEach(item => {
           // console.log(item)
              item.check = this.checkAll.check;
              if(this.checkAll.check){
                this.goodsid.push(item.goods_id)
              }else{
                this.goodsid=[];
              }
          });
      },
      curChange:function(){
          //过滤check为true的
          var curTrue=this.lists.filter(function(item){
           //console.log(item.check)
              return item.check==true;
          });
          this.goodsid=[];
          curTrue.forEach((item)=>{
            if(item.check){
              this.goodsid.push(item.goods_id)
            }
          })
          //判断选中的状态与总长度比较  当选中的项与总长度相等时 自动 勾选 “全选”
          // 不相等时 取消 全选 
          if(curTrue.length==this.lists.length){
              this.checkAll.check=true;
          }else{
              this.checkAll.check=false;
          }
      },
  }
}
</script>

<style  lang="scss" scoped>
  .shoplist-box{
    width: 100%;
    height: 100%;
    padding:0 2px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .conteiner{
    width: 100%;
    flex:1;
    overflow: hidden;
  }
  .search-box{
    width: 100%;
    height: 7%;
    margin-bottom: 10px;
    input{
      width:80%;
      height: 100%;
    }
    button{
      width: 18%;
      height: 108%;
    }
  }
  .bscroll{
    width: 100%;
    height: 75%;
    overflow: hidden;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 0;
    text-align: center;
    margin-top:20px;
    width:100%;
    }
    tr{
      width: 100%;
    }
    th, td {
      border: 1px solid #CADEFF;
      font-size: 12px;
    }
    th {
        background: #e2f2ff;
        border-top: 3px solid #a7cbff;
        height: 30px;
      
    }
    td {
        padding: 10px;
        color: #444;
        a{
            width: 100%;
            height: 100%; 
        }
    }
    .btn-box{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      position: absolute;
      left:0;
      bottom:5%;
      button{
        width: 40%;
        height: 80%;
        background: blue;
        color:#fff;
        font-size: 17px;
        border:none;
      }
    }

</style>
