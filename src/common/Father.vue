<template>
    <div>
        <ul>
            <items v-for="(model, index) in list" :model="model" :key="index"></items>
        </ul>
    </div>
</template>

<script>
// https://www.jianshu.com/p/c549c3d0f595

 // 父组件调用
 import items from './Cascadingmenu.vue'
export default {
  components: {
    items
  },
  data() {
    return {
      list: [
        {
          id: "1",
          menuName: "项目管理",
          childTree: [
            {
              menuName: "项目进度",
              childTree: [
                {
                  menuName: "项目一",
                  childTree: [{ menuName: "详细信息" }]
                }
              ]
            },
            {
              menuName: "任务安排"
            }
          ]
        },
        {
          id: "2",
          menuName: "数据统计"
        },
        {
          id: "3",
          menuName: "人员管理"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>