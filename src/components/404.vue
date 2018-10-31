<template>
  <v-app id="404">
    <v-progress-linear  :active="loading" :indeterminate="loading"></v-progress-linear>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <div class="mr-3 hidden-sm-and-down">
            <img src="/static/error/403.svg" alt="">
          </div>          
          <div class="text-md-center">
            <h1>404</h1>
            <h2 class="my-3 headline ">Sorry,are u lost?.</h2>
            <div>
              <v-btn color="primary" @click="goHome">Go Home</v-btn>
            </div>  
          </div>
        </v-layout>
      </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    goHome() {
      this.loading = true
      setTimeout(() => {
        this.$router.push({ path: '/' })
      }, 1500)
    }
  }
};
</script>
<style scoped lang="css">
h1 {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>