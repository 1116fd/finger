<template>
    <div>
        <Radio
            v-model="result[item]"
            v-for="(item) in list"
            :key="item"
            :name="item"
            @change="toggle"
        ></Radio>
    </div>
</template>

<script>
import Radio from "@/components/RadioGroup/radio.vue";
export default {
  name: "radiogroup",
  components: {
    Radio
  },
  props: {
    result: {
      type: Object,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    name: {
      type: String
    }
  },
  methods: {
    toggle(a) {
        for(let i in this.result){
            this.result[i] = false;
        }
        this.result[a.name] = a.checked
    }
  }
};
</script>

<style lang="scss" scoped>
</style>