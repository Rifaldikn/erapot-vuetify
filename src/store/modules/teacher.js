import { guru } from "../fake-data";

const state = {
  teachers: guru
};

const getters = {
  teachersData: state => state.teachers
};

const mutations = {
//   INIT_Data(state) {
//     Object.assign(state.teachers, this.guru)
//   },
  SET_Data(state, guru) {
    Object.assign(state.teachers, this.teachers);
  }
};

const actions = {
  //   SET_Data ({ commit }) {
  //     commit('SET_Data', schoolData)
  //   }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
