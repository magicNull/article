import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    css_show_id: 0,
  },
  mutations: {
    changCss_show_id(state,num){
      state.css_show_id=num
    }
  },
  actions: {},
  modules: {},
  getters: {
    getCssShowId(state) {
      return state.css_show_id
    }
  }
})