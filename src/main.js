import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
//mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


//element 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//axios
// import axios from 'axios'
// use
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.pr
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
