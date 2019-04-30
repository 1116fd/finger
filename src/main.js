import Vue from 'vue'
import App from './App.vue'
import echarts from "echarts"
import router from './router'
import store from './store'
import 'swiper/dist/css/swiper.css';
import './common/common.css'
import http from './utils/http'
import VueLazyLoad from 'vue-lazyload'
import Options from "./components/options"
import Success from "./components/success"
import loading from '@/common/Loading'
import mloading from '@/common/Loading/CustomLoading.vue'
import dialog from '@/common/Dialog'
import addcat from '@/common/Dialog/Addcat.vue'
import editcat from '@/common/Dialog/Editcat.vue'
import confirm from '@/common/Dialog/Confirm.vue'
import payment from '@/common/Dialog/Payment.vue'
import Checkbox from './components/CheckboxGroup'
import validator from '@/plugins/validator'
Vue.use(validator,{
  eventTriggle:'blur',
  successClass:'validate-success',
  errorClass:'validate-error',
  autoRemind:true,
  customValidRules:[
    {
      modifier:'email',
      msg:'value must be email',
      validFn(value){
        return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)
      }
    }
  ]
})

Vue.prototype.$echarts = echarts 
Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
  error:'/img/error.png',
  loading:'/img/loading.gif'
})
Vue.prototype.$echarts = echarts 
Vue.use(http);

Vue.use(loading,{
  parent:'',
  loading:mloading
});

Vue.use(dialog,{
  parent:'',
  editcat,
  addcat,
  payment,
  confirm
});
Vue.use(Options)
Vue.use(Success)

Vue.use(Checkbox)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
