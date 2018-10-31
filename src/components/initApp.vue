<template>
    <v-app>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Konfigurasi Informasi Sekolah</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">Buat Akun Administrator</v-stepper-step>

                <v-divider></v-divider>

                <!-- <v-stepper-step step="3">Name of step 3</v-stepper-step> -->
            </v-stepper-header>

            <v-stepper-items>

                <v-stepper-content step="1">
                    <v-layout>
                        <v-container fluid>
                            <v-form v-model="valid">
                                <v-form v-model="valid">
                                    <v-container>
                                        <v-layout row wrap>
                                            <v-flex md6>
                                                <v-text-field v-model="schoolData.schoolName" label="Nama Sekolah" required>
                                                </v-text-field>
                                                <v-text-field v-model="schoolData.nspn" label="NPSN/NSN" required>
                                                </v-text-field>
                                                <v-text-field v-model="schoolData.address" label="Alamat" required>
                                                </v-text-field>
                                                <v-text-field v-model="schoolData.kelurahan" label="Desa/Kelurahan" required>
                                                </v-text-field>
                                                <v-text-field md6 v-model="schoolData.kecamatan" label="Kecamatan" required>
                                                </v-text-field>
                                            </v-flex>

                                            <v-flex md6>
                                                <v-text-field v-model="schoolData.kabupaten" label="Kabupaten/Kota" required>
                                                </v-text-field>
                                                 <v-text-field v-model="schoolData.provinsi" label="Provinsi" required>
                                                </v-text-field>
                                                <v-layout row wrap>
                                                    <v-flex xs6 md5 mr-auto>
                                                        <v-text-field v-model="schoolData.zip" label="Kode Pos" required>
                                                        </v-text-field>
                                                    </v-flex>
                                                    <v-flex xs6 md5>
                                                        <v-text-field v-model="schoolData.phone" label="Nomor Telepon" required>
                                                        </v-text-field>
                                                    </v-flex>
                                                </v-layout>
                                                <v-text-field md6 v-model="schoolData.email" label="Email" required>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-form>
                            </v-form>
                            <v-btn color="primary" @click="e1 = 2">
                                Continue
                            </v-btn>
                            <v-btn flat @click="">Cancel</v-btn>
                        </v-container>
                    </v-layout>

                </v-stepper-content>


                <v-stepper-content step="2">
                    <!-- <v-card class="mb-5" color="grey lighten-1" height="200px"> -->
                    <v-layout>
                        <v-container fluid>
                            <v-form v-model="valid">
                                <v-form v-model="valid">
                                    <v-container>
                                        <v-layout row wrap>
                                            <v-flex xs5>
                                                <v-text-field v-model="name" label="Nama Depan" required>
                                                </v-text-field>
                                                <v-text-field v-model="name" label="Nama Belakang" required>
                                                </v-text-field>
                                                <v-text-field v-model="name" label="Jenis Kelamin" required>
                                                </v-text-field>
                                                <v-text-field v-model="name" label="Tempat Lahir" required>
                                                </v-text-field>
                                                <v-text-field v-model="name" label="Tanggal Lahir" required>
                                                </v-text-field>

                                            </v-flex>

                                            <v-flex offset-xs1 xs6>
                                                <v-text-field v-model="name" label="Username" required>
                                                </v-text-field>
                                                <v-text-field v-model="name" label="Email" required>
                                                </v-text-field>
                                                <v-text-field v-model="name" label="Password" required>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-text-field v-model="name" label="Alamat" required>
                                        </v-text-field>
                                    </v-container>

                                </v-form>
                            </v-form>
                        </v-container>
                    </v-layout>
                    <!-- </v-card> -->

                    <v-btn color="primary" :loading="loading" @click="saveData()">
                        Save Data
                    </v-btn>

                    <v-btn flat @click="e1 = 1">Back</v-btn>
                </v-stepper-content>

                <!-- <v-stepper-content step="3">
                    <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>

                    <v-btn color="primary" @click="nextStep()">
                        Save
                    </v-btn>

                    <v-btn flat @click="e1 = 2">Back</v-btn>
                </v-stepper-content> -->
            </v-stepper-items>

        </v-stepper>
    </v-app>

</template>

<script>
// import axios from "axios";
import { mapGetters } from "vuex";


export default {
  data() {
    return {
      e1: 1,
      loading: false,
      schoolData: {
        schoolName: "",
        npsn: "",
        address: "",
        kelurahan: "",
        kecamatan: "",
        kabupaten: "",
        provinsi: "",
        zip: "",
        phone: "",
        email: ""
      }
    };
  },

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },

  methods: {
    onInput(val) {
      this.steps = parseInt(val);
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    saveData() {
      this.loading = true;
      if (confirm("Are u sure want to save data?")) {
        this.$store.commit("school/SET_Data", this.schoolData);
        setTimeout(() => {
          this.$router.push("/");
        }, 1500);
      } else {
      }
    }
  }
};
</script>