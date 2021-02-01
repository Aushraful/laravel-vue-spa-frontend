<template>
    <v-row no-gutters class="mt-10 mb-10">
        <v-col
                cols="12"
                sm="8"
                md="6"
                offset-md="3"
                outline
        >
            <v-card
                    class="mx-auto ml-5 mr-5"
                    max-width="100%"
            >

                <v-card-title>
                    Profile
                </v-card-title>
                <v-card-text>
                    <v-row v-if="authenticated">
                        <v-col cols="12">Name: {{ user.name }}</v-col>
                        <v-col cols="12">Email: {{ user.email }}</v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col>Please Sign In First!</v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />

                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Profile",
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            })
        }
    }
</script>

<style scoped>

</style>