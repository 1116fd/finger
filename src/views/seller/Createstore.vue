<style lang="scss" scoped>
   .openstore-box{
       width: 100%;
       height: 100%;
       background: #000;
       box-sizing: border-box;
       position: relative;
   }
   .storeinfo{
       width: 90%;
       height:86%;
       background: #fff;
       border-radius: 5px;
       position: absolute;
       padding: 20px;
       margin:45px 20px;
       box-sizing: border-box;
       overflow-y: scroll;
       p{
           width: 100%;
           height: 60px;
           line-height: 60px;
           text-align: center;
           display: flex;
           align-items: center;
           span{
               display: inline-block;
               width: 100px;
           }
           input{
               border:0;
               border-bottom:1px solid #ccc;
               outline: 0;
               flex: 1;
           }
           .select{
               border:0;
            //    padding-left: 20px;
               border-bottom: 1px solid #ccc;
               outline: 0;
                flex: 1;
                height: 30px;
           }
       }
       button{
           width: 100%;
           height: 50px;
           border:0;
           color:#fff;
           outline: 0;
           border-radius: 10px;
           background: skyblue;
       }
   }
</style>

<template>
<!-- <input type="text" v-model="getonesort"> -->
<!-- <input type="text" v-model="gettwosort"> -->
    <div class="openstore-box" ref="box">
        <div class="storeinfo">
            <p><span>店铺名称:</span><input type="text" v-model="getshopname"></p>
            <p><span>营业证号:</span><input type="text" v-model="getcode"></p>
            <p><span>用户 ID:</span><input type="text" v-model="getuserid"></p>
            <p><span>一级分类:</span>
            <input type="text" class="ipt" @click="showselect" ref="div" v-model="getonesort" placeholder="请选择">
            <Options :show="show1" :optionsarr="catlist" @goods="getgoods1" @hide="hidesel"></Options>
                <!-- <select class="select" name="" id="" v-model="getonesort" @change="changecat">
                    <option value="请选择">请选择</option>
                    <option v-for="(item,index) in catlist" :key="index">{{item.cat_name}}</option>
                </select> -->
            </p>
            <p><span>分类ID:</span><input type="text" v-model="cat_id"></p>
            <p><span>二级分类:</span>
            <input type="text" class="ipt" @click="showselect2" ref="div" v-model="gettwosort" placeholder="请选择">
            <Options :show="show2" :optionsarr="sublist" @goods="getgoods2" @hide="hidesel"></Options>
                <!-- <select class="select" name="" id="" v-model="gettwosort">
                <option value="请选择">请选择</option>
                <option v-for="(item,index) in sublist" :key="index">{{item}}</option>                
                </select> -->
            </p>
            <button @click="submit">创建店铺</button>
        </div>
        
    </div>
</template>

<script>
export default {
   data(){
      return{
           getshopname:'',
           getcode:'',
           getuserid:'',
           getonesort:'请选择',
           getsortid:'',
           gettwosort:'请选择',
           catlist:[],
           cat_id:'',
           sublist:[],
           show1:false,
           show2:false,
      }
   },
   created(){
        this.$http.get('/store/catagory').then(res=>{
            if(res.code==1){
                this.catlist = [...res.list]
                console.log(this.catlist)
            }
        })
   },
   methods:{
       showselect2(){
      this.show2=true
    },
       showselect(){
      this.show1=true
    },
    getgoods1(data){
      this.values=data.cat_name
      this.show1=false
      this.show2=false
      this.getonesort=this.values
    this.sublist=data.sub_cat_name
    this.cat_id=data.cat_id
    },
    getgoods2(data){
        this.gettwosort=data
        console.log(this.gettwosort)
    },
    hidesel(){
      this.show1=false
      this.show2=false
    },
       submit(){
            this.$http.post('/store/create',{
                cat_id:JSON.stringify(this.cat_id),
                idcard:'513436200003227858',
                uid:sessionStorage.getItem('uid') || 'asdascxv123asd',
                sub_cat:this.gettwosort,
                cat:this.getonesort,
                store_name:this.getshopname
            }).then(res=>{
                console.log(res)
                if(res.code==1){
                    this.loading.close();
                    //请求时所要用的店铺id,已跑通到时候修改参数就可以
                    this.$router.push({path:'/index',query: {storeid:res.store_id}})
                }
            }).catch(()=>{
                this.loading.close();
            })
            this.loading = this.$loading();
       }
   }
}
</script>
