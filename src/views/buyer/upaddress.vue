<style lang="scss" scoped>
    .address{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .content{
        width: 100%;
        flex: 1;
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        ul{
            width: 100%;
            height: auto;
            margin-top: 20px;
            li{
                width: 100%;
                height: auto;
                border-bottom: #ccc 1px solid;
                display: flex;
                align-items: center;
                padding: 5px 15px;
                box-sizing: border-box;
                span{
                    width: 80px;
                    margin-right: 5px;
                }
                input{
                    width: 80%;
                    height:35px;
                    border:none;
                    padding-left: 5px;
                    margin-left: 5px;
                }
            }
            .ts,.defaultaddress{
                justify-content: space-between;
            }
            .defaultaddress{
                span{
                    width: auto;
                }
            }
        }
        .btn{
            width: 80%;
            height: 30px;
            background: #f00;
            margin-top: 20px;
            }
    }
</style>
<template>
    <div class="address">
        <Head title="修改地址"/>
        <div class="content">
            <ul>
                 <!-- @selected="onSelected" :province="province" :city="city" :area="district" @province="getProvince" @city="getCity" @area="getArea" -->
                <li><span>姓名</span>:<input type="text" placeholder="收件人姓名" v-model="name"/></li>
                <li><span>电话</span>:<input type="phone" placeholder="收件人手机号" v-model="phone"/></li>
                <li class="ts"><span>地区</span>: <v-distpicker :province="province" :city="city" :area="area" @selected="onSelected"></v-distpicker></li>
                <li><span>详细地址</span>:<input type="text" placeholder="收街道门牌。楼层房间信息" v-model="address"/></li>
                <li><span>邮政编码</span>:<input type="text" placeholder="邮政编码" v-model="codes"/></li>
                <!-- <li class="defaultaddress"><span>设置默认收货地址</span><span @click="defaultdaaress" ref="text">{{defaulttext}}</span></li> -->
            </ul>
            <div class="btn" @click="preserve">保存</div>
            <!-- <Success :success="successval" :isshow="shows"/>   -->
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll"
import Head from '@/components/Head.vue'
import VDistpicker from 'v-distpicker'
export default {
    data(){
        return{
            successval:"",
            shows:false,
            datas:{},
            addressobj:{},
            name:this.$route.params.arr.name,
            phone:this.$route.params.arr.phone,
            address:this.$route.params.arr.address,
            codes:this.$route.params.arr.codes,
            province:this.$route.params.arr.datas.province.value,
            city:this.$route.params.arr.datas.city.value,
            area:this.$route.params.arr.datas.area.value,
            idx:this.$route.params.idx,
            only:{}
        }
    },
    components: {
    Head,
    VDistpicker
  },
  methods: {
      defaultdaaress(){
          this.defaulttext=!this.defaulttext             
      },
      onSelected(data) {
        this.datas=data
    },
    preserve(){
       if(this.name,this.phone,this.address,this.codes,this.datas){
           this.addressobj["datas"]=this.datas
            this.addressobj["name"]=this.name
            this.addressobj["phone"]=this.phone
            this.addressobj["address"]=this.address
            this.addressobj["codes"]=this.codes
            this.$router.push({
            name:"address",
            params:{
                values:this.addressobj,
                idx:this.idx
            }
            })
       }
    },
    
  }
}
</script>
