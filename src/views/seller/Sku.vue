<template>
    <div>
      <Storehead v-bind:title="title" v-bind:applist="applist"/>
        <button @click="createSku">添加Sku</button>
        <button @click="submitSku">提交Sku</button>
        <sku v-for="(v) in skuarr" :key="v.id" :id="v.id" @remove="onRemove"/>
    </div>
</template>

<script>
import sku from "@/components/sku/sku.vue";
import Storehead from "../../components/common/Storehead.vue";
export default {
  name: "Sku",
//   props: ["cat_id", "store_id"],
  data() {
    return {
      title:'添加Sku',
      skuarr: [],
      idcount: 0,
      store_id: "",
      cat_id: "",
      goods_id:''
    };
  },
  components: {
    sku,
    Storehead
  },
  created() {
    if (this.$route.params.store_id) {
      this.store_id = this.$route.params.store_id;
    }
    if (this.$route.params.cat_id) {
      this.cat_id = this.$route.params.cat_id;
    }
    if (this.$route.params.goods_id) {
      this.goods_id = this.$route.params.goods_id;
    }
  },
  methods: {
    createSku() {
      this.idcount++;
      this.skuarr.push({ id: this.idcount });
    },
    onRemove(id) {
      this.skuarr = this.skuarr.filter(item => {
        return item.id !== id;
      });
    },
    submitSku() {
      let childs = this.$children;
      let result = childs.map(item => {
        let params = item.$children.map(v => {
          return v.group_item;
        });

        return {
          group: item.group_name,
          params
        };
      });
      console.log(JSON.stringify(result));
      sessionStorage.setItem(this.goods_id, JSON.stringify(result));
      console.log('set',this.store_id,this.cat_id)
      this.$http
        .post("/store/goods/sku.set", {
          sku: JSON.stringify(result),
          store_id: this.store_id,
          cat_id: this.goods_id
        })
        .then(res => {

          if(res.code==1){
            console.log(res);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  outline: none;
  background: skyblue;
  border: 0;
  width: 40%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 20px 18px;
}
</style>