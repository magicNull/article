import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    css_show_id: 0,
    userToken: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : '',
    userTokenLong: sessionStorage.getItem('userTokenLong') ? sessionStorage.getItem('userTokenLong') : '',
    user:{
      name:'张三',
      uid:'1',
      introduce:'',
      gender:2,
      birthday:'',
      avatar:'',
      cover:'',
      official:'',
    },
    publicPath: process.env.BASE_URL,
  },
  mutations: {
    changCss_show_id(state, num) {
      state.css_show_id = num
    },
    changeUserToken(state, token) {
      state.userToken = token;
      localStorage.setItem('userToken', token);
    },
    changeUserTokenLong(state, token) {
      state.userTokenLong = token;
      sessionStorage.setItem('userTokenLong', token);
    },
    changeUser(state,data){
        state.user=data
    }
  },
  actions: {},
  modules: {},
  getters: {
    getCssShowId(state) {
      return state.css_show_id
    },
    getUserToken(state) {
      return state.userToken
    },
    getUserTokenLong(state) {
      return state.userTokenLong
    },
  }
})