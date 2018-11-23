import { db } from '../../main'
const state = {
  teachersData: []
}

const getters = {
  teachersData: state => state.teachersData
}

const mutations = {
  SET_Data(state, payload) {
    state.teachersData.push(payload)
  },
  INIT_Data(state, payload) {
    state.teachersData = payload
  }
}

const actions = {
  SET_Data({ commit }, payload) {
    console.log(payload)
    db.collection('teachers').doc(payload.nip).set(payload).then((data) => {
      commit('SET_Data', payload)
    })
      .catch((error) => {
        console.log(error)
      })
  },
  GET_Data({ commit }) {
    db.collection('teachers').get().then(snapshot => {
      var temp = []
      snapshot.forEach(doc => {
        // console.log(snapshot.doc.data())
        temp.push(doc.data())
      })
      console.log(temp)
      commit('INIT_Data', temp)
    }).catch((err) => {
      console.log('Error getting documents', err)
    })
  },
  UPDATE_Data({dispatch}, payload) {
    console.log(payload)
    db.collection("teachers").doc(payload.nip).get().then(function (doc) {
      if (doc && doc.exists) {
        // var data = doc.data();
        // saves the data to 'name'
        db.collection("teachers").doc(payload.nip).set(payload).then(() => {
          dispatch('GET_Data')
          alert("Edited")
          // db.collection("teachers").doc("name).delete();
        });
      }
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
