<template>
    <v-app-bar
            app
            color="primary"
            dark
    >
        <div class="d-flex align-center">
            <v-btn
                    to="/"
                    link
                    text
            >
                <span class="mr-2">Laravel Vue Spa</span>
            </v-btn>
        </div>

        <v-spacer></v-spacer>

        <v-btn
                to="/"
                link
                text
        >
            <v-icon>mdi-home</v-icon>
            <span class="mr-2">Home</span>
        </v-btn>

        <v-btn
                to="/products"
                link
                text
        >
            <v-icon>mdi-tray-full</v-icon>
            <span class="mr-2">Products</span>
        </v-btn>

        <v-menu
                open-on-hover
                offset-y
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        text
                        v-bind="attrs"
                        v-on="on"
                >
                    <v-icon>mdi-shield-account</v-icon> <span>{{ authenticated ? user.email : "Account" }}</span>
                </v-btn>
            </template>
            <v-list v-if="authenticated">
                <v-list-item link class=" pl-2" to="/profile">
                    <v-list-item-title list-item-title-font-size><v-icon left small>mdi-account-circle-outline</v-icon> Profile</v-list-item-title>
                </v-list-item>
                <v-list-item link class=" pl-2" @click.prevent="signOut">
                    <v-list-item-title list-item-title-font-size><v-icon left small>mdi-logout</v-icon> Sign Out</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item link class=" pl-2" to="/sign-up">
                    <v-list-item-title list-item-title-font-size><v-icon left small>mdi-account-plus-outline</v-icon> Sign Up</v-list-item-title>
                </v-list-item>
                <v-list-item link class=" pl-2" to="/sign-in">
                    <v-list-item-title list-item-title-font-size><v-icon left small>mdi-login</v-icon> Sign In</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!--<v-btn
                href="https://github.com/vuetifyjs/vuetify/releases/latest"
                target="_blank"
                text
        >
            <span class="mr-2">Account</span>
            <v-icon>mdi-open-in-new</v-icon>
        </v-btn>-->
    </v-app-bar>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Nav",
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            })
        },
        methods: {
            ...mapActions({
                signOutAction: 'auth/signOut'
            }),

            signOut () {
                this.signOutAction().then(() => {
                    this.$router.replace({
                        name: 'Home'
                    })
                    this.$toasted.show('Signed Out Successfully!', {
                        type: 'success',
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>