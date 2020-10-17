import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import FieryVue from "fiery-vue";
Vue.use(FieryVue);
import '@/style.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  fiery: true,
  render: (h) => h(App),
  vuetify,
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBZ1UwuPy3SBIORYrPlYevP6QVwrCSA4TI",
      authDomain: "olx-delivery.firebaseapp.com",
      databaseURL: "https://olx-delivery.firebaseio.com",
      projectId: "olx-delivery",
      storageBucket: "olx-delivery.appspot.com",
      messagingSenderId: "345906331366",
      appId: "1:345906331366:web:272d67224c41e7892c8527",
    });
  },
}).$mount("#app");
