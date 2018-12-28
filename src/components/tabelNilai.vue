<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="isloading"
      :rows-per-page-items="pagination.rowsPerPageItems"
      :total-items="pagination.totalItems"
      :pagination.sync="pagination"
    >
      <template slot="header" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text">{{ header.text }}</th>
        </tr>
      </template>

      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{props.item.nama}}</td>
        <td class="text-xs-left" v-for="(nilai, kunci) in props.item" v-if="kunci != 'nama'">
          <!-- <span v-for="(value, index) in nilai" :key="index">{{props.item[kunci][index]}}</span> -->
          <v-edit-dialog
            v-for="(value, index) in nilai"
            :key="index"
            :return-value.sync="props.item[kunci][index]"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            {{ value }}
            <v-text-field
              slot="input"
              v-model="props.item[kunci][index]"
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
          {{index}}
          <v-tooltip bottom>
            <span>Delete nilai {{header.text}}</span>
          </v-tooltip>
          <v-btn slot="activator" icon flat color="red" @click="deleteKolom(header.value)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
        <td v-else></td>
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
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
      isloading: false,
      headers: [
        {
          text: "Nama",
          value: "nama",
          sortable: false
        },
        { text: "UAS", value: "uas1", align: "left" }
      ]
      // desserts: [
      //   { UAS: [0], nama: "Adhwa Naqila Aldean" },
      //   { UAS: [0], nama: "Rex Kim" }
      // ]
    };
  },
  computed: {
    pagination() {
      return {
        page: 1,
        rowsPerPage: 50, // -1 for All
        totalItems: this.desserts.length,
        rowsPerPageItems: [10, 25, 50, 100]
      };
    },
    desserts() {
      return this.$store.getters["penilaian/daftar_penilaian"];
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
</style>
