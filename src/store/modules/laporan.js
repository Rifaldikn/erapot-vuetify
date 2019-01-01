import { db } from "../../main";
const state = {
  print: false
};

const getters = {
  print: state => state.print
};

const mutations = {
  changePrint(state) {
    state.print = !state.print;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
