import Vue from 'vue'
import OptionsComponent from "./options.vue"
const Options={
    install:function(){
        Vue.component('Options',OptionsComponent)
    }
}

export default Options