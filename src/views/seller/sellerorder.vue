<style lang="scss" scoped>
    .sellerorder{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    header{
        width: 100%;
        height:44px;
    }
    section{
        flex: 1;
    }
    .nav{
        width: 100%;
        height: 44px;
        border-bottom: 1px solid #999;
    }
    .nav ul{
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
    }
    .nav ul li{
        width: 50%;
        text-align: center;
    }
    .nav ul li i{
        padding: 0 5px;
    }
    .bscroll{
        width: 100%;
        height: 530px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .bscroll-container ul{
        width: 100%;
        height: auto;
    }
    .bscroll-container ul li{
        width: 95%;
        height: 150px;
        margin:10px auto;
        border:solid 1px #999;
    }
    .bscroll-container ul li .listtop{
        width: 100%;
        height: 70px;
        border-bottom:solid 1px #999;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }
   
    .listtopleft{
        width: 70%;
        height: 70px;
    }
    .listtopleft dl{
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
    }
    .listtopleft dl dt{
        width: 30%;
        height: 60px;
    }
    .listtopleft dl dt img{
        width: 100%;
        height: 100%;
    }
    .listtopleft dl dd{
        margin-left: 10px;
        font-size: 16px;
        color: #333333;
    }
    .listtopleft dl dd i{
        margin-left: 5px;
         font-size: 20px;
    }
    .listtopright{
        width: 30%;
        height: 70px;
        display: flex;
        align-items: center;
    }
    .listtopright dl{
        width: 100%;
        height: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .listtopright dl dt{
        font-size: 23px;
    }
    .listtopright dl dd{
        font-size: 12px;
        color:#999;
    }
     .bscroll-container ul li .listbottom{
        width: 100%;
        height: 79px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:  0 15px;
        box-sizing: border-box;
    }
    .listbottom .listbottomleft,.listbottomright{
        width: 15%;
    }
    .listbottom .listbottomcon{
        width: 70%;
        text-align: center;  
    }
    .listbottom .listbottomcon dl dt{
        font-size: 28px;    
        color: #000;
    }
    .listbottom .listbottomcon dl dd{
        font-size: 12px; 
        color: #999;   
    }
    footer{
        width: 100%;
        height: 44px;
        display: flex;
        border-top:solid 1px #999;
     }
     .footerleft{
         width: 70%;
         height: 44px;
         display: flex;
         align-items: center;
         padding: 0 15px;
         box-sizing: border-box;
     }
     .footerleft>span{
         margin-left: 10px;
     }
     .footerleft p span{
         font-size: 16px;
     }
     .footerlright{
         width: 30%;
         height: 44px;  
         display: flex;
         justify-content: flex-end;
     }
    .footerlright button{
        width:100px;
        height: 44px;
        background: #F2922F;
        text-align: center;
        line-height: 44px;
        border:none;
        font-size:16px ;
        color:#fff;
    }
</style>
<template>
    <div class="sellerorder">
        <!-- <Options :optionsarr='[{id:1,value:"王子璇"},{id:2,value:"张子瑞"},{id:3,value:"韩英华"},{id:4,value:"冯丹"}]'/> -->
        <header>
            <Head title="销售报表"/>
        </header>
        <section>
            <div class="nav">
                <ul>
                    <li><span>起始日期</span><i class="iconfont icon-triangle-down"></i></li>
                    <li><span>结束日期</span><i class="iconfont icon-triangle-down"></i></li>
                </ul>
            </div>
            <div class="bscroll" ref="bscroll">
                <div class="bscroll-container">
                    <ul v-for="(item,index) in lists" :key="index">
                        <li>
                            <div class="listtop">
                               <div class="listtopleft">
                                    <dl @click="goprofit">
                                        <dt><img alt="" src="../../assets/img/shop1.jpg"/></dt>
                                        <dd><span>喵掌柜肉肉店</span><i class="iconfont icon-angle-right"></i></dd>
                                    </dl>   
                                </div> 
                               <div class="listtopright">
                                    <dl>
                                        <dt>120</dt>
                                        <dd>业务流水（元）</dd>
                                    </dl>
                               </div> 
                            </div>
                            <div class="listbottom">
                                <div class="listbottomleft"><input type="checkbox" v-model="item.check" @click="curChange(item.num)"></div>
                                <div class="listbottomcon">
                                    <dl>
                                        <dt>580</dt>
                                        <dd>分佣金额（元）</dd>
                                    </dl>
                                </div>
                                <div class="listbottomright"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <footer>
            <div class="footerleft">
                <input type="checkbox" v-model="checkAll.check" @click="checkAllChange">
                <span>全选</span>
                <p>总计：￥<span>{{total}}.00</span></p>
            </div>
            <div class="footerlright">
                <button>提现</button>
            </div>
        </footer>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import Head from "@/components/seller/head.vue"
export default {
    name:"sellerorder",
    data() {
        return {
            lists:[{
                id:'1',
                value:'苹果',
                num:10
            },{
                id:'2',
                value:'荔枝',
                num:20
            },{
                id:'3',
                value:'香蕉',
                num:100
            },{
                id:'4',
                value:'火龙果',
                num:50
            }],
            checkAll: { name: '全选', check:false},
            total:0
        }
    },
    components:{
    Head
  },
  methods: {
      goprofit(){
          this.$router.push({
              name:"profit"
          })
      },
     checkAllChange: function () {
          //使用箭头函数 this的作用域指当前实例化对象
          this.lists.forEach(item => {
              item.check = !this.checkAll.check;
              if(this.checkAll.check){
                  this.total=0
              }else{
                  this.total+=item.num
              }
              
              
          });
      },
      curChange:function(num){
          //过滤check为true的
          console.log(num)
          setTimeout(()=>{
            let curTrue=this.lists.filter(function(item){
              return item.check
            });
            this.total=0
            curTrue.forEach(item=>{
                this.total+=item.num
            })
            if(curTrue.length==this.lists.length){
              this.checkAll.check=true;
            }else{
                this.checkAll.check=false;
            }
          },0)
         
          
          

          //判断选中的状态与总长度比较  当选中的项与总长度相等时 自动 勾选 “全选”
          // 不相等时 取消 全选 
         
      }
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
}
</script>
