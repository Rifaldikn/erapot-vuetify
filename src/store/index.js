import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import school from './modules/school'
import teacher from './modules/teacher'
import kelas from './modules/kelas'
import student from './modules/student'
import mapel from './modules/mapel'
import jenisPenilaian from './modules/jenisPenilaian'
import penilaian from './modules/penilaian'
import laporan from './modules/laporan'
import users from './modules/users'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    school,
    teacher,
    kelas,
    student,
    mapel,
    jenisPenilaian,
    penilaian,
    laporan,
    users
  }
})
