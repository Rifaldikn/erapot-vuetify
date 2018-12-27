<template>
  <div>
    <v-layout>
      <v-container class="white" elevation-4>
        <v-toolbar-title>Daftar Nilai Siswa</v-toolbar-title>
        <v-layout wrap row align-center>
          <v-flex shrink xs2 pa-2>
            <v-select
              :items="kelas.map(a => a.kelas)"
              label="Kelas"
              v-model="assignForm.kelas"
              @change="searchPenilaian"
              outline
            ></v-select>
          </v-flex>

          <v-flex shrink xs3 pa-2>
            <v-select
              :items="kelas.map(a => a.kelas)"
              label="Tahun Ajaran"
              v-model="assignForm.tahunAjaran"
              @change="searchPenilaian"
              outline
            ></v-select>
          </v-flex>
          <v-flex xs3>
            <v-select
              :items="this.jenisPenilaian.map(a => a.jenis)"
              label="Jenis Penilaian"
              outline
              @change="searchPenilaian"
              v-model="assignForm.jenisPenilaian"
            ></v-select>
          </v-flex>
          <v-flex>
            <!-- <v-div> -->
            <v-btn
              class="text-xs-center"
              v-for="item in mapel"
              :key="item.subject"
              :value="item.subject"
              @click="assignForm.mapel = item.subject; searchPenilaian()"
              color="#1EA8AA"
              round
              dark
            >{{item.subject}}</v-btn>
            <!-- </v-div> -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>

    <v-container class="white">
      <v-subheader
        v-if="assignForm.kelas && assignForm.jenisPenilaian && assignForm.mapel"
        class="title red--text"
      >{{"Kelas " + assignForm.kelas + " / "}} {{assignForm.mapel + " / "}} {{assignForm.jenisPenilaian}}</v-subheader>
      <v-layout wrap row>
        <v-flex mt-2 row>
          <v-layout row>
            <v-select
              :items="this.jenisPenilaian.map(a => a.jenis)"
              label="Jenis Penilaian"
              outline
              v-model="add_penilaian"
            ></v-select>
            <v-btn color="red" dark class="mb-2" round>Tambah Penilaian</v-btn>
            <v-btn color="primary" dark class="mb-2" round>Cetak</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green" dark class="mb-2" round>Download Nilai</v-btn>
            <v-btn color="orange" dark class="mb-2" round>Upload Nilai</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
      <tabel/>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tabel from "./tabelNilai.vue";
export default {
  created() {
    this.kelas = this.$store.getters["kelas/classesData"];
    this.mapel = this.$store.getters["mapel/subjectData"];
    this.jenisPenilaian = this.$store.getters["jenisPenilaian/jenisPenilaian"];
  },
  components: {
    tabel
  },
  data: () => ({
    chipColors: [
      "#e7c7dc",
      "#e0b3e3",
      "#caa8dd",
      "#ab9cd0",
      "#9997d0",
      "#ffa7a7",
      "#e6acfb",
      "#ffde8f",
      "#838cff",
      "#0084b6",
      "#b882f1",
      "#e29df4",
      "#fa8585",
      "#fbadd4",
      "#f75cab"
    ],
    kelas: "",
    mapel: "",
    jenisPenilaian: "",
    add_penilaian: "",
    assignForm: {
      kelas: "",
      mapel: "",
      jenisPenilaian: ""
    }
  }),
  computed: {},
  methods: {
    chipColor() {
      var hexColor = Math.floor(Math.random() * 14);
      return this.chipColors[hexColor];
    },
    searchPenilaian() {
      if (
        this.assignForm.kelas != "" &&
        this.assignForm.jenisPenilaian != "" &&
        this.assignForm.mapel != ""
      ) {
        console.log(
          this.assignForm.kelas,
          this.assignForm.jenisPenilaian,
          this.assignForm.mapel
        );
      }
    },
    // addPenilaian(){
    //   this.dessert.forEach(element => {
        
    //   });
    // }
  }
};
</script>
