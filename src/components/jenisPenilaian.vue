<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>Daftar Jenis Penilaian</v-toolbar-title>
      <!-- <v-divider class="mx-2" inset vertical></v-divider> -->
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="600px">
        <v-btn slot="activator" color="primary" round dark class="mb-2">Tambah Jenis Penialaian</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.jenis" label="Jenis Penilaian"></v-text-field>
                  <v-text-field v-model="editedItem.persentase" label="Persentase"></v-text-field>
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="Keterangan"
                    value
                    v-model="editedItem.keterangan"
                  ></v-textarea>
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
        <td>{{ props.item.jenis }}</td>
        <td>{{ props.item.keterangan }}</td>
        <td>{{ props.item.persentase }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <!-- <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>-->
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Jenis Nilai", value: "jenis" },
      { text: "keterangan", value: "keterangan" },
      { text: "Persentase %", value: "persentase" },
      { text: "Actions", value: "name", sortable: false, align: "center" }
    ],
    editedIndex: -1,
    editedItem: {
      jenis: "",
      persentase: 0,
      keterangan: ""
    },
    defaultItem: {
      jenis: "",
      persentase: 0,
      keterangan: ""
    }
  }),
  computed: {
    ...mapGetters("jenisPenilaian", {
      desserts: "jenisPenilaian"
    }),
    formTitle() {
      return this.editedIndex === -1
        ? "Tambah Jenis Penilaian"
        : "Edit Jenis Penilaian";
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
        this.$store.dispatch("jenisPenilaian/DELETE_Data", item);
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
        this.$store.dispatch("jenisPenilaian/UPDATE_Data", {
          old: this.desserts[this.editedIndex],
          new: this.editedItem
        });
      } else {
        // this.account = this.username;
        // this.desserts.push(this.editedItem);
        this.$store.dispatch("jenisPenilaian/SET_Data", this.editedItem);
      }
      this.close();
    }
  }
};
</script>