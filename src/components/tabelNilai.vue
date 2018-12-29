<template>
  <div>
    <!-- <v-layout> -->
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="isloading"
      :rows-per-page-items="pagination.rowsPerPageItems"
      :total-items="pagination.totalItems"
      :pagination.sync="pagination"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.value"
            @click="changeSort(header.value)"
          >{{ header.text }}</th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{props.item.nama}}</td>
        <td class="text-xs-center" v-for="(value , key) in props.item" v-if="key != 'nama'">
          <v-edit-dialog
            :return-value.sync="props.item[key]"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            {{ value }}
            <v-text-field
              slot="input"
              v-model="props.item[key]"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>

      <template slot="footer">
        <td v-for="(header,index, key) in headers" v-if="header.value != 'nama'">
          <v-tooltip bottom>
            <span>Delete nilai {{header.text}}</span>
          </v-tooltip>
          <v-btn slot="activator" dark color="red" @click="deleteKolom(header.value)">
            <!-- <v-icon>delete</v-icon> -->
            Hapus
          </v-btn>
        </td>
        <td v-else></td>
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
    <!-- </v-layout> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: v => v.length <= 25 || "Input too long!",
      isloading: false

      // desserts: [
      //   { UAS: [0], nama: "Adhwa Naqila Aldean" },
      //   { UAS: [0], nama: "Rex Kim" }
      // ]
    };
  },
  computed: {
    pagination() {
      const y = {
        page: 1,
        rowsPerPage: 50, // -1 for All
        totalItems: this.desserts.length,
        rowsPerPageItems: [10, 25, 50, 100]
      };
      return y;
    },
    desserts() {
      var temp = [];
      var daftar_penilaian = this.$store.getters["penilaian/daftar_penilaian"];
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
        console.log("nilai", nilai);
        temp.push(nilai);
        console.log("temp", temp);
      });

      return temp;
    },
    headers() {
      // headers: [
      //   {
      //     text: "Nama",
      //     value: "nama",
      //     sortable: false
      //   }
      // ]
      var temp = [];
      var x = this.$store.getters["penilaian/daftar_penilaian"][0];
      console.log(x);
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
      return temp;
    }
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open(key) {
      if (key != "name") {
        this.snack = true;
        this.snackColor = "info";
        this.snackText = "Dialog opened";
      }
    },
    close() {
      // console.log("Dialog closed");
    },
    deleteKolom(key) {
      // console.log(key);
      this.headers.splice(this.headers.findIndex(item => item.value == key), 1);
      this.desserts.forEach((v, index) => {
        // console.log(v);
        delete v[key];
      });
    }
  }
};
</script>

<style>
td {
  width: 100;
}
</style>
