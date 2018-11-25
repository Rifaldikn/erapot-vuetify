<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>Daftar Kelas</v-toolbar-title>
      <!-- <v-divider class="mx-2" inset vertical></v-divider> -->
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="420px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Tambah Kelas</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.kelas" label="Kelas" :disabled="!editedItem > -1"></v-text-field>
                  
                  <v-select
                    :items="this.teacher.map(a => a.teacherName)"
                    label="Wali Kelas"
                    v-model="editedItem.waliKelas"
                  ></v-select>
               
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
        <td>{{ props.item.kelas }}</td>
        <td>{{ props.item.siswa }}</td>
        <td>{{ props.item.waliKelas }}</td>
        <td class="justify-center layout px-0">
          <v-btn color="success" @click="lihatKelas(props.item.kelas)">Lihat Siswa</v-btn>
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
      <!-- <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template> -->
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
      { text: "Jumlah Siswa", value: "siswa" },
      { text: "Wali Kelas", value: "siswa" },
      { text: "Actions", value: "name", sortable: false, align: "center" }
    ],
    // desserts: [],
    editedIndex: -1,
    editedItem: {
      // siswa: 0,
      kelas: "",
      waliKelas: ""
    },
    defaultItem: {
      // siswa: 0,
      kelas: "",
      waliKelas: ""
    }
  }),
  computed: {
    ...mapGetters("kelas", {
      desserts: "classesData"
    }),
    ...mapGetters("teacher", {
      teacher: "teachersData"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Kelas" : "Edit Kelas";
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
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1
      }, 300);
    },
    lihatKelas(idkelas) {
      this.$router.push("/admin/siswa/kelas/" + idkelas);
    },
    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch("kelas/UPDATE_Data", this.editedItem);

        // Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        // this.account = this.username;
        // this.desserts.push(this.editedItem);
        this.$store.dispatch("kelas/SET_Data", this.editedItem);
      }
      this.close();
    }
  }
};
</script>