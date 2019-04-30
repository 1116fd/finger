import dialog from './Dialog.vue';
import Vue from 'vue';
let DialogConstructor = Vue.extend(dialog)

DialogConstructor.constructor = DialogConstructor

// DialogConstructor.prototype.open=()=>{
//         this.visiable = true
// }
    
DialogConstructor.prototype.close=function(){
    
    this.visiable = false
    console.log(this.visiable)
}
 


function createDialog(options,params,id){
    let parent= options.parent || document.body;
    let {editcat,addcat,payment,confirm} = options;
    let dialog=null;
    if(params==='editcat'){
        dialog = editcat
    }else if(params==='addcat'){
        dialog = addcat
    }else if(params==='payment'){
        dialog = payment;
    }else if(params==='confirm'){
        dialog = confirm;
    }
    // 组件实例
    let instance = new DialogConstructor({
        el:document.createElement('div'),
        data(){
            return {
                dialog,
                id
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
        console.log('afterLeave','dialog')
        setTimeout(()=>{
            // 销毁实例
            instance.$destroy();
         
            // 删除dom节点
            instance.$el.parentNode.removeChild(instance.$el);
        },30)
    })
    
    
    
    // dom渲染完成的回调
    Vue.nextTick(()=>{
        instance.visiable = true
        if(instance.visiable){
            parent.appendChild(instance.$el)
        }
    })
    

    return instance
}

export default (Vue,options)=>{
    Vue.prototype.$dialog = (params,id)=>{
        console.log(options,params,id)
        return createDialog(options,params,id)
    }
}