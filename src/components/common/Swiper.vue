<template>
    <div class="banner swiper-container" :style="{'height':high} ">
        <ul class="swiper-wrapper" :style="{'height':high} ">
            <li class="swiper-slide" v-for="(img,k) in imgs" :key="k" :style="{'height':high} ">
                <img class="bannerimg" v-lazy="img" alt="">
            </li>
        </ul>
        <ol class="swiper-pagination"></ol>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "swiper",
  props: {
      imgs:{
          type:Array
      },
      high:{
          type:String
      }
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: true,
      // 如果需要分页器
      pagination: ".swiper-pagination"
      // 如果需要前进后退按钮
      // nextButton: '.swiper-button-next',
      // prevButton: '.swiper-button-prev',
      // // 如果需要滚动条
      // scrollbar: '.swiper-scrollbar',
    });
  }
};
</script>

<style lang="scss" scoped>
.banner {
  height: 100px;
  margin-top: 1px;
}
.bannerimg {
  width: 100%;
  height: 100%;
}
</style>