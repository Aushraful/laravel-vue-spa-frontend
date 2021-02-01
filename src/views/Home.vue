<template>
  <v-container>
<!--    {{products}}-->
    <v-row class="mt-5">
      <v-col cols="3"
             v-for="product in products"
             :key="product.id"
      >
        <v-card
                class="mx-auto ml-5 mr-5"
                max-width="100%"
                :to="{ name: 'ProductDetail', params:{product_id: product.id}}"
        >
          <v-card-title>
            {{ product.title }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12"><img :src="product.image" width="100%"></v-col>
              <v-col cols="12">Price: ${{ product.price }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import {mapGetters} from "vuex";

export default {
  name: 'Home',
  components: {
    //
  },
  computed: {
    ...mapGetters({
      products: 'products/allProducts'
    })
  },
  created() {
    this.$store.dispatch('products/getProducts')
  }
}
</script>
