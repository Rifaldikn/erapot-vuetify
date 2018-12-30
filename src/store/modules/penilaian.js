import { db, FieldValue } from "../../main";
// var FieldValue = db.FieldValue;

const state = {
  daftar_penilaian: [],
  headers: [],
  desserts: [],
  kelas: "",
  mapel: ""
};

const getters = {
  daftar_penilaian: state => state.daftar_penilaian,
  desserts: state => state.desserts,
  headers: state => state.headers,
  kelas: state => state.kelas,
  mapel: state => state.mapel
};
const mutations = {
  LOAD_Data(state, payload) {
    state.daftar_penilaian = payload;
  },
  SET_Mapel(state, payload) {
    state.mapel = payload;
  },
  SET_Kelas(state, payload) {
    state.kelas = payload;
  },
  // ADD_Penilaian(state, payload) {
  //   state.students = payload.students;
  // },
  LOAD_Headers(state) {
    var temp = [];
    var x = state.daftar_penilaian[0];
    // console.log(x);
    for (let key in x) {
      if (key == "nama") {
        temp.unshift({
          text: "Nama Siswa",
          value: key,
          sortable: false,
          width: "10%"
        });
      } else {
        x[key].forEach((element, index) => {
          temp.push({
            text: `${key} ${index + 1}`,
            value: `${key}${index}`,
            align: "left",
            sortable: true
          });
        });
      }
    }
    state.headers = temp;
  },
  LOAD_Desserts(state) {
    var temp = [];
    var daftar_penilaian = state.daftar_penilaian;
    daftar_penilaian.forEach(list => {
      var nilai = {};
      for (let key in list) {
        if (key == "nama") {
          // nilai.unshift({
          nilai[key] = list[key];
          // });
        } else {
          list[key].forEach((element, index) => {
            // nilai.push({
            nilai[`${key}${index}`] = element;
            // });
          });
        }
      }
      // console.log("nilai", nilai);
      temp.push(nilai);
      // console.log("temp", temp);
    });
    state.desserts = temp;
  }
};

const actions = {
  async delete_penilaian({ state, dispatch }, payload) {
    const kelas = state.kelas,
      subject = state.mapel;
    var daftar_penilaian = db
      .collection("daftar_penilaian")
      .doc(kelas)
      .collection(subject);
    await state.daftar_penilaian.forEach(element => {
      const index_jenis_penilaian = payload.slice(
        payload.length - 1,
        payload.length
      );
      const jenis_penilaian = payload.slice(0, payload.length - 1);
      var deleted = {};
      console.log(element[jenis_penilaian].length);
      if (element[jenis_penilaian].length <= 1) {
        console.log("atas");
        daftar_penilaian
          .doc(element.nama)
          .update({ [jenis_penilaian]: FieldValue.delete() })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log(index_jenis_penilaian, jenis_penilaian);
        element[jenis_penilaian].splice(index_jenis_penilaian, 1);
        deleted[jenis_penilaian] = element[jenis_penilaian];
        console.log("bawah");
        daftar_penilaian
          .doc(element.nama)
          .update(deleted)
          .catch(error => {
            console.log(error);
          });
      }
    });
    dispatch("load_penilaian", {
      kelas: kelas,
      mapel: subject
    });
    alert(
      `${payload.slice(
        0,
        payload.length - 1
      )} pada ${subject} di Kelas ${kelas} telah dihapus!`
    );
  },
  async update_data({ commit, state, dispatch }, payload) {
    const kelas = state.kelas,
      subject = state.mapel;
    var daftar_penilaian = db
      .collection("daftar_penilaian")
      .doc(kelas)
      .collection(subject);
    await state.desserts.forEach(nilai_siswa => {
      var obj = {};
      // console.log(nilai_siswa);
      for (let key in nilai_siswa) {
        if (key == "nama") {
          obj[key] = nilai_siswa[key];
        } else {
          const index_jenis_penilaian = key.slice(key.length - 1, key.length);
          const jenis_penilaian = key.slice(0, key.length - 1);
          if (!obj[jenis_penilaian]) {
            obj[jenis_penilaian] = [];
          }
          obj[jenis_penilaian].push(Number(nilai_siswa[key]));
        }
      }
      daftar_penilaian
        .doc(nilai_siswa.nama)
        .update(obj)
        .catch(error => {
          console.log(error);
        });
    });
    dispatch("load_penilaian", {
      kelas: kelas,
      mapel: subject
    });
    // console.log("updated", temp);
    alert("Data Sudah Tersimpan");
  },
  async load_penilaian({ commit, state }, payload) {
    const kelas = payload.kelas,
      subject = payload.mapel;
    commit("SET_Kelas", kelas);
    commit("SET_Mapel", subject);
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
        commit("LOAD_Desserts");
        commit("LOAD_Headers");
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
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
    // console.log(getters.daftar_penilaian);
    if (
      !getters.daftar_penilaian[0] ||
      !getters.daftar_penilaian[0][jenis_penilaian]
    ) {
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
        // console.log(nilai_siswa);
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
