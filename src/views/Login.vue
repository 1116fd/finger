<template>
  <div class="login">
    <div class="login-form">
      <h1>登录</h1>
      <input
        v-model="user"
        v-validate.tel.number.required
        class="user"
        type="text"
        placeholder="手机号/邮箱/会员名"
      >
      <input v-model="pwd" v-validate.required class="pwd" type="password" placeholder="请输入密码">
      <!-- <p class="changemethod sc">
        <input class="s" type="text" placeholder="验证码" v-model="shortnum">
        <b class="num" @click="short">{{shortmsg}}</b>
      </p> -->
      <p class="changemethod sc">
        <input class="s" type="text" placeholder="图片验证码"  v-model="codenum">
        <b class="code" @click="verification"></b>
      </p>
      <button class="loginBtn" @click="login">登录</button>
      <p class="changemethod zc">
        <span>忘记密码？</span>
        <router-link to="/register">免费注册</router-link>
      </p>
    </div>
    <Success :success="successval" :isshow="shows"/> 
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      successval:"",
      shows:false,
      user: "",
      pwd: "",
      shortmsg:'1234',
      shortnum:'',
      validError: {},
      code:'',
      codenum:''
    };
  },
  created(){
    this.verification();
  },
  methods: {
    times(){
      setTimeout(()=>{
          this.shows=false
      },2000)
    },
    verification(){
      console.log(7)
      this.$http.get(`/buyer/user/captcha`).then(res=>{
          if(res.code==1){
              this.code = res.data
              document.querySelector('.code').innerHTML = this.code;
          }
      })
    },
    login() {
      console.log(this.user);
      if (this.user && this.pwd) {
        
        // if(this.shortnum){
        //   if(this.shortmsg == this.shortnum){
        //     console.log('验证码成功')
        //   }
        // }
        this.$http.post(`/buyer/user/login`,{
            username:this.user,
            password:this.pwd,
            captcha:this.codenum
        }).then(res=>{
          console.log(res)
            if(res.code==1){
              sessionStorage.setItem("token", res.token);
              sessionStorage.setItem("user", this.user);
              sessionStorage.setItem("pwd", this.pwd);
              this.$router.push("/");
            }else{
              this.shows=true;
              this.successval=res.msg
              this.times()
            }
        })
        
      } else {
       // alert("用户名或密码不能为空！");
            this.shows=true;
            this.successval="用户名或密码不能为空！"
            this.times()
      }

      // if(sessionStorage.getItem('user')){
      //     console.log('开店')
      // }else{
      //     alert('请先登陆');
      //     // this.$router.push('/index');
      // }
    },
    // short() {
    //   let charactors = "1234567890";

    //   let value = "",
    //     i;

    //   for (let j = 1; j <= 4; j++) {
    //     i = parseInt(10 * Math.random());
    //     value = value + charactors.charAt(i);
    //   }
    //   this.shortmsg = value;
    //   console.log(value)
    // }
  },
  mounted() {
    this.$on("validErr", data => {
      console.log(data);
    });
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #f0f111 0%, #f0f111 30%, #ff0000 80%);
}
.login-form {
  width: 80%;
  height: auto;
  background: rgba(255, 255,255,1);
  transform: translate3d(-50%, -50%, 0);
  margin-left: 50%;
  margin-top: 80%;
  padding-top: 40px;
  padding: 10px;
  border-radius: 25px;
  h1 {
    text-align: center;
    line-height: 100px;
    font-size: 22px;
  }
  input {
    height: 35px;
    width: 80%;
    margin: 10px 10%;
    border: 0;
    outline: none;
    border-bottom: 1px solid orange;
    padding-left: 10px;
  }
}
.changemethod {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  // padding: 0 20px;
  .shortmsg {
    height: 35px;
    background: 0;
    border: 0;
    font-size: 12px;
  }
  .s{
    width: 100%;
  }
  b{
    position: absolute;
  }
  .num{
    color: blue;
    background: #f0f111;
    text-align: center;
    padding: 5px;
    top: 5px;
    right: 40px;
  }
  .code{
    top:-7px;
    right: 10px;
  }
}
.sc{
  position: relative;
}
.zc {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.loginBtn {
  width: 80%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: orangered;
  border-radius: 50px;
  border: 0;
  color: #fff;
  font-size: 14px;
  margin: 40px 10% 10px;
}
</style>