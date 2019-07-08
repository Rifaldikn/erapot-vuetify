import Vue from "vue";
import * as Firebase from "firebase";
import store from "./store";
import router from "./router";
import App from "./App";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueHtmlToPaper from "vue-html-to-paper";
import css from "vuetify/dist/vuetify.min.css";

//initialize mixin to print html
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "../dist/static/css/app.d14d1830d29d52e42b2acc5e4c1320f7.css",
    "vuetify/dist/vuetify.min.css"
  ]
};

Vue.use(VueHtmlToPaper, options);

// Initialize Firebase
var config = {
  // apiKey: "AIzaSyCMUJG7XoHEF9_wCEO89R0ss7s8N2x5JS8",
  // authDomain: "erapot-7a9c5.firebaseapp.com",
  // databaseURL: "https://erapot-7a9c5.firebaseio.com",
  // projectId: "erapot-7a9c5",
  // storageBucket: "erapot-7a9c5.appspot.com",
  // messagingSenderId: "234662287317",
  // timestampsInSnapshots: true,
  apiKey: "AIzaSyAWF__6oUBJjlRfeJ0GwkApHFIqrhgafOo",
  authDomain: "spa-erapot.firebaseapp.com",
  databaseURL: "https://spa-erapot.firebaseio.com",
  projectId: "spa-erapot",
  storageBucket: "spa-erapot.appspot.com",
  messagingSenderId: "762450954789",
  appId: "1:762450954789:web:3602e7eb8332837f"
};
Firebase.initializeApp(config);
export const db = Firebase.firestore();
export const FieldValue = Firebase.firestore.FieldValue;

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
  db,
  store,
  created() {
    this.$store.dispatch("school/GET_Data");
    this.$store.dispatch("teacher/GET_Data");
    this.$store.dispatch("student/GET_Data");
    this.$store.dispatch("kelas/GET_Data");
    this.$store.dispatch("mapel/GET_Data");
    this.$store.dispatch("jenisPenilaian/GET_Data");
  },
  el: "#app",
  components: { App },
  template: "<App/>",
  router
});
