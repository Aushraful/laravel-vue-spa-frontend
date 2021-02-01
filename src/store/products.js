import axios from "axios";

export default {
    namespaced: true,

    state: {
        products: null
    },
    getters: {
        allProducts (state) {
            return state.products
        }
    },
    mutations: {
        SET_PRODUCTS (state, payload){
            state.products = payload
        }
    },
    actions: {
        async getProducts ({commit}) {
            let response = await axios.get('products')
            return commit('SET_PRODUCTS', response.data.data)
        },

        async addProduct (product) {
            await axios.post('/products', product)
        },

        async updateProduct (product) {
            await axios.post('/products', product)
        },

        /*getProducts (context) {
            axios.get('products').then((response) => {
                console.log(response.data.data[0])
                context.commit('SET_PRODUCTS', response.data.data)
            })
        },*/
    }
}