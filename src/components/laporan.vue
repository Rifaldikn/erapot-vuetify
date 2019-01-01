<template>
  <div>
    <v-layout class="hidden">
      <v-container fluid class="white" elevation-4>
        <v-toolbar-title>Laporan Capaian Kompetensi Peserta Didik</v-toolbar-title>
        <v-layout wrap row align-center>
          <v-flex shrink xs2 pa-2>
            <v-select
              :items="kelas"
              item-text="kelas"
              label="Kelas"
              v-model="assignForm.kelas"
              @change="searchPenilaian"
              return-object
              outline
            ></v-select>
          </v-flex>
          <v-flex shrink xs3 pa-2>
            <v-select
              :items="students"
              item-text="studentName"
              v-model="assignForm.student"
              label="Nama Siswa"
              return-object
              outline
            ></v-select>
          </v-flex>
          <v-flex mb-4>
            <v-btn color="primary" dark round @click="print">Cetak Nilai</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <v-container fluid class="white" align-center justify-center id="printMe">
      <v-layout class column align-center justify-center>
        <h1>{{schoolData.schoolName}}</h1>
        <h1>Laporan Nilai Siswa</h1>
      </v-layout>
      <v-container fluid mt-5>
        <v-layout row mb-4>
          <v-flex xs2>
            <div class="subheading">Nama Peserta Didik</div>
            <div class="subheading">Nomor Induk/NISN</div>
            <div class="subheading">Kelas</div>
            <div class="subheading">Wali Kelas</div>
          </v-flex>
          <v-flex>
            <div class="subheading font-weight-medium">: {{assignForm.student.studentName}}</div>
            <div
              class="subheading font-weight-medium"
            >: {{assignForm.student.nis}} / {{assignForm.student.nisn}}</div>
            <div class="subheading font-weight-medium">: {{assignForm.student.kelas}}</div>
            <div class="subheading font-weight-medium">: {{assignForm.kelas.waliKelas}}</div>
          </v-flex>
        </v-layout>
        <div>
          <v-layout row wrap align-center justify-center>
            <table class="black--text">
              <thead>
                <tr>
                  <th class="numberTable"></th>
                  <th class="mapel">Mata Pelajaran</th>
                  <th>KKM</th>
                  <th v-for="jenis in jenisPenilaian">{{jenis.jenis}}</th>
                  <th>Nilai Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, index) in nilai">
                  <td class="numberTable">{{index+1}}</td>
                  <td class="mapel">{{value.subject}}</td>
                  <td>{{value.passGrade}}</td>
                  <td v-for="jenis in jenisPenilaian">{{value.jenis}}</td>
                  <td>{{value.totalNilai}}</td>
                </tr>
              </tbody>
            </table>
          </v-layout>
        </div>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    assignForm: {
      kelas: "",
      student: ""
    },
    nilai: []
  }),
  computed: {
    schoolData() {
      return this.$store.getters["school/schoolData"];
    },
    kelas() {
      return this.$store.getters["kelas/classesData"];
    },
    students() {
      return this.$store.getters["student/studentData"].filter(
        e => e.kelas == this.assignForm.kelas.kelas
      );
    },
    jenisPenilaian() {
      return this.$store.getters["jenisPenilaian/jenisPenilaian"];
    },
    mapel() {
      return this.$store.getters["mapel/subjectData"];
    }
  },
  methods: {
    print() {
      this.$htmlToPaper("printMe");
    },
    searchPenilaian() {
      if (this.students == undefined) {
        this.assignForm.kelas = {};
      } else {
        var temp = [];
        this.mapel.forEach(mpl => {
          var nilaiMpl = {};
          Object.assign(nilaiMpl, mpl);
          temp.push(nilaiMpl);
        });
        this.nilai = temp;
      }
    }
  }
};
</script>


<style scoped>
table {
  border-radius: 3px;
  background-color: #42b983;
}

th {
  color: rgb(255, 255, 255);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.mapel {
  min-width: 400px !important;
}

td {
  background-color: #ffffff;
}

td:not(.mapel) {
  text-align: center;
}

.warning td {
  background-color: rgb(243, 139, 139);
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

.numberTable {
  max-width: 5px !important;
  min-width: 5px;
  text-align: left;
}

/* th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
} */

/* .arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
} */
</style>

