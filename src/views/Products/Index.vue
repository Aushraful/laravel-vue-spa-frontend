<template>
    <v-container class="mt-5">
        <v-data-table
                :headers="headers"
                :items="products"
                sort-by="title"
                class="elevation-1"
        >
            <template v-slot:item.image="{ item }">
                <div class="p-2">
                    <v-img :src="item.image" :alt="item.name" height="100px" width="100px"></v-img>
                </div>
            </template>
            <template v-slot:top>
                <v-toolbar
                        flat
                >
                    <v-toolbar-title>Products</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>
                    <v-spacer></v-spacer>

                    <v-dialog
                            v-model="dialog"
                            max-width="500px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="addItem"
                            >
                                New Product
                            </v-btn>
                        </template>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn icon elevation="2">
                    <v-icon
                            small
                            @click="editItem(item)"
                            color="info"
                    >
                        mdi-pencil
                    </v-icon>
                </v-btn>
                <v-btn icon elevation="2">
                    <v-icon
                            small
                            @click="deleteItem(item)"
                            color="red"
                    >
                        mdi-delete
                    </v-icon>
                </v-btn>
                <!--<v-icon
                        small
                        @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>-->
            </template>
            <template v-slot:no-data>
                <v-btn
                        color="primary"
                        @click="initialize"
                >
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Index.vue',
        data: () => ({
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'Image',
                    align: 'start',
                    sortable: false,
                    value: 'image',
                },
                { text: 'Title', value: 'title' },
                { text: 'Price ($)', value: 'price' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            products: [],
            editedIndex: -1,
            editedItem: {
                image: '',
                title: '',
                price: 0,
                description: '',
            },
            defaultItem: {
                image: '',
                title: '',
                price: 0,
                description: '',
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },

        created () {
            this.initialize()
        },

        methods: {

            async getProducts () {
                let response = await axios.get('products')
                this.products = response.data.data
            },

            initialize () {
                this.getProducts()
            },

            addItem () {
                this.$router.replace({ name: 'AddProduct' })
                // console.log('add item')
            },

            editItem (item) {
                this.editedIndex = this.products.indexOf(item)
                this.editedItem = Object.assign({}, item)
                // this.dialog = true
                this.$router.replace({ name: 'EditProduct',  params:{product_id: this.editedItem.id}})
            },

            deleteItem (item) {
                this.editedIndex = this.products.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.products.splice(this.editedIndex, 1)
                this.closeDelete()

                axios.delete('products/'+this.editedItem.id)
                    .then((response) => {
                        this.$toasted.show(response.data, {
                            // duration: 3000,
                            type: 'success',
                        })
                    })
                    .catch((e) => {
                        // console.log(e.response.data.message)
                        this.$toasted.show(e.response.data.message, {
                            type: 'error',
                        })
                    })
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            /*save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.products[this.editedIndex], this.editedItem)
                    // redirected to another page for editing content
                } else {
                    this.products.push(this.editedItem)
                    // redirected to another page for editing content
                }
                this.close()
            },*/
        },
    }
</script>