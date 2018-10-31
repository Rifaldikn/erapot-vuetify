const state = {
    // schoolName: '',
    // nspn: '',
    // address: '',
    // kelurahan: '',
    // kecamatan: '',
    // kabupaten: '',
    // kota: '',
    // provinsi: '',
    // zip: '',
    // phone: ''
}

const getters = {
  schoolData: state => state
}

const mutations = {
  SET_Data (state, schoolData) {
    Object.assign(state, schoolData)
  }
}

const actions = {
//   SET_Data ({ commit }) {
//     commit('SET_Data', schoolData)
//   }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }