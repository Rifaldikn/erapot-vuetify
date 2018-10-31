import { murid } from "../fake-data";

const state = {
  murid: murid
};

const getters = {
  // studentData: state => id => {
  //   console.log(state.murid.find(murid => murid.kelas == 5))
  //   return state.murid.find(murid => murid.kelas == 5);
    
  // },
  studentData: state => state.murid

};

const mutations = {
  SET_Data(state, murid) {
    Object.assign(state.murid, murid);
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
