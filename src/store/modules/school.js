import { db } from '../../main'
const state = {
  data: {}
}

const getters = {
  schoolData: state => state.data
}

const mutations = {
  SET_Data (state, schoolData) {
    state.data = schoolData
  }
}

const actions = {
  SET_Data ({ commit }, payload) {
    db.collection('school').doc('schoolData').set(payload)
      .then(() => {
        commit('SET_Data', payload)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  GET_Data ({ commit }) {
    db.collection('school').doc('schoolData').get().then((doc) => {
      if (doc.exists) {
        // localStorage.setItem('initialize', true)
        commit('SET_Data', doc.data())
      }
    }).catch((err) => {
      console.log('Error getting documents', err)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
