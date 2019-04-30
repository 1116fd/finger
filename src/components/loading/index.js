import Vue from "vue";
import Loading from "./loading.vue"
let loadingConstructor=Vue.extend(Loading)   //得到一个构造器
let instance=new loadingConstructor({   //成了一个组件对象
    el:document.createElement("div")
})
console.log(instance)
