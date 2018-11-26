import { db } from '../../main'
const state = {
  classesData: []
}

const getters = {
  classesData: state => state.classesData
}

const mutations = {
  SET_Data (state, payload) {
    state.classesData.push(payload)
  },
  INIT_Data (state, payload) {
    state.classesData = payload
  }
}

const actions = {
  SET_Data ({ commit }, payload) {
    // console.log(payload)
    var primaryKey = ''
    while (primaryKey.length < 6) {
      var k = Math.random() * 122 + 48
      if (k > 48 && k < 57) {
        primaryKey += String.fromCharCode(k)
        k++
      } else if (k > 65 && k < 90) {
        primaryKey += String.fromCharCode(k)
        k++
      }
    }
    // console.log("Primary Key: " + primaryKey)

    db.collection('classes')
      .doc(payload.kelas)
      .set(payload)
      .then(data => {
        commit('SET_Data', payload)
      })
      .catch(error => {
        console.log(error)
      })
  },
  GET_Data ({ commit }) {
    db.collection('classes')
      .get()
      .then(snapshot => {
        var temp = []
        snapshot.forEach(doc => {
          temp.push(doc.data())
        })
        // console.log(temp)
        commit('INIT_Data', temp)
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
  },
  UPDATE_Data ({ dispatch }, payload) {
    // console.log(payload)
    db.collection('classes')
      .doc(payload.kelas)
      .get()
      .then(function (doc) {
        if (doc && doc.exists) {
          db.collection('classes')
            .doc(payload.kelas)
            .set(payload)
            .then(() => {
              dispatch('GET_Data')
              alert('Edited')
            })
        }
      })
  },
  DELETE_Data ({ dispatch }, payload) {
    // console.log(payload)
    db.collection('classes')
      .doc(payload.kelas)
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
