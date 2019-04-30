<style lang="scss" scoped>
.shopcar-box{
    width: 100%;
    height: 100%;    
    display: flex;
    flex-direction: column;   
}
.shop-item-box{
    height: 500px;
    overflow: hidden;
    margin-top:40px;
    .boxes{
        width: 100%;
        height: auto;
    }
    .shop-item{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        padding:15px;
        box-sizing: border-box;
        border-bottom:1px solid #f8f8f8;
        .radiocheck{
            display: flex;
            align-items: center;
            input{
                margin-right:10px;
            }
        }
        .shop-infomation{
            padding:0 10px;
            box-sizing: border-box;
            line-height: 25px;
            text-align: left;
            flex: 1;
        }
        .shop-action{
            display: flex;
            flex-direction: column;
            text-align: right;
            justify-content: space-between;
            align-items: center;
            .iconfont.icon-shanchu{
                width: 30px;
                height: 30px;
                font-size: 25px;
            }
            .operation{
                display: flex;
                border:1px solid #ccc;
                border-radius: 5px;
                button{
                    width: 25px;
                    height: 30px;
                    border:0;
                    outline: 0;
                    font-size: 17px;
                    color:aquamarine;
                    background: 0;
                }
                p{
                    width: 30px;
                    height: 30px;
                    line-height: 32px;
                    text-align: center;
                }
            }
        }
    }
   
}
.empty-car{
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 300px;
}
.shop-bottom{
    width: 100%;
    height: 60px;
    border-top:1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left:20px;
    box-sizing: border-box;
    .settlement{
        height: 100%;
        width: 120px;
        border:0;
        outline: 0;
        font-size: 16px;
        color:#fff;
        background: orange;
    }
}
.all-left{
    display: flex;
    align-items: center;
    flex-shrink: 0;
    .allmoney{
        padding:0 15px;
        box-sizing: border-box;
        .text{
            display: inline-block;
            width: 80px;
        }
        .bb,.bb+span{
            font-size: 14px;
            color:#999;
        }
    }
}
</style>

<template>

    <div class="shopcar-box">
        <Head title="购物车"/>
        <template  v-if="listdata.length==0">
            <p class="empty-car">购物车空空如也~</p>
        </template>
        <template v-else>
            <div class="shop-item-box" ref="scrollbox">
                <div class="boxes">
                    <div class="shop-item" v-for="(item,index) in listdata" :key="item.index">
                        <div class="radiocheck">
                            <input type="checkbox" v-model="item.check" @click="curchange">  
                            <img :src='item.cart_image' width="80px" height="80px" alt="">
                        </div>
                        <div class="shop-infomation">
                            <h5>{{item.goods_name}}</h5>
                            <span>{{item.cat}}</span>
                            <p><span>￥</span>{{item.price}}</p>
                        </div>
                        <div class="shop-action">
                            <i class="i iconfont icon-shanchu" @click="del(index,item)"></i>
                            <div class="operation">
                                <button @click="subtract(index,item)" >-</button>
                                <p>{{item.count}}</p>
                                <button @click="add(index,item)">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shop-bottom">
                <div class="all-left">
                    <div class="allcheckbox">
                        <input type="checkbox" v-model="allcheck" @click="allchecked"> 全选
                    </div>
                    <div class="allmoney">
                        <p><span class="text aa">总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计:</span><span>￥</span><span>{{alltotal}}</span></p>
                        <p><span class="text bb">另需配送费:</span><span ref="distributionfee">12.00</span></p>
                    </div>
                </div>
                <button class="settlement" @click="settlement">去结算</button>
            </div> 
        </template>
        
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import Head from '@/components/Head.vue'
import bus from "@/utils/bus.js";
export default {
    name:'shopcar',
    components: {
        Head
    },
    data(){
        return{
            checkshop:[],
            allsum:0,
            allcheck:false,
            listdata:[],
            ordercheck:[],
            distributionfee:0
        }
    },
    created(){
      this.listdata = JSON.parse(localStorage.getItem('listdata')) || [];
      if(this.listdata.length!=0){
          this.store_id = this.listdata[0].store_id
      }else{
          this.store_id =  'b677754d0282970d81e285ef6297100d'
      }
      if(sessionStorage.getItem('token')){
           this.loading = this.$loading();
            this.$http.post(`/buyer/cart/list`,{
                token:sessionStorage.getItem('token')
            }).then(res=>{
                this.loading.close();
                if(res.code == 1){
                    this.listdata = res.result.concat(this.listdata)
                }
            })
        }
    },
    mounted(){
        new BScroll(this.$refs.scrollbox,{
            probetype:2,
            click:true
        })
       
    },
    methods:{
        //购物车减减
        subtract(ind,item){
            if(this.listdata[ind].count<=1){
                this.del(ind,item)
                return;
            }
            --this.listdata[ind].count;
            if(this.listdata[ind].count==0 && sessionStorage.getItem('token')){
                this.$http.post(`/buyer/cart/edit`,{
                    token:sessionStorage.getItem('token'),
                    goods_id:item.goods_id,
                    count:this.listdata[ind].count
                }).then(res=>{
                    localStorage.setItem('listdata',JSON.stringify(this.listdata))
                    this.listdata=localStorage.getItem('listdata');
                })
            }else{
                localStorage.setItem('listdata',JSON.stringify(this.listdata));
            }
        },
        add(ind,item){
            this.listdata[ind].count++;
            if(sessionStorage.getItem('token')){
                this.$http.post(`/buyer/cart/edit`,{
                    token:sessionStorage.getItem('token'),
                    goods_id:item.goods_id,
                    count:this.listdata[ind].count
                }).then(res=>{
                    localStorage.setItem('listdata',JSON.stringify(this.listdata))
                })
            }else{
                localStorage.setItem('listdata',JSON.stringify(this.listdata))
            }
        },
        del(ind,item){
            if(sessionStorage.getItem('token')){
                this.$http.post(`/buyer/cart/delete`,{
                token:sessionStorage.getItem('token'),
                goods_id:item.goods_id
                }).then(res=>{
                    this.loading.close();
                    if(res.code==1){
                        this.listdata.splice(ind,1);
                        localStorage.setItem('listdata',JSON.stringify(this.listdata))
                    }
                })
            }else{
                this.listdata.splice(ind,1);
                localStorage.setItem('listdata',JSON.stringify(this.listdata))
            }
        },
        allchecked(){
            this.listdata.length && this.listdata.filter((item,index)=>{
                item.check= !this.allcheck
            })
            localStorage.setItem('listdata',JSON.stringify(this.listdata))
        },
        curchange(){
            //判断单个的商品选中状态，如果全部选中全选为true,否则false   
            setTimeout(()=>{
                let curture=this.listdata.length && this.listdata.filter((item)=>{
                    return item.check
                })
                let sum=0;
            
                if(curture.length==this.listdata.length){
                    this.allcheck=true
                }else{
                    this.allcheck=false
                }
            },0)
        },
        settlement(){
            this.listdata.length && this.listdata.map((item,index)=>{
               if(item.check){
                   this.ordercheck.push(item)
                   return this.ordercheck
               }
            })
            this.distributionfee=this.$refs.distributionfee.innerHTML
            if(sessionStorage.getItem('token')){
                this.$router.push({path:'/yesorder',query:{order:this.ordercheck,alltotal:this.alltotal,distributionfee:this.distributionfee}})
            }else{
                this.$router.push('/login')
            }
        }
    },
    computed:{
        alltotal(){
            let sum=0;
            this.listdata.length && this.listdata.forEach((item,index)=>{
                if(item.check || this.allcheck){
                    sum+=item.price*item.count
                }
                if(!this.allcheck){
                    sum==0
                }
            })
            return sum
        }
    }
}
</script>
