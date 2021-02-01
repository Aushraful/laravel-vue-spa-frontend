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
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                    <v-card-title>
                        Sign In Form
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                                v-model="form.email"
                                :rules="emailRules"
                                label="E-mail"
                        />
                        <v-text-field
                                v-model="form.password"
                                :rules="passwordRules"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                counter
                                minlength="6"
                                hint="At least 6 characters"
                                persistent-hint
                                label="Password"
                                @click:append="showPassword = !showPassword"
                        />
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
                                @click.prevent="submitSignIn"
                        >
                            Sign In
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

    import {mapActions} from "vuex";

    export default {
        name: "SignIn",
        data () {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                valid: false,
                showPassword: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length > 5) || 'Password must be at least 6 characters'
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

            ...mapActions({
                signIn: 'auth/signIn'
            }),

            submitSignIn () {
                if (this.$refs.form.validate()) {

                    this.signIn(this.form)
                        .then(() => {
                            this.$toasted.show('Signed In Successfully!', {
                                // duration: 3000,
                                type: 'success',
                            })
                            this.$router.replace({
                                name: 'Profile',
                            })
                        })
                        .catch((e) => {
                            // console.log(e.response.data.message)
                            this.$toasted.show(e.response.data.message, {
                                type: 'error',
                            })
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>