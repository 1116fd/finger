<style lang="scss" scoped>
    .address{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .add{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }
    .content{
        width: 100%;
        flex: 1;
        overflow: hidden;
        margin-top: 40px;
        .bscroll-container{
            width: 100%;
            height: auto;
            padding: 0 10px;
            box-sizing: border-box;
            h2{
                line-height: 50px;
            }
            .defaultbox{
                width: 100%;
                height: auto;
                padding: 5px 10px;
                box-sizing: border-box;
                box-shadow: 1px 1px 10px #1B1A1F;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // flex-direction: column;
                >p{
                    line-height: 30px;
                    span{
                        padding-right: 10px;;
                    }
                }
            }
            ul{
                width: 100%;
                height: auto;
                li{
                    margin-bottom: 20px;
                    width: 100%;
                    height: auto;
                    padding: 5px 10px;
                    box-sizing: border-box;
                    box-shadow: 1px 1px 10px #1B1A1F;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .con{
                        display: flex;
                        flex-direction: column;
                        >p{
                        line-height: 30px;
                        span{
                            margin-right: 20px;
                        }
                    }
                    }
                }
            }
        }
    }
    .foot{
            width: 100%;
            height: 50px;
            background: #1B1A1F;
            display: flex;
            justify-content: center;
            align-items: center;
            .btn{
                width: 80%;
                height: 30px;
                background: #fff;
                border-radius: 10px;
                color: #1B1A1F;
            }
        }
</style>
<template>
    <div class="address">
        <Head title="地址列表"/>
        <div class="content" ref="bscroll">
            <div v-if="flag" class="add">您还没有地址呢，请添加地址</div>
            <div class="bscroll-container" v-else>
                <h2>默认地址</h2>
                <div class="defaultbox">
                    <div>
                        <p><span>{{only.name}}</span><span>{{only.phone}}</span></p>
                    <div>
                        <p>{{only.datas.province.value}}{{only.datas.city.value}}{{only.datas.area.value}}{{only.address}}</p>
                    </div>
                    </div>
                    <div @click="upaddress(only,0)">修改</div>
                </div>
                <H2>地址列表</H2>
                <ul>
                    <li v-for="(item,i) in addressarr" :key="i">
                    <div class="con"  @click="changedefault(item)">
                        <p><span>{{item.name}}</span><span>{{item.phone}}</span></p>
                        <div>
                            <p>{{item.datas.province.value}}{{item.datas.city.value}}{{item.datas.area.value}}{{item.address}}</p>
                        </div>
                    </div>
                    <div @click="upaddress(item,i)">修改</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="foot">
            <div class="btn" @click="changeurl">增加地址</div>
        </div>
        <Success :success="successval" :isshow="shows"/>
    </div>
</template>
<script>
import BScroll from "better-scroll"
import Head from '@/components/Head.vue'
export default {
    data(){
        return{
            addressarr:[],
            flag:true,
            only:{},
            successval:"",
            shows:false,
        }
    },
    components: {
    Head,
  },
  mounted(){
      this.$nextTick(()=>{
          this.bscroll=new BScroll(this.$refs.bscroll,{
           click:true,
          probeType:2
        })
      })
      this.addressarr= JSON.parse(sessionStorage.getItem("useraddress"))
       this.only=this.addressarr[0]
       sessionStorage.setItem("only",JSON.stringify(this.only))
      if(this.addressarr){
          this.flag=false
        }else{
            this.flag=true
        }
        if(this.$route.params.values){
            let data=this.addressarr[this.$route.params.idx]
            for(let i in data){
                if(i!=="datas"){
                    data[i]=this.$route.params.values[i]
                }else{
                    if(Object.keys(this.$route.params.values.datas).length!=0){
                        data.datas.province.value=this.$route.params.values.datas.province.value
                        data.datas.city.value=this.$route.params.values.datas.city.value
                        data.datas.area.value=this.$route.params.values.datas.area.value
                    }
                }
            }
            let getuseraddress=JSON.parse(sessionStorage.getItem("useraddress"))
            getuseraddress[this.$route.params.idx]=data
            sessionStorage.setItem("useraddress",JSON.stringify(getuseraddress))   
            sessionStorage.setItem("only",JSON.stringify(this.only))
            this.shows=true;
            this.successval="修改成功"
            setTimeout(()=>{
                this.shows=false
            },2000)    
        }
        
  },
  methods:{
      times(){
          setTimeout(()=>{
                this.shows=false
            },2000) 
      },
      upaddress(item,i){
          this.$router.push({
              name:"updateaddress",
              params:{
                  arr:item,
                  idx:i
              }
          })
      },
      changedefault(item){
          if(item==this.only){
              this.shows=true;
            this.successval="已经是默认地址了"
            this.times()
          }else{
              this.only=item
              sessionStorage.setItem("only",JSON.stringify(this.only))
              this.shows=true;
            this.successval="切换默认地址成功"
            this.times()
          }
      },
      changeurl(){
          this.$router.push({
              name:"addaddress"
          })
          
      }
  }
}
</script>

