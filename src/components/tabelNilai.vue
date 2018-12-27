<template>
  <div>
    <v-data-table :headers="headers" :items="desserts" :loading="isloading">
      <template slot="items" slot-scope="props">
        <td v-for="(value, key) in props.item">
          <v-edit-dialog
            v-if="key != 'name'"
            :return-value.sync.number="props.item[key] "
            lazy
            v-on="{ click: key != 'name' ? open : null }"
            @save="save"
            @cancel="cancel"
            @close="close"
          >
            {{ value }}
            <v-text-field
              slot="input"
              v-model.number="props.item[key]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </v-edit-dialog>
          <div v-else>{{value}}</div>
        </td>
      </template>
      <template slot="footer">
        <td v-for="(header, key) in headers" v-if="header.text != 'Nama'">
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
      pagination: {},
      isloading: false,
      headers: [
        {
          text: "Nama",
          value: "nama"
        },
        { text: "UAS", value: "uas1" },
        { text: "UTS", value: "uts" },
        { text: "Ulangan Harian 1", value: "uh1" },
        { text: "Ulangan Harian 2", value: "uh2" },
        { text: "Tugas Harian 1", value: "th1" }
      ],
      desserts: [
        {
          nama: "Rifaldi Kusnawan",
          uas1: 100,
          uts: 90,
          uh1: 80,
          uh2: 70,
          th1: 60
        },
        {
          nama: "Genjiee",
          uas1: 100,
          uts: 90,
          uh1: 80,
          uh2: 70,
          th1: 60
        }
      ]
    };
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
      console.log(key);
      this.$delete(this.finds, index);
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
        console.log(v)
        delete v[key];
      });
    }
  }
};
</script>