<template>
  <div app>
    <v-container grid-list-xl fluid>
      <v-layout row wrap class="white">
        <v-flex sm6 xs12>
          <div class="headline primary--text">Data Sekolah</div>
          <v-layout row>
            <v-flex xs4 class="font-weight-medium subheading">
              <div>Nama Sekolah</div>
              <div>NPSN</div>
              <div>Alamat</div>
              <div>Desa/Kelurahan</div>
              <div>Kecamatan</div>
              <div>Kabupaten/kota</div>
              <div>Provinsi</div>
              <div>Kode Pos</div>
              <div>No. Telepon</div>
            </v-flex>
            <v-flex xs8 class="subheading">
              <div>: {{schoolData.schoolName}}</div>
              <div>: {{schoolData.npsn}}</div>
              <div>: {{schoolData.address}}</div>
              <div>: {{schoolData.kelurahan}}</div>
              <div>: {{schoolData.kecamatan}}</div>
              <div>: {{schoolData.kabupaten}}</div>
              <div>: {{schoolData.provinsi}}</div>
              <div>: {{schoolData.zip}}</div>
              <div>: {{schoolData.phone}}</div>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex sm6>
          <v-container class="justify-center align-center">
            <v-layout row wrap>
              <v-flex xs6>
                <mini-statistic
                  icon="fas fa-chalkboard-teacher"
                  :title="teachersData.length"
                  sub-title="GURU"
                  color="indigo"
                  path="/admin/guru"
                ></mini-statistic>
              </v-flex>
              <v-flex xs6>
                <mini-statistic
                  icon="fas fa-users"
                  :title="studentData.length"
                  sub-title="SISWA"
                  color="red"
                  path="/admin/siswa"
                ></mini-statistic>
              </v-flex>
              <v-flex xs6>
                <mini-statistic
                  icon="meeting_room"
                  :title="classesData.length"
                  sub-title="KELAS"
                  color="light-blue"
                  path="/admin/kelas"
                ></mini-statistic>
              </v-flex>
              <v-flex xs6>
                <mini-statistic
                  icon="fas fa-clipboard-list"
                  :title="subjectData.length"
                  sub-title="MAPEL"
                  color="purple"
                  path="/admin/mataplejaran"
                ></mini-statistic>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MiniStatistic from "./mini-statistic.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    MiniStatistic
  },
  computed: {
    ...mapGetters("school", ["schoolData"]),
    ...mapGetters("kelas", {
      classesData: "classesData"
    }),
    ...mapGetters("teacher", {
      teachersData: "teachersData"
    }),
    ...mapGetters("student", {
      studentData: "studentData"
    }),
    ...mapGetters("mapel", {
      subjectData: "subjectData"
    })
  }
};
</script>