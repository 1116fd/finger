import Vue from 'vue'
import Vuex from 'vuex'
import shop1 from "@/assets/img/shop1.jpg";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fd:"123",
    cat_id: '',
    cat_name: '',
    homedata: [],
    every: {},
    scrolly: '',
    scrolly2: '',
    scrolly3: '',
    goods_id: '',
    bookmark: [{
      banner: "/public/assets/upload/Mzk1ZjVmYzc4YWYyMjRkMWEyMWM4YWQwMGQyOGUyMGQuanBn..jpg,/public/assets/upload/NzgxYjNhYjgzNDgyYTI5ODQ3NzBjMTU2Y2U4MGMxMDcuZ2lm..gif,/public/assets/upload/OTllMWExZTM2NzIxYmRkZDFhOTQxYjVmYTA2YTdhOTIuanBn..jpg",
      brand_name: "谷苗稻香",
      business_time: "星期一,星期二,星期三,星期四,星期五",
      catagory: "服装",
      contact_number: "13612344321",
      create_time: null,
      delivery_fee: 30,
      idcard_number: "ec57e5bd7f7a14b6b57cc6e88d5aaa39a652d607641622b003442a46716f7d92",
      indexstyle_id: 1,
      logo: "/public/assets/upload/OTllMWExZTM2NzIxYmRkZDFhOTQxYjVmYTA2YTdhOTIuanBn..jpg",
      main_image: "1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC",
      store_id: "b677754d0282970d81e285ef6297100d",
      store_name: "五谷粥坊",
      sub_catagory: "童装,女装,鞋",
      uid: "asdascxv123asd"
    }],
    addressarr:[],
    only:{}
  },
  mutations: {
    // changeTest(state) {
    //   console.log(state)
    //   state.test = 'testsssssss'
    // },
    editCatid(state, payload) {
      state.cat_name = payload;
      console.log(state)
    },
    loadHomedata(state, payload) {
      state.homedata = payload.concat(state.homedata)
      // state.homedata = payload
    },
    Toevery(state, payload) {
      state.every = payload;
    },
    changeScrollY(state, payload) {
      state.scrolly = payload
    },
    changeScrollY2(state, payload) {
      state.scrolly2 = payload
    },
    changeScrollY3(state, payload) {
      state.scrolly3 = payload
    },
    savegoodsid(state, payload) {
      state.goods_id = payload
    },
    setbookmark(state, payload) {
      state.bookmark = payload
    },
    // preserve(state,date){
    //   state.only=date.only
    //   state.addressarr.unshift(date.addressobj);
    // }
  },
  actions: {

  },
  modules: {

  }
})