import { db } from "../../main";

const state = {
  daftar_penilaian: []
};

const getters = {
  daftar_penilaian: state => state.daftar_penilaian
};

const mutations = {
  LOAD_Data(state, payload) {
    state.daftar_penilaian = payload;
  },
  ADD_Penilaian(state, payload) {
    var students = payload.students;
  }
};

const actions = {
  async load_penilaian({ commit }, payload) {
    const kelas = payload.kelas,
      subject = payload.mapel;
    // console.log(kelas, subject);
    var daftar_nilai = [];
    await db
      .collection("daftar_penilaian")
      .doc(kelas)
      .collection(subject)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // console.log(doc.id, "=>", doc.data());
          daftar_nilai.push(doc.data());
        });
        // console.log(daftar_nilai);
        commit("LOAD_Data", daftar_nilai);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    // daftar_penilaian
    //   .getCollections()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       console.log(doc.id, "=>", doc.data());
    //     });
    //   })
    //   .catch(err => {
    //     console.log("Error getting documents", err);
    //   });

    // daftar_penilaian.getCollections().then(collections => {
    //   collections.forEach(collection => {
    //     console.log("Found subcollection with id:", collection.id);
    //   });
    // });
  },
  add_penilaian({ getters, commit, rootGetters }, payload) {
    const kelas = payload.kelas,
      subject = payload.mapel,
      jenis_penilaian = payload.penilaian;
    // var daftar_siswa = getters["student/studentData"].filter(e => e.kelas == kelas);
    var daftar_siswa = rootGetters["student/studentData"].filter(
      e => e.kelas == kelas
    );
    var daftar_penilaian = db
      .collection("daftar_penilaian")
      .doc(kelas)
      .collection(subject);
    console.log(getters.daftar_penilaian);
    if (!getters.daftar_penilaian[0] || !getters.daftar_penilaian[0][jenis_penilaian]) {
      daftar_siswa.forEach(siswa => {
        const new_penilaian = {
          nama: siswa.studentName,
          [jenis_penilaian]: [0]
        };
        daftar_penilaian
          .doc(siswa.studentName)
          .set(new_penilaian, { merge: true })
          .catch(error => {
            console.log(error);
          });
      });
    } else {
      getters.daftar_penilaian.forEach(nilai_siswa => {
        // nilai_siswa[subject].push(0)
        console.log(nilai_siswa);
        nilai_siswa[jenis_penilaian].push(0);
        daftar_penilaian
          .doc(nilai_siswa.nama)
          .update({ [jenis_penilaian]: nilai_siswa[jenis_penilaian] })
          .catch(error => {
            console.log(error);
          });
        // console.log(nilai_siswa[jenis_penilaian])
      });
    }
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
