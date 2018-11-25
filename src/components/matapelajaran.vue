<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>Daftar Mata Pelajaran</v-toolbar-title>
      <!-- <v-divider class="mx-2" inset vertical></v-divider> -->
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="720px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Tambah Mata Pelajaran</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field v-model="editedItem.subject" label="Mata Pelajaran" :disabled="!editedItem > -1"></v-text-field>
                </v-flex>
                 <v-flex xs12 sm6>
                  <v-text-field v-model="editedItem.passGrade" label="KKM"></v-text-field>
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
        <td>{{ props.item.subject }}</td>
        <td>{{ props.item.passGrade }}</td>
        <td class="justify-center layout px-0">
          <v-btn color="success" @click="lihatGuru(props.item.subject)">Lihat Guru</v-btn>

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
import { mapGetters, Store } from "vuex";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Mata Pelajaran", value: "subject" },
      { text: "KKM", value: "passGrade" },
      { text: "Actions", value: "name", sortable: false, align: "center" }
    ],
    // desserts: [],
    editedIndex: -1,
    editedItem: {
      subject: "",
      passGrade: 0
    },
    defaultItem: {
      subject: "",
      passGrade: 0
    }
  }),

  computed: {
    ...mapGetters("mapel", {
      desserts: "subjectData"
    }),
    formTitle() {
      return this.editedIndex === -1
        ? "Tambah Mata Pelajaran"
        : "Edit Mata Pelajaran";
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
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.desserts[this.editedIndex], this.editedItem);        this.$store.dispatch("teacher/UPDATE_Data", this.editedItem)
        this.$store.dispatch("mapel/UPDATE_Data", this.editedItem);
      } else {
        // this.account = this.username;
        // this.desserts.push(this.editedItem);        this.$store.dispatch("teacher/UPDATE_Data", this.editedItem)
        this.$store.dispatch("mapel/SET_Data", this.editedItem)
      }
      this.close();
    },
    lihatGuru(idMapel) {
      this.$router.push("/admin/guru/mapel/" + idMapel)
    }
  }
};
</script>