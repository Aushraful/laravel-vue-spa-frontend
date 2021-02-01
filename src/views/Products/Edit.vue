<template>
    <v-container>
        <v-row class="mt-5">
            <v-col cols="8" class="ml-auto mr-auto">
                <v-card>
<!--                    {{product}}-->
                    <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                    >
                        <v-card-title>Edit Product</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="3">
                                    <img :src="product.image" width="100%">

                                    <!--<v-file-input
                                            label="Image"
                                            :rules="imageRules"
                                            filled
                                            show-size
                                            v-model="form.image"
                                            prepend-icon="mdi-camera"
                                    >
                                    </v-file-input>-->

                                    <v-file-input
                                            label="Image"
                                            filled
                                            show-size
                                            v-model="form.image"
                                            prepend-icon="mdi-camera"
                                    >
                                    </v-file-input>
                                </v-col>
                                <v-col cols="9">
                                    <v-text-field
                                            label="Title"
                                            :rules="titleRules"
                                            v-model="form.title"
                                            counter
                                            minlength="3"
                                            hint="At least 3 characters"
                                            persistent-hint
                                    >
                                    </v-text-field>
                                    <v-text-field
                                            label="Price ($)"
                                            :rules="priceRules"
                                            v-model="form.price"
                                    >
                                    </v-text-field>
                                    <v-textarea
                                            name="input-7-1"
                                            :rules="descriptionRules"
                                            filled
                                            label="Description"
                                            auto-grow
                                            v-model="form.description"
                                            counter
                                            minlength="20"
                                            hint="At least 20 characters"
                                            persistent-hint
                                    ></v-textarea>
                                </v-col>
                            </v-row>

                        </v-card-text>

                        <v-card-actions>
                            <v-spacer />

                            <v-btn
                                    color="warning"
                                    class="mr-4"
                                    @click="reset"
                            >
                                Reset Form
                            </v-btn>

                            <v-btn
                                    :disabled="!form"
                                    color="success"
                                    class="mr-4"
                                    @click.prevent="updateProduct"
                            >
                                Update Product
                            </v-btn>
                        </v-card-actions>
                    </v-form>

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
                product: [],
                form: {
                    title: '',
                    image: [],
                    price: '',
                    description: ''
                },
                valid: false,
                /*imageRules: [
                    v => !!v || 'Image is required',
                    v => /.+@.+\..+/.test(v) || 'Image must be valid'
                ],*/
                titleRules: [
                    v => !!v || 'Title is required',
                    v => (v && v.length > 3) || 'Title must be at least 3 characters'
                ],
                priceRules: [
                    v => !!v || 'Price is required',
                    v =>  /(?=.*[1-9])/.test(v) || "The value must be an integer number",
                ],
                descriptionRules: [
                    v => !!v || 'Description is required',
                    v => (v && v.length > 20) || 'Description must be at least 20 characters'
                ]
            }
        },
        methods: {
            validate () {
                this.$refs.form.validate()
            },

            reset () {
                this.$refs.form.reset()
            },

            async getProduct(){
                await axios.get('/products/'+this.$route.params.product_id)
                .then((response) => {
                    this.product = response.data.data
                    // console.log(this.product)
                })
            },

            async updateProduct(){

                if (this.$refs.form.validate()) {

                    console.log(this.form)

                    /*await axios.patch('/products/'+this.$route.params.product_id, {
                        'title': this.form.title,
                    })
                        .then((response) => {
                            this.product = response.data.data
                            console.log(this.product)
                        })
                        .catch((errors) => {
                            console.log(errors.data)
                        })*/
                }

            }
        },
        created() {
            this.getProduct()
        }
    }
</script>

<style scoped>

</style>