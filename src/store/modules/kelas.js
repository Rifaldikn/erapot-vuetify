import { kelas } from "../fake-data";

const state = {
  kelas: kelas
};

const getters = {
  dataKelas: state => state.kelas
};

const mutations = {
  SET_Data(state, kelas) {
    Object.assign(state.kelas, kelas);
  }
};

const actions = {
  
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
