<template>
    <v-container>
        <v-row class="mt-5">
            <v-col cols="12" class="ml-auto mr-auto">
                <v-card>
<!--                    {{product}}-->
                    <v-card-title>{{ product.title }}</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="3"><img :src="product.image" width="100%"></v-col>
                            <v-col cols="9">
                                <p>
                                    <span class="font-weight-bold">Price:</span><br> ${{ product.price }}
                                </p>
                                <p>
                                    <span class="font-weight-bold">Details:</span><br> {{ product.description }}
                                </p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ProductDetail.vue",
        data () {
            return {
                product: []
            }
        },
        methods: {
            async getProduct(){
                await axios.get('/products/'+this.$route.params.product_id)
                .then((response) => {
                    this.product = response.data.data
                    console.log(this.product)
                })
            }
        },
        created() {
            this.getProduct()
        }
    }
</script>

<style scoped>

</style>