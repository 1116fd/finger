<template>
    <div class="register">
        <div class="register-form">
            <h1>注册</h1>
            <input v-model="user" class="user" type="text" placeholder="手机号/邮箱/会员名" v-validate.tel.number.required />
            <input v-model="pwd" class="pwd" type="password" placeholder="请输入密码" v-validate.required />
            <button class="registerBtn" @click="register">注册</button>
        </div>
        <Success :success="successval" :isshow="shows"/> 
    </div>
</template>

<script>
    export default {
        name:'register',
        data() {
            return {
                user: '',
                pwd:'',
                successval:"",
                shows:false,
            }
        },
        methods:{
            register(){
                console.log(this.user)
                if(this.user && this.pwd){
                    this.$http.post(`/buyer/user/register`,{
                        username:this.user,
                        password:this.pwd,
                        nickname:'圩儿',
                        gender:'',
                        portrait:'',
                        phone_number:this.user
                    }).then(res=>{
                        if(res.code==1){
                            this.$router.push('/login');
                        }
                    })
                }else{
                    this.shows=true;
                    this.successval="用户名或密码不能为空！"
                    setTimeout(()=>{
                        this.shows=false
                    },2000)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.register{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #f0f111 0%,#ffff00 0%,#ff0000 80%);
}
.register-form{
    width: 80%;
    min-height: 55%;
    height: auto;
    background: #fff;
    transform: translate3d(-50%,-50%,0);
    margin-left: 50%;
    margin-top: 80%;
    border: 1px solid #ccc;
    padding-top: 40px;
    padding: 10px;
    border-radius: 25px;
    h1{
        text-align: center;
        line-height: 100px;
        font-size: 22px;
    }
    input{
        height: 35px;
        width: 80%;
        margin: 10px 10%;
        border: 0;
        outline: none;
        border-bottom:1px solid orange;
        padding-left: 10px;
    }
}
.changemethod{
    width: 100%;
    display: flex;
    justify-content:space-between;
    .shortmsg{
        width: 50%;
        height: 35px;
        background: 0;
        border: 0;
    }
}
.registerBtn{
    width: 80%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: orangered;
    border-radius: 50px;
    border: 0;
    color: #fff;
    font-size: 14px;
    margin: 60px 10%;
}
</style>