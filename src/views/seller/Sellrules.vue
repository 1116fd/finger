<style lang="scss" scoped>
   .openstore-box{
       width: 100%;
       height: 100%;
       background: #000;
       padding:45px 20px;
       box-sizing: border-box;
       position: relative;
   }
   .storeinfo{
       width: 90%;
       height:84%;
       background: #fff;
       border-radius: 5px;
       position: absolute;
       padding: 20px;
       box-sizing: border-box;
       p{
           width: 100%;
           height: 40px;
           line-height: 40px;
           text-align: center;
           font-weight: 600;
       }
       li{
           width: 100%;
           height: auto;
           margin-top:10px;
           margin-bottom:15px;
       }
       button{
           width: 100%;
           height: 40px;
           margin-top:30px;
           border:none;
           background: #000;
           color:#fff;
           font-size: 15px;
       }

   }
</style>

<template>
    <div class="openstore-box">
        <div class="storeinfo">
            <p>开店须知</p>
            <ul>
                <li v-for="(item,index) in newdata" :key="index">{{index+1}}. {{item}}</li>
            </ul>
            <button @click="openstore">点击同意就可以开自己的店铺了哦！</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            newdata:[]
        }
    },
   
    mounted(){
        this.$http.get('/store/admittance').then(res=>{
            if(res.code===1){
                this.newdata=res.admittance
                console.log(this.loading.close)
                this.loading.close();
            }
        })
        this.loading = this.$loading();
    },
    methods:{
        openstore(){
            if (sessionStorage.getItem("user")) {
                console.log("开店");
                this.$router.push('/createstore');
            } else {
                alert("请先登陆");
                this.$router.push("/login");
            }
            
        }
    }
}
</script>
