import Vue from 'vue'
import * as Firebase from 'firebase'
import store from './store'
import router from './router'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCMUJG7XoHEF9_wCEO89R0ss7s8N2x5JS8',
  authDomain: 'erapot-7a9c5.firebaseapp.com',
  databaseURL: 'https://erapot-7a9c5.firebaseio.com',
  projectId: 'erapot-7a9c5',
  storageBucket: 'erapot-7a9c5.appspot.com',
  messagingSenderId: '234662287317',
  timestampsInSnapshots: true
}
Firebase.initializeApp(config)
export const db = Firebase.firestore()

Vue.use(Vuetify, {
  theme: {
    primary: '#7849BB',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  iconfont: 'fa'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  db,
  store,
  created() {
    this.$store.dispatch('school/GET_Data')
    this.$store.dispatch('teacher/GET_Data')
    this.$store.dispatch('student/GET_Data')
  },
  el: '#app',
  components: { App },
  template: '<App/>',
  router

})
