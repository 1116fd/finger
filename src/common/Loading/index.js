import loading from './Loading.vue';
import Vue from 'vue';
let LoadingConstructor = Vue.extend(loading)

LoadingConstructor.constructor = LoadingConstructor

// LoadingConstructor.prototype.open=()=>{
//         this.visiable = true
// }
    
LoadingConstructor.prototype.close=function(){
    console.log(this)
    this.visiable = false
}
 


function createLoading(options){
    let parent= options.parent || document.body;
    let {loading} = options;
    // 组件实例
    let instance = new LoadingConstructor({
        el:document.createElement('div'),
        data(){
            return {
                loading
            }
        }
        // watch:{
        //     visiable(_new,_old){
        //         console.log(_new);
        //         if(!_new){
        //             parent.removeChild(this.$el); // 销毁
        //         }
        //     }
        // }

    })

    instance.$on('afterLeave',()=>{
        console.log('afterLeave')
        setTimeout(()=>{
            // 销毁实例
            instance.$destroy();
        
            // 删除dom节点
            instance.$el.parentNode.removeChild(instance.$el);
        },30)
    })

    parent.appendChild(instance.$el)
    // dom渲染完成的回调
    Vue.nextTick(()=>{
        instance.visiable = true
    })

    return instance
}


// export default {
//     install(Vue){

//     }
// }

export default (Vue,options)=>{
    Vue.prototype.$loading = ()=>{
        return createLoading(options)
    }
}