<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>Daftar Murid</v-toolbar-title>
      <!-- <v-divider class="mx-2" inset vertical></v-divider> -->
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="720px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Tambah Murid</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field v-model="editedItem.nis" label="NIS" :disabled="editedIndex > -1"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="editedItem.nisn" label="NISN" :disabled="editedIndex > -1"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12>
                  <v-text-field v-model="editedItem.studentName" label="NAMA"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="editedItem.birthPlace" label="TEMPAT LAHIR"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="editedItem.birthDate" label="TANGGAL LAHIR"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select :items="formITems.gender" label="Jenis Kelamin" v-model="editedItem.gender" dense box
                    required="true"></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select :items="kelas.map(a => a.kelas).sort()" label="Kelas" v-model="editedItem.kelas" dense box required="true"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="primary darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="desserts" hide-actions>
      <template slot="items" slot-scope="props">
        <td>{{props.item.kelas }}</td>
        <td>{{ props.item.nis }}</td>
        <td class="text-xs-left">{{ props.item.nisn }}</td>
        <td class="text-xs-">{{ props.item.studentName}}</td>
        <td class="text-xs-">{{ props.item.gender}}</td>
        <td class="text-xs-left">{{ props.item.birthPlace + ", "+ props.item.birthDate }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Kelas", value: "kelas" },
      {
        text: "NIS",
        align: "left",
        // sortable: false,
        value: "nisn"
      },
      {
        text: "NISN",
        align: "left",
        // sortable: false,
        value: "nisn"
      },
      { text: "Nama", value: "studentName" },
      { text: "Jenis Kelamin", value: "gender" },
      { text: "TTL", value: "ttl" },
      { text: "Actions", value: "name", sortable: false, align: "center" }
    ],
    // desserts: [],
    editedIndex: -1,
    editedItem: {
      nis: "",
      nisn: "",
      birthPlace: "",
      birthDate: "",
      studentName: "",
      gender: "",
      kelas: ""
    },
    defaultItem: {
      nis: "",
      nisn: "",
      birthPlace: "",
      birthDate: "",
      studentName: "",
      gender: "",
      kelas: ""
    },
    formITems: {
      gender: ["Laki - Laki", "Perempuan"]
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah murid" : "Edit murid";
    },
    // ...mapGetters("student", {
    //   desserts: "studentsData"
    // }),
    ...mapGetters("kelas", {
      kelas: "classesData"
    }),
    desserts() {
      if (!this.$route.params.id) {
        return this.$store.getters["student/studentData"];
      } else {
        return this.$store.getters["student/studentData"].filter(
          e => e.kelas == this.$route.params.id
        );
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      // const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        // this.desserts.splice(index, 1);
        this.$store.dispatch("student/DELETE_Data", item)
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.$store.dispatch("student/UPDATE_Data", this.editedItem)
      } else {
        // this.account = this.username;
        // this.desserts.push(this.editedItem);
        console.log("add new")
        this.$store.dispatch("student/SET_Data", this.editedItem)

      }
      this.close();
    }
  }
};
</script>