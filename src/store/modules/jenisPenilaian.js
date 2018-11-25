import { db } from '../../main';
const state = {
  jenisPenilaian: []
}

const getters = {
  jenisPenilaian: state => state.jenisPenilaian
}

const mutations = {
  SET_Data (state, payload) {
    state.jenisPenilaian.push(payload)
  },
  INIT_Data (state, payload) {
    state.jenisPenilaian = payload
  }
}

const actions = {
  SET_Data ({ commit }, payload) {
    // console.log(payload)
    var keyId = '';
    while (keyId.length < 6) {
      var k = Math.random() * 122 + 48
      if (k > 48 && k < 57) {
        keyId += String.fromCharCode(k)
        k++
      } else if (k > 65 && k < 90) {
        keyId += String.fromCharCode(k)
        k++
      }
    }
    // console.log("Primary Key: " + primaryKey)

    db.collection('jenisPenilaian')
      .doc(payload.jenis)
      .set(payload)
      .then(data => {
        commit('SET_Data', payload)
      })
      .catch(error => {
        console.log(error)
      })
  },
  GET_Data ({ commit }) {
    db.collection('jenisPenilaian')
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
    console.log(payload.old.jenis)
    db.collection('jenisPenilaian')
      .doc(payload.old.jenis)
      .delete()
      .then(() => {
        db.collection('jenisPenilaian')
            .doc(payload.new.jenis)
            .set(payload.new)
            .then(() => {
              dispatch('GET_Data')
              alert('Edited')
            })
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
  },
  DELETE_Data ({ dispatch }, payload) {
    // console.log(payload)
    db.collection('jenisPenilaian')
      .doc(payload)
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
