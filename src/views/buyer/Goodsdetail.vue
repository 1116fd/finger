<template>
    <div class="box">
        <Head title="商品详情"/>
        <scroll class="wrapper home clearposition" ref="wrapper" :data="data" :pulldown="pulldown" @pulldown="loadData">
            <div>
            <Swiper :imgs="imgs" :high="height"></Swiper>
            <div :class="open ? 'none':'storeclose' ">
                <p><img src="../../assets/img/close.png" alt=""></p>
                <p class="close-tit">店铺已打烊</p>
                <p>营业时间：{{business_time}}</p>
                <p class="business"></p>
            </div>
            <div class="detail">
                <p class="title">{{every.goods_name}}</p>
                {{every.detail}}
            </div>
            <div>
                <h4 class="price">￥{{every.price}}</h4>
            </div>
            <h4 class="select" @click="selectsize"><span>选择规格</span><i class="iconfont icon-youjiantou-01"></i></h4>
            <div>
                <img src="../../assets/img/be.jpg" alt="">
            </div>
            </div>
        </scroll>
        <div :class="none ? 'dialog':'none' ">
            <div class="sizedialog">
                <span class="close-dialog" @click="closedialog">X</span>
                <dl class="select-goods" :id="every.goods_id">
                    <dt>
                    <img v-lazy="everyStore.logo" alt="">
                    </dt>
                    <dd>
                        <p class="price">
                            ￥{{every.price}}
                        </p>
                        <h4>{{every.goods_name}}</h4>
                    </dd>
                </dl>
                <div class="sel-size">
                    <h4>请选择规格</h4>
                    <div v-for="(x,y) in sizes" :key="x.group">
                        <h6>{{x.group}}</h6>
                        <p><span :class="selected==index?'active':'' " v-for="(size,index) in x.params" :key="index" @click="sizeitem(index,y)">{{size}}</span></p>
                    </div>
                </div>
                <div class="sale-num">
                    <h4>购买数量</h4>
                    <div class="computed">
                        <span @click="minusnum">-</span>
                        <span>{{num}}</span>
                        <span @click="addnum">+</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <span><i class="iconfont icon-gouwuche"></i></span>
            <button @click="addshopcar(every)">加入购物车</button>
            <button class="gobuy" @click="Settlement">立即购买</button>
        </div>
    </div>
</template>

<script>
import scroll from "@/components/buyer/Scroll.vue";
import banner from "@/assets/img/banner1.jpg";
import Swiper from '@/components/common/Swiper.vue'
import Head from '@/components/Head.vue'

    export default {
        name:'goodsdetail',
        components: {
            scroll,
            Head,
            Swiper
        },
        data(){
            return {
                imgs: [banner, banner, banner],
                pulldown: true,
                index: 0,
                every:{},
                follow:true,
                count:0,
                role:true,
                sizes:[{group:'重量',params:['100G','200G','300G','1000G']}],
                none:false,
                selected:0,
                num:1,
                size:'100G',
                open:null,
                everyStore:{},
                business_time:'',
                ordercheck:[],
                distributionfee:0,
                height:'250px'
            }
        },
        created(){
            
            console.log(this.$route.params.open)
            this.open = this.$route.params.open;
            if(this.$store.state.every){
                this.everyStore = this.$store.state.every;
                console.log(this.everyStore)
                this.imgs = this.everyStore.banner.split(',')
                this.business_time = this.everyStore.business_time
            }
            // 商品详情
            this.$http
            .get(`/buyer/detail?goods_id=${this.$route.params.goods_id}`)
            .then(res => {
                console.log(res)
                if(res.code==1){
                    this.every = res.result
                }
            });
            let sizes = JSON.parse(sessionStorage.getItem(this.every.goods_id));
            console.log(sizes)
            if(sizes){
                this.sizes = sizes[0].params;
            }
            this.every = {...this.every,count:this.num,size:this.size,sku:JSON.stringify(this.sizes)}
        },
        methods:{
            selectsize(){
                console.log(this.none)
                this.none = true;
            },
            closedialog(){
                this.none = false;
            },
            sizeitem(sizeindex,y){
                this.selected = sizeindex;
                this.size = this.sizes[y].params[sizeindex];
            },
            addnum(){
                this.num++;
                console.log(this.num)
            },
            minusnum(){
                if(this.num<=0){
                    return;
                }
                this.num--;
            },
            addshopcar(i){
                this.every = {...i,count:this.num,size:this.size,sku:JSON.stringify(this.sizes)}
                console.log(this.every)
                if(sessionStorage.getItem('token')){
                    this.loading = this.$loading();
                    this.$http.post(`/buyer/cart/add`,{
                        token:sessionStorage.getItem('token'),
                        goods_id:i.goods_id,
                        price:i.price,
                        count:this.every.count,
                        sku:'[{"group":"颜色","params":["白色","黑色"]}]'
                    }).then(res=>{
                        this.loading.close();
                        console.log(res)
                    }).catch((err)=>{
                        this.loading.close();
                    })
                }
                let listdata = JSON.parse(localStorage.getItem('listdata')) || [];
                listdata = listdata.filter(item=>{
                    if(item.goods_id!=i.goods_id){         
                        return item
                    }
                })
                listdata.push(this.every);
                
                localStorage.setItem('listdata',JSON.stringify(listdata))
            },
            Settlement(){
                this.ordercheck.push(this.every)                       
                this.distributionfee=this.everyStore.delivery_fee
                if(sessionStorage.getItem('token')){
                    this.$router.push({path:'/yesorder',query:{order:this.ordercheck,alltotal:this.alltotal,distributionfee:this.distributionfee}})
                }else{
                    this.$router.push('/login')
                }
            },
            loadData() {
            // this.$http.get('').then((res) => {
            //   this.data = res.data.concat(this.data)
            // })
            },
            handleor(){
              this.follow = !this.follow;
            }
        },
        computed:{
            alltotal(){
                let sum=0;
                sum = this.num*this.every.price
                return sum
            }
        }
    }
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.imgbox{
    height: 250px!important;
    li{
        height: 100%;
        img{
            height: 100%;
            width: 100%;
        }
    }
}
.home{
    width: 100%;
    height: 100%;
    background: #eeeeee;
}
.storeclose{
    width: 100%;
    text-align: center;
    background: rgba(0,0,0,.5);
    position: absolute;
    top: 115px;
    z-index: 9999999999;
    .close-tit{
        color: orange;
        font-size: 17px;
        line-height: 30px;
    }
    p{
        width: 100%;
        color: #eeeeee;
        line-height: 22px;
        font-size: 13px;
    }
}
.none{
    display: none;
}
.detail{
    background: #fff;
    padding: 0 5px;
    font-size: 14px;
}
.business{
    height: 30px;
}
.price{
    color: orange;
    font-size: 20px;
    background: #fff;
}
.title{
    background: #fff;
    line-height: 26px;
    font-size: 18px;
}
.select{
    background: #fff;
    height: 44px;
    line-height: 44px;
    padding-left: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
}
.none{
    display: none;
}
.dialog{
    width: 100%;
    height: 93.5%;
    position: absolute;
    left: 0;
    top:0;
    background: rgba(0,0,0,.5);
    z-index: 9999999;
}
.sizedialog{
    width: 100%;
    height: 75%;
    position: absolute;
    left: 0;
    bottom:0;
    z-index: 999999999;
    background: #fff;
    border-radius: 20px 20px 0 0;
    .close-dialog{
        width: 32px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background: rgba(0,0,0,.8);
        color: #fff;
        position: absolute;
        right: 15px;
        top: 10px;
        border-radius: 50%;
    }
    .select-goods{
        display: flex;
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #eee;
        margin-top: 20px;
        dt{
            width: 30%;
            height: 100%;
            padding: 0 10px;
            img{
                width: 100%;
            }
        }
        dd{
            flex: 1;
            height: 100%;
            .price{
                line-height: 43px;
            }
        }
    }
    
    .sel-size{
        width: 100%;
        margin: 5px 0;
        h4{
            line-height: 35px;
            padding-left: 10px;
        }
        div{
            width: 100%;
            h6{
                line-height: 24px;  
                padding: 0 10px;
                font-size: 16px;
            }
            p{
                display: flex;
            width: 100%;
            flex-wrap: wrap;
            }
            span{
                flex-shrink: 1;
                width: 45%;
                height: 28px;
                line-height: 28px;
                text-align: center;
                margin: 5px;
                border-radius: 28px;
                background: #ccc;
            }
            .active{
                background: skyblue;
                color: #fff;
            }
        }
    }
    .sale-num{
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 0 10px;
        line-height: 55px;
        h4{
            width: 50%;
            
        }
        .computed{
            border: 1px solid #ccc;
            height: 35px;
            width: 105px;
            display: flex;
            box-sizing: border-box;
            margin-top: 10px;
            span{
                flex: 1;
                height: 35px;
                line-height: 35px;
                text-align: center;
            }
        }
    }
}
.foot{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 44px;
    background: #fff;
    z-index: 999;
    display: flex;
    span{
        flex: 1;
        height: 44px;
        line-height: 44px;
        padding-left: 10px;
        i{
            font-size: 26px;
        }
    }
    button{
        background: skyblue;
        color: #fff;
        height: 44px;
        width: 100px;
        border: 0;
        outline: none;
        font-size: 16px;
    }
    .gobuy{
        background: orange;
    }
}
</style>