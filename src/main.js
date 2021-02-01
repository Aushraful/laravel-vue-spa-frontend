import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';
import axios from "axios";
import './assets/css/main.scss';

Vue.use(Toasted, {
  iconPack : 'mdi', // set iconPack here, defaults to material. material|fontawesome|custom-class
  duration: 3000,
  action: {
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  },
  icon : {
    name : 'mdi-close-circle-outline',
    after : true // this will append the icon to the end of content
  }
});

require('@/store/subscriber');

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})

/*
a
    z-index: 25;
    right: 17px !important;
    position: absolute;

i
    position: absolute;
    right: 14px;
    font-size: 20px;

toasted
    padding-right: 36px;

*/
