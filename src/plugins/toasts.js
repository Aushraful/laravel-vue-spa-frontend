import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted)

Vue.toasted.register('loginError', 'Wrong Email or password!', {
    type: 'error',
    duration: 2000
})