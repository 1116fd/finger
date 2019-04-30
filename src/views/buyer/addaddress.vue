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
        <Head title="增加地址"/>
        <div class="content">
            <ul>
                <li><span>姓名</span>:<input type="text" placeholder="收件人姓名" v-model="name"/></li>
                <li><span>电话</span>:<input type="phone" placeholder="收件人手机号" v-model="phone"/></li>
                <li class="ts"><span>地区</span>: <v-distpicker @selected="onSelected"></v-distpicker></li>
                <li><span>详细地址</span>:<input type="text" placeholder="收街道门牌。楼层房间信息" v-model="address"/></li>
                <li><span>邮政编码</span>:<input type="text" placeholder="邮政编码" v-model="codes"/></li>
                <!-- <li class="defaultaddress"><span>设置默认收货地址</span><span @click="defaultdaaress" ref="text">{{defaulttext?"不默认":"默认"}}</span></li> -->
            </ul>
            <div class="btn" @click="preserve">保存</div>
            <Success :success="successval" :isshow="shows"/>  
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
            name:"",
            phone:"",
            address:"",
            codes:"",
            defaulttext:true,
            addressArr:[],
        }
    },
    components: {
    Head,
    VDistpicker
  },
  created() {
      this.addressArr =JSON.parse(sessionStorage.getItem('useraddress'))|| []
  },
  methods: {
      defaultdaaress(){
          this.defaulttext=!this.defaulttext             
      },
    preserve(){
        if(this.datas&&this.name&&this.phone&&this.address&&this.codes){
            this.addressobj["datas"]=this.datas
            this.addressobj["name"]=this.name
            this.addressobj["phone"]=this.phone
            this.addressobj["address"]=this.address
            this.addressobj["codes"]=this.codes
            this.addressArr.unshift(this.addressobj)
            sessionStorage.setItem('useraddress',JSON.stringify(this.addressArr))
          
            this.$router.push({
                name:"address",
            })
        }else{
            this.shows=true;
            this.successval="地址信息不完善"
            this.times()
        }
    },
    onSelected(data) {
      this.datas=data
    },
    times(){
    setTimeout(()=>{
            this.shows=false
          },2000)
     },
  }
}
</script>

