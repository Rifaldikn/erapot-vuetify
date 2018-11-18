<template>
    <v-app>
        <v-container>
            <v-layout row>
                    <v-container>
                    <v-flex xs12>
                        <v-select :items="kelas.map(a => a.kelas).sort()" label="Kelas" v-model="assignForm.mataPelajaran" box
                            dense required="true"></v-select>
                    </v-flex>
                    <v-flex xs12>
                        <v-select :items="mataPelajaran" label="Mata Pelajaran" v-model="assignForm.kelas"
                            dense box required="true"></v-select>
                    </v-flex>
                </v-container>
                <v-container>
                    <v-flex xs12>
                        <v-select :items="smtr" label="Semester" v-model="assignForm.smtr"
                            dense box required="true"></v-select>
                    </v-flex>
                    <v-flex xs12>
                        <v-select :items="tahunAjaran" label="Tahun Ajar" v-model="assignForm.tahunAjaran"
                            dense box required="true"></v-select>
                    </v-flex>
                </v-container>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    desserts: [],
    editedIndex: -1,
    // editedItem: {
    //   kelas: 0,

    // },
    // defaultItem: {
    //   jenis: "",
    //   persentase: 0,
    //   keterangan: ""
    // }
    assignForm: {
      kelas: 0,
      mataPelajaran: "",
      smtr: "",
      tahunPelajaran: ""
    },
    mataPelajaran: ["IPA", "IPS", "B. Indonesia", "PPKN"],
    tahunAjaran: ["2014/2015", "2015/2016", "2016/2017", "2017/2018"],
    smtr: [1, 2]
  }),
  computed: {
    ...mapGetters({
      kelas: "kelas/dataKelas"
    })
  }
};
</script>