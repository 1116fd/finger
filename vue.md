new Vue({
    el:'#box', // 挂载容器
    data:{},
    props:{},
    components:{
        msg
    },
    template:'<div><msg></msg></div>', // 模板=>字符串  正则匹配字符串 经过vue转换为虚拟dom
    render(createElement){
        return createElement('div',{class:'box',id:'box'},[createElement('div',{class:'p',id:'',on:{click:()=>{oState.count++}}},'Hello World'+oState.count)]) 

        // 创建子节点 递归调用 创建元素，元素属性
    },// 创建虚拟dom 
    mounted(){
        // 添加dom需要时间,不能百分百获取dom

            Vue.nextTick(()=>{
                // 操作dom
            })
    }
})

$mount('#box')

// 定义一个Vue组件  
.vue文件(不是一个组件)创建一系列的对象，即上面的内容  组件配置项

// 定义一个vue组价
let c={
    data(){
        return {
            msg:'vue'
        }
    },
    template:'<h3>{{msg}}<slot></slot></h3>',
    render(){

    }
}
// Vue全局组件
Vue.component('msg',c)


// 
let renderObj = Vue.compile('<div><msg>sssss</msg></div>')

new Vue({render:renderObj.render})





// 运行顺序
el,template,render,compile,virtual dom,mount

mvvm   修改一个属性更新视图

let oState = Vue.observable({
    a:'a'
})  // 监听对象

console.log(oState) // {}

let o = {
    a:'hello'
}
let pState = new Proxy({
    a:'hello'
},{
    get(target,props){
        if(props=='a'){
            return 123
        }
        console.log(target) // target代理的对象
        return target[props]
    }
})

Object.defineProperty(o,'a',{
    get(props){
        return 456
    }
})




# vue生命周期
# vue内置组件
# vue指令

created(){
    // 数据绑定，函数注册，计算属性，watch，props
}
mounted(){
    // console.log(this.$refs.t)
}

### 跨组件传值

    无论是vue的实例还是vue的组件都是一个事件派发机和事件监听者
    a. 父子之间 props ($emit v-on)=>(同一个组件派发事件，同一个组件监听事件，触发on事件--事件由谁触发由谁监听)              callback  

    b. 非父子之间 额外定义一个vue实例

        > bus.js

        > import Vue from 'vue';
        > export default new Vue({});

        > bus.$emit()   子组件  
        > bus.$on()     父组件



## 插件   loading 
dialog
select
checkbox
radio
