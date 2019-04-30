<template>
  <div class="shop-fileimg">
    <span class="plus-btn">+</span>
    <span class="plus-title">{{title}}</span>
    <input type="file" class="plus" :multiple="multiple" @change="(e)=>fileLogo(e)">
    <Success :success="successval" :isshow="shows"/> 
  </div>
</template>

<script>
export default {
  name: "uploadpic",
  props: {
    title: {
      type: String
    },
    store_id: {
      type: String
    },
    multiple: {
      type: String
    }
  },
  data() {
    return {
      bannerUrl: [],
      imgUrl: "",
      successval:"",
      shows:false,
    };
  },
  methods: {
    fileLogo(e) {
      if (this.bannerUrl.length >= 3) {
       // alert("只能上传3张banner图片！");
        this.shows=true;
            this.successval="只能上传3张banner图片"
            setTimeout(()=>{
                this.shows=false
            },2000)
        return;
      }
      let formData = new FormData();
      formData.append("files", e.target.files[0]);
      this.$http
        .post(`/upload?store_id=${this.store_id}`, formData)
        .then(res => {
          if (res.code === 1 && res.url.length) {
            if (this.multiple === "multiple") {
              this.bannerUrl.push(res.url[0].url);
              this.$emit("imgUrl", this.bannerUrl);
              this.picUrl(res.url[0].url, ".banner-egimg");
            } else {
              this.imgUrl = res.url[0].url;
              this.$emit("imgUrl", res.url[0].url);
              this.picUrl(res.url[0].url, ".logo-egimg");
            }
          }
        });
    },
    picUrl(url, imgbox) {
      let box = document.querySelector(imgbox);
      let img = document.createElement("img");
      // let close = document.createElement("span");
      img.src = url;
      if (imgbox === ".logo-egimg") {
        img.setAttribute("width", 108);
        img.setAttribute("height", 108);
      } else if (imgbox === ".banner-egimg") {
        // img.setAttribute("width", "100%");
        img.setAttribute("width", 108);
        img.setAttribute("height", 108);
      }
      // box.setAttribute('position','relative');
      // close.setAttribute('position','absolute');
      // close.setAttribute('right',-40);
      // close.setAttribute('top',-10);
      // close.setAttribute("width", 10);
      // close.setAttribute("height", 10);
      // close.setAttribute("background", 'rgba(0,0,0,.7)');
      // close.setAttribute("color", '#fff');
      // close.innerHTML = 'X'
      box.appendChild(img);
      // box.appendChild(close);
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-fileimg {
  width: 105px;
  height: 105px;
  border: 1px dashed #ccc;
  display: flex;
  flex-direction: column;
  text-align: center;
  background: #fff;
  position: relative;
  .plus-btn {
    font-size: 40px;
    margin-top: 20px;
  }
  .plus-title {
    font-size: 12px;
  }
  .plus {
    width: 105px;
    height: 105px;
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>