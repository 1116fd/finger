<style lang="scss" scoped>
    .yesorder-box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .address{
        width: 100%;
        height:75px;
        background: #fff;
        margin-top:40px;
        padding:10px;
        box-sizing: border-box;
        font-size: 14px;
        p{
           height: 20px;
           line-height: 20px;
           span{
               padding:0 10px;
               box-sizing: border-box;
           }
        }
    }
    p{
        width: 100%;
        height: 15px;
    }
    .bscroll{
        width: 100%;
        height: 500px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .bscroll-container{
        height: 100%;
        overflow-y: scroll;
    }
    .statusbox{
        width: 100%;
        height: 105px;
        background: #fff;
        display: flex;
        flex-direction: column;
        border-bottom: solid 1px #999999;
    }
    .statusbox ul{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: solid 1px #999999;
    }
    .statusbox ul li{
        width: 20%;
        text-align: center;
        padding: 15px 0;
        // padding: 15px 5px;
        font-size: 14px;
    }
    .active{
        color:#F2922F;
        border-bottom: solid 2px #F2922F;
    }
    .iptbox{
        width: 100%;
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .iptbox input{
        width: 90%;
        height: 40px;
        background: #eee;
        border:none;
        border-radius: 20px;
        padding-left: 20px;
    }
    .itembox{
        width: 100%;
        height: 188px;
        background: #fff;
        margin-bottom:10px;
    }
    .itemtitle{
        width: 100%;
        height: 44px;
        border-bottom:solid 1px #999999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
    }
    .itemgoods{
        width: 100%;
        height: 95px;
        background: #fff;
        padding: 0 15px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
         border-bottom:1px solid #ccc; 
    }
    .itemgoodsleft{
        width: 20%;
        height: 80%;
        padding: 0 5px;
    }
    .itemgoodsleft img{
        width: 100%;
        height: 100%;
    }
    .itemgoodscon{
        width: 70%;
        height: 80%;
        padding: 0 5px;
       
    }
    .itemgoodscon .itemgoodscontitle{
        font-size: 14px;
         height: 26px;
        color:#000;
    }
    .itemgoodscon .itemgoodscontime{
        font-size: 14px;
        color:#999;
         height: 26px;
    }
    .itemgoodscon .itemgoodsconstatus{
        font-size: 14px;
        color:#555555 ;
         height: 26px;
    }
    .itemgoodscon .itemgoodsconstatus span{
        color: #F2922F;
    }
    .itemgoodsright{
        width: 10%;
        height: 80px;
        padding: 0 5px;
        display: flex;
    }
    .itemstatus{
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
    }
    .itemstatus p{
        display: inline-block;
        width: 80px;
        height: 27px;
        color: #F2922F;
        border: solid 1px #F2922F;
        text-align: center;
        line-height: 27px;
        border-radius: 20px;
        // padding: 5px 10px;
    }
    .p-box{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding:0 10px;
        box-sizing: border-box;
        background: #fff;
        margin-top: 10px;
        border-bottom:1px solid #ccc;
        font-size: 14px;
        input{
            height: 35px;
            outline: none;
            margin-left: 60px;    
            border:none;
        }
    }
    .p-box2{
        width: 100%;
        height: 40px;
        background: #fff;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0 10px;
        box-sizing: border-box;
        border-bottom:1px solid #ccc;
         p{
             width: 60px;
         }
        span{
            width: 130px;
            display: inline-block;
            
        }
    }
    .chooseBtn {
            display: none;
    }

    .choose-label {
        box-shadow: #ccc 0px 0px 0px 1px;
        width: 40px;
        height: 20px;
        display: inline-block;
        border-radius: 20px;
        position: relative;
        background-color: #bdbdbd;
        overflow: hidden;
    }

    .choose-label:before {
        content: '';
        position: absolute;
        left: 0;
        width: 20px;
        height: 20px;
        display: inline-block;
        border-radius: 20px;
        background-color: #fff;
        z-index: 20;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }

    .chooseBtn:checked + label.choose-label:before {
        left: 20px;
    }

    .chooseBtn:checked + label.choose-label {
        background-color: green;
    }
    .spell-box{
        width: 100%;
        height: auto;
        font-size: 14px;
        padding:10px;
        box-sizing: border-box;
        p{
            width:100%;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    footer{
        width: 100%;
        height: 50px;
        button{
            border:none;
            width: 50%;
            height: 100%;
            background: orange;
            color:#fff;
            font-size: 17px;
        }
        button:nth-child(1){
            background: #ccc;
        }
    }
</style>

<template>
    <div class="yesorder-box">
        <Head title="确认订单"/>
        <div class="address">
            <p><span>姓名:</span>{{receiver_name}}</p>
            <p><span>电话:</span>{{receiver_phone}}</p>
            <p><span>地址:</span>{{receiver_address}}</p>
        </div>
        <p><img src="../../assets/img/borderimg.jpg" alt=""></p>
        <div class="bscroll">
            <div class="bscroll-container">
                <div class="itembox">
                    <div class="itemtitle">
                        <p>订单编号：<span>wt15458745</span></p>
                        <i class="iconfont icon-angle-right"></i>
                    </div>
                    <div class="itemgoods" v-for="(item,index) in orderdata" :key="index">
                        <div class="itemgoodsleft"><img src="../../assets/logo.png" alt=""></div>
                        <div class="itemgoodscon">
                            <p class="itemgoodscontitle">{{item.goods_name}}</p>
                            <p class="itemgoodscontime">下单时间：<span>{{timearr[index]}}</span></p>
                            <p class="itemgoodsconstatus">订单状态：<span>待付款</span></p>
                        </div>
                        <div class="itemgoodsright">x<span>{{item.count}}</span></div>
                    </div>
                    <div class="p-box"><span>买家留言</span> <input type="text" placeholder="选填项" v-model="buyertext"></div>
                    <div class="p-box2">
                        <span>是否开发票</span>
                        <p>
                            <input type="checkbox" name="sex" id="male" class="chooseBtn" />
                            <label for="male" class="choose-label" @click="changeflag"></label>
                        </p>
                    </div>
                    <div v-if="switchs">
                        <div class="p-box"><span>公司名称</span> <input type="text" placeholder="请填项" v-model="companyname"></div>
                        <div class="p-box"><span>税&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span><input type="text" placeholder="请填项" v-model="dutyparagraph"></div>
                    </div>
                    <div class="spell-box">
                        <p><span>商品总价</span><b>￥{{alltotal}}</b></p>
                        <p><span>配送费</span><b>￥{{distributionfee}}</b></p>
                        <p><span>需付费</span><b>￥{{totalprice}}</b></p>
                    </div>
                </div>
               
            </div>
        </div>
        <footer>
            <button @click="cancelorder">取消订单</button><button @click="defray">支付</button>
        </footer>
       
    </div>
</template>

<script>
import Head from '@/components/Head.vue'
import "../../common/common.css"
import bus from '@/utils/bus.js'
export default {
    components: {
        Head
    },
    data(){
        return{
            orderdata:[],
            timearr:[],
            buyertext:"",
            companyname:"",
            dutyparagraph:"",//税号
            distributionfee:0,
            alltotal:0,
            totalprice:0,
            switchs:false,
            newarr:[],
            newobj:{},
            address:{},
            receiver_address:"",
            receiver_name:"",
            receiver_phone:"",
            storeid:"500b78c66434db93f3e186bdecbb42c3"
        }
    },
    created(){
        this.alltotal=this.$route.query.alltotal
        this.distributionfee=Number(this.$route.query.distributionfee)
        this.totalprice=this.alltotal+this.distributionfee
        this.orderdata=this.$route.query.order;
        this.address=JSON.parse(sessionStorage.getItem('only'));
        let alladd=this.address;
        this.receiver_address=alladd.datas.city.value+alladd.datas.province.value+alladd.datas.area.value+alladd.address
        this.receiver_name=alladd.name
        this.receiver_phone=alladd.phone
    },
    mounted(){
        this.orderdata.map((item,index)=>{
            this.orderdata[index].create_time = new Date(Number(item.create_time));//直接用 new Date(时间戳) 格式转化获得当前时间
            let newtime= this.orderdata[index].create_time.toLocaleDateString().replace(/\//g, "/") + " " + this.orderdata[index].create_time.toTimeString().substr(0, 8); 
            this.timearr.push(newtime);
            return this.timearr
        })
        this.orderdata.map((item,index)=>{
            this.newobj["goods_id"]=item.goods_id
            this.newobj["sku"]=item.sku
            this.newobj["count"]=item.count
            this.newarr.push(this.newobj)
            //cart筛选出来的对象
            return this.newarr
        })
   },
   methods:{
        changeflag(){
           this.switchs=!this.switchs
        },
        cancelorder(){
            bus.$on('backcar',()=>{
                this.$router.push({
                    name: `shopcar`,
                    params: {
                        // store_id:this.store_id
                    }
                });
            });
            bus.$on('continues',()=>{
                this.defray();
            })
        },
        defray(){
            this.loading = this.$loading();
            this.$http.post('/buyer/cart/pay',{
                order_number:'1234'
            }).then(res=>{
                this.loading.close();
                if(res.code==1){
                    //支付弹框
                    this.$dialog('payment');
                    bus.$on('back',()=>{
                        this.$router.push({
                            name: `tabdetail`,
                            params: {
                                store_id:this.store_id
                            }
                        });
                    })
                }
            }).catch(()=>{
                this.loading.close();
            })
            let userinfo=JSON.parse(sessionStorage.getItem("only"))
            let address=userinfo.datas.province.value+userinfo.datas.city.value+userinfo.datas.area.value+userinfo.address
            this.$http.post('/buyer/cart/order',{
                token:sessionStorage.getItem('token'),
                cart:JSON.stringify(this.newarr),
                receiver_name:this.receiver_name,
                receiver_address:this.receiver_address,
                receiver_phone:this.receiver_phone,
                store_id:this.storeid
            }).then(res=>{
                console.log(res)
            })
          
        }
   }
}
</script>
