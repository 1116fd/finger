<template>
    <div class="store-page">
        <Storehead v-bind:title="title"/>
        <div class="store-list">
            <List @scrollmsg="scrollmsg"/>
        </div>
        <button class="openstore" @click="handleSetStore">我要开店</button>
    </div>
</template>

<script>
import List from "./store-list.vue";
import Me from "./Mystore.vue";
import Storehead from "@/components/common/Storehead.vue";
export default {
  name: "store",
  components: {
    List,
    Storehead
  },
  data() {
    return {
      title:'店铺列表',
      scroll: null
    };
  },
  //   beforeRouteLeave(to, from, next) {
  //     let positiony = this.scroll.y;
  //     console.log(positiony);
  //     if (positiony == null) positiony = 0;
  //     this.$store.commit("changeScrollY3", positiony);
  //     next();
  //   },
  methods: {
    scrollmsg(scroll) {
      this.scroll = scroll;
    },
    handleSetStore() {
      this.$router.push("/rule");
    }
  }
};
</script>

<style lang="scss">
.store-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .store-tab {
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #ccc;
    span {
      display: inline-block;
      height: 48px;
      line-height: 48px;
    }
    .tab-active {
      color: blue;
    }
  }
  .store-list {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
}
.openstore{
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  background: orange;
  border: 0;
  color: #fff;
  font-size: 15px;
}
</style>
