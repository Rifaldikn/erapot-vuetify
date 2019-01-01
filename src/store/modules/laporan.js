import { db } from "../../main";
const state = {
  hasilNilai: {}
};

const getters = {
  print: state => state.print,
  hasilNilai: state => state.hasilNilai
};

const mutations = {
  changePrint(state) {
    state.print = !state.print;
  },
  add_hasil_penilaian(state, payload) {
    Object.assign(state.hasilNilai, payload);
  }
};

const actions = {
  GET_Nilai({ commit }, payload) {
    // console.log(payload)
    const kelas = payload.kelas;
    const studentName = payload.student;
    const mapel = payload.mapel;
    var nilaiRef = db
      .collection("daftar_penilaian")
      .doc(kelas)
      .collection(mapel)
      .doc(studentName);

    nilaiRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data:", doc.id, doc.data());
          var data = doc.data();
          var temp = {};
          for (const key in data) {
            if (data.hasOwnProperty(key) && key != "nama") {
              var total = data[key].reduce(function(total, num) {
                return total + num;
              });
              total = total / data[key].length;
              temp[key] = total;
            }
          }
          console.log(temp);
          commit("add_hasil_penilaian", { [mapel]: temp });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
