import Vue from 'vue'
import Vuex from 'vuex'
// import {db} from "../main"
import app from './modules/app'
import school from './modules/school'
import teacher from './modules/teacher'
import kelas from './modules/kelas'
import student from './modules/student'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    school,
    teacher,
    kelas,
    student
  }
})
