<template>
  <v-app>

    <TopNav></TopNav>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import TopNav from './components/TopNav';

export default {
  name: 'App',

  components: {
    TopNav,
  },

  data: () => ({
    //
  }),
};
</script>
