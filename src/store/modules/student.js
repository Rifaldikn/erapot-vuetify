import { db } from '../../main';
const state = {
  studentsData: []
}

const getters = {
  studentData: state => state.studentsData
}

const mutations = {
  SET_Data (state, payload) {
    state.studentsData.push(payload)
  },
  INIT_Data (state, payload) {
    state.studentsData = payload
  }
}

const actions = {
  SET_Data ({ commit }, payload) {
    // console.log(payload)
    db.collection('students')
      .doc(payload.nis)
      .set(payload)
      .then(data => {
        commit('SET_Data', payload)
      })
      .catch(error => {
        console.log(error)
      })
  },
  GET_Data ({ commit }) {
    db.collection('students')
      .get()
      .then(snapshot => {
        var temp = []
        snapshot.forEach(doc => {
          // console.log(snapshot.doc.data())
          temp.push(doc.data())
        })
        console.log(temp)
        commit('INIT_Data', temp)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
  },
  UPDATE_Data ({ dispatch }, payload) {
    // console.log(payload)
    db.collection('students')
      .doc(payload.nis)
      .get()
      .then(function (doc) {
        if (doc && doc.exists) {
          // var data = doc.data();
          // saves the data to 'name'
          db.collection('students')
            .doc(payload.nis)
            .set(payload)
            .then(() => {
              dispatch('GET_Data')
              alert('Edited')
              // db.collection("students").doc("name).delete();
            })
        }
      })
  },
  DELETE_Data ({ dispatch }, payload) {
    console.log(payload)
    db.collection('students')
      .doc(payload.nis)
      .delete()
      .then(() => {
        dispatch('GET_Data')
        alert('Deleted')
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
