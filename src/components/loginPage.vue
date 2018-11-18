<template>
  <v-app id="login">
    <!-- <v-content> -->
    <v-container fluid fill-height>

      <v-layout align-center justify-center>
        <v-flex lg4>
          <v-alert :value="alert.status" type="error" transition="scale-transition">
            {{alert.msg}}
          </v-alert>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <v-form>
                <v-text-field append-icon="person" name="login" label="Login" type="text" v-model="model.username"></v-text-field>
                <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                <v-select :items="items" label="Status Login" v-model="model.statusLogin" dense box required="true"></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- </v-content> -->
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    alert: {
      status: false,
      msg: ""
    },
    model: {
      username: "",
      password: "",
      statusLogin: ""
    },
    items: ["Administrator", "Guru"]
  }),
  methods: {
    login() {
      this.loading = true;
      if (
        this.model.username &&
        this.model.password &&
        this.model.statusLogin
      ) {
        setTimeout(() => {
          if (this.model.statusLogin == "Administrator") {
            this.$router.push("/admin");
          } else if (this.model.statusLogin == "Guru") {
            this.$router.push("/guru");
          }
        }, 1000);
      } else {
        this.alert.status = true;
        this.alert.msg = "Kolom tidak boleh ada yang kosong";
        this.loading = false;
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>