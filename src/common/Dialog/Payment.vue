<template>
    <span class="my-dialog">
        <span class="payment"></span>
        <h4>支付成功</h4>
        <p>付款成功，欢迎下次光临！</p>
        <div class="footbtn">
            <button class="backhome">回到首页{{miao}}s</button>
        </div>
    </span>
</template>

<script>
import bus from "@/utils/bus.js";
import { setInterval, clearInterval } from "timers";
export default {
  name: "Payment",
  props: {},
  data() {
    return {
      miao: 5,
      timer: null
    };
  },
  created() {},
  mounted(){
      this.timer = setInterval(() => {
        this.miao--;
        if (this.miao == 0) {
          clearInterval(this.timer);
          this.$emit("close");
          bus.$emit("back");
        }
      }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.my-dialog {
  width: 100%;
  height: 100%;
  position: relative;
  p,
  h4 {
    text-align: center;
    line-height: 32px;
  }
  .payment {
    width: 80px;
    height: 80px;
    display: block;
    background: darkgreen;
    border: none;
    margin: 5px auto;
    border-radius: 50%;
    position: relative;
  }
  .payment::after {
    content: "";
    position: absolute;
    width: 38px;
    left: 18px;
    top: 15px;
    height: 26px;
    border-left: 5px solid #fff;
    border-bottom: 5px solid #fff;
    transform: rotate(-45deg);
  }
  .footbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: 50%;
      height: 32px;
      line-height: 32px;
      outline: none;
      background: none;
      color: #f2922f;
      border: 1px solid #f2922f;
      font-size: 14px;
      margin: 20px auto;
    }
  }
}
</style>