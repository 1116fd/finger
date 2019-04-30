let validator = (Vue, options) => {
  let {
    successClass,
    errorClass,
    eventTriggle = 'blur',
    customValidRules,
    autoRemind = false
  } = options;
  let defaultModifiers = [{
      modifier: 'string',
      msg: 'value type must be string',
      validFn(value) {
        return typeof value === 'string'
      }
    },
    {
      modifier: 'number',
      msg: 'value type must be number',
      validFn(value) {
        return /^\d+$/.test(value)
      }
    },
    {
      modifier: 'tel',
      msg: 'value must be telphone',
      validFn(value) {
        return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)
      }
    },
    {
      modifier: 'required',
      msg: 'item required',
      validFn(value) {
        return value != null && value != '' && value != undefined
      }
    }
  ]
  let finalmodifiers = defaultModifiers.concat(customValidRules)
  let eventHandle = function (el, binding, vnode) {
    let {
      modifiers
    } = binding;
    let res = Object.keys(modifiers).map(item => {
      let {
        modifier,
        msg,
        validFn
      } = finalmodifiers.find((i) => i.modifier === item)
      if (finalmodifiers.find((i) => i.modifier === item)) {
        return {
          modifier,
          msg,
          bool: validFn(this.value)
        };
      }
      return {
        modifier,
        bool: false
      }
    });
    
    let notPass = res.filter(item => item.bool != true);
    if (notPass.length==0) {
      el.classList.remove(errorClass);
      el.classList.add(successClass);
      let span = this.parentNode.querySelector('.validate-span')
      span && this.parentNode.removeChild(span);
    } else {
      el.classList.remove(successClass);
      el.classList.add(errorClass);
      if(autoRemind){
        let span = this.parentNode.querySelector('span');
        if(!span){
          span = document.createElement('span');
          span.classList.add('validate-span');
          el.insertAdjacentElement('afterend',span);
        }
        let str = '';
        notPass.forEach(item=>{
          str += item.msg+' | '
        }) 
        span.innerHTML = str.slice(0,-2);
      }else{
        notPass.forEach(item=>{
          console.log(item)
          // 不能给instance,也不能给组件的根data对象设置
          // vnode.context.$data.validError && Vue.set(vnode.context.$data.validError, item.modifier, item.msg);
          vnode.context.$emit('validErr',{modifier:item.modifier,msg:item.msg})
        }) 
      }
      
    }
  }
  Vue.directive('validate', {
    bind(el, binding, vnode) {
      //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        el.addEventListener(eventTriggle, () => {
          eventHandle.apply(el, [el, binding, vnode])
        })
    },
    inserted() {
      //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    },
    update() {
      //所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
    },
    componentUpdate(){
      //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    },
    unbind(el) {
      //只调用一次，指令与元素解绑时调用
      el.removeEventListener(eventTriggle, eventHandle)
    }
  })
}
export default validator;