<template>
  <v-app id="inspire">
    <template v-if="!$route.meta.public">
      <v-navigation-drawer width="250" flat app v-model="drawer" class="hidden">
        <v-list v-for="item in items" :key="item.text">
          <v-list-tile :to="{path: item.path}">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{item.text}}</v-list-tile-title>
          </v-list-tile>

          <v-list-group v-if="item.extended" prepend-icon="account_circle" value="true">
            <v-list-tile slot="activator">
              <v-list-tile-title>Users</v-list-tile-title>
            </v-list-tile>

            <v-list-group no-action sub-group value="true">
              <v-list-tile slot="activator">
                <v-list-tile-title>Admin</v-list-tile-title>
              </v-list-tile>

              <v-list-tile v-for="(admin, i) in admins" :key="i" @click>
                <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="admin[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>

            <v-list-group sub-group no-action>
              <v-list-tile slot="activator">
                <v-list-tile-title>Actions</v-list-tile-title>
              </v-list-tile>

              <v-list-tile v-for="(crud, i) in cruds" :key="i" @click>
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar color="blue-grey darken-4" dark fixed app flat class="hidden">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>
          <span class="red--text">e-Rapot</span> v0.00001a
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark color="white" outline @click="">Logout</v-btn>
      </v-toolbar>

      <v-content class="blue-grey lighten-5 whiteHidden">
        <v-container fluid>
          <v-fade-transition mode="out-in">
            <!-- <v-app> -->
            <router-view></router-view>
            <!-- </v-app> -->
          </v-fade-transition>
        </v-container>
      </v-content>
    </template>

    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      authLogin: true,
      title: "Home",
      items: [
        { icon: "fas fa-columns", text: "Halaman Utama", path: "/" },
        {
          icon: "fas fa-chalkboard-teacher",
          text: "Data Guru",
          path: "/admin/guru"
        },
        { icon: "fas fa-users", text: "Data Siswa", path: "/admin/siswa" },
        { icon: "meeting_room", text: "Kelas", path: "/admin/kelas" },
        {
          icon: "fas fa-clipboard-list",
          text: "Mata Pelajaran",
          path: "/admin/matapelajaran"
        },
        {
          icon: "insert_chart_outlinedt",
          text: "Penilaian",
          path: "/admin/penilaian"
        },
        {
          icon: "table_chart",
          text: "Laporan Siswa",
          path: "/admin/laporan"
        },
        {
          icon: "chrome_reader_mode",
          text: "Jenis Penilaian",
          path: "/admin/jenispenilaian"
        }
        // { icon: "settings", text: "Settings", path: "/admin/settings" }
      ]
    };
  },
  name: "App"
};
</script>

<style>
font-family: "Roboto", sans-serif;

#page-content {
  background-color: rgb(206, 219, 235);
}

@media print {
  .hidden {
    display: none !important;
  }
  .blue-grey.lighten-5 {
    background-color: #ffffff !important;
    border-color: #eceff1 !important;
  }
  /* table {
    border-radius: 3px;
    background-color: #42b983;
  } */
}
</style>