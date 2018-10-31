import Vue from "vue";
import Vuex from "vuex";
// import createLogger from '../../../src/plugins/logger'
import app from "./modules/app";
import school from "./modules/school";
import teacher from "./modules/teacher";
import kelas from "./modules/kelas";
import student from "./modules/student";

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app,
    school,
    teacher,
    kelas,
    student
  }
});
