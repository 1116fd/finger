<template>
    <div>
        <Checkbox
            v-model="result[item]"
            v-for="(item) in list"
            :key="item"
            :name="item"
            @change="toggle"
        ></Checkbox>
    </div>
</template>

<script>
import Checkbox from "@/components/CheckboxGroup/Checkbox.vue";
export default {
  name: "checkboxgroup",
  components: {
    Checkbox
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
        this.result[a.name] = a.checked
        this.$emit('businessTime',a.name)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>