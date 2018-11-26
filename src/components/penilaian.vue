<template>
  <div>
    <v-layout>
      <v-container class="white" elevation-4>
        <v-toolbar-title>Daftar Nilai Siswa</v-toolbar-title>
        <v-layout wrap row align-center>
          <!-- <v-container fluid> -->
          <v-flex shrink xs2 pa-2>
            <!-- <v-container> -->
            <v-select
              :items="this.kelas.map(a => a.kelas)"
              label="Kelas"
              outline
            ></v-select>
            <!-- </v-container> -->
          </v-flex>
          <!-- </v-container> -->
          <!-- <v-container> -->
          <v-flex shrink xs3 pa-2>
            <!-- <v-container> -->
            <v-select
              :items="this.kelas.map(a => a.kelas)"
              label="Tahun Ajaran"
              outline
            ></v-select>
            <!-- </v-container> -->
          </v-flex>
          <!-- </v-container> -->
          <v-flex shrink xs7>
            <!-- <v-container> -->
            <v-layout wrap row>
              <div
                class="text-xs-center"
                v-for="item in mapel"
                :key="item.subject"
                items="mapel"
              >
                <v-chip :color="chipColor()" text-color="white">{{
                  item.subject
                }}</v-chip>
              </div>
            </v-layout>
            <!-- </v-container> -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <v-layout class="white">
      <v-container>
        <v-subheader class="title red--text"
          >Kelas 3</span></v-subheader
        >
        <v-layout wrap row>
          <v-flex xs3
            ><v-select
              :items="this.jenisPenilaian.map(a => a.jenis)"
              label="Jenis Penilaian"
              outline
            >
            </v-select>
          </v-flex>
          <v-flex mt-2>
            <v-btn color="primary" dark class="mb-2">Tambah Penilaian</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  // import matapelajaranVue from "./matapelajaran.vue";
  export default {
    data: () => ({
      assignForm: "",
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
      ]
    }),
    computed: {
      kelas() {
        return this.$store.getters["kelas/classesData"];
      },
      mapel() {
        return this.$store.getters["mapel/subjectData"];
      },
      jenisPenilaian() {
        return this.$store.getters["jenisPenilaian/jenisPenilaian"];
      }
    },
    methods: {
      chipColor() {
        var hexColor = Math.floor(Math.random() * 14);
        console.log(hexColor);
        return this.chipColors[hexColor];
      }
    }
  };
</script>
