// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import store from "./store";
import firebase from 'firebase'
// import axios from 'axios';
import "vuetify/dist/vuetify.min.css";

// Initialize Firebase
let app;
var config = {
  apiKey: "AIzaSyCMUJG7XoHEF9_wCEO89R0ss7s8N2x5JS8",
  authDomain: "erapot-7a9c5.firebaseapp.com",
  databaseURL: "https://erapot-7a9c5.firebaseio.com",
  projectId: "erapot-7a9c5",
  storageBucket: "erapot-7a9c5.appspot.com",
  messagingSenderId: "234662287317"
};
firebase.initializeApp(config);

Vue.use(Vuetify, {
  theme: {
    primary: "#7849BB",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  },
  iconfont: "fa"
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
