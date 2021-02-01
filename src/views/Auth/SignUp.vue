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
                    class="mx-auto"
                    max-width="100%"
            >
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                    <v-card-title>
                        Sign Up Form
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                                v-model="form.name"
                                counter
                                minlength="3"
                                hint="At least 3 characters"
                                persistent-hint
                                :rules="nameRules"
                                label="Name"
                                :class="{ 'is-invalid': errors.name }"
                                :error-messages="errors.name"
                        />

                        <v-text-field
                                v-model="form.email"
                                :rules="emailRules"
                                label="E-mail"
                                hint="Required"
                                persistent-hint
                                :class="{ 'is-invalid': errors.email }"
                                :error-messages="errors.email"
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
                                :class="{ 'is-invalid': errors.password }"
                                :error-messages="errors.password"
                        />

                        <v-text-field
                                v-model="form.confirmPassword"
                                :rules="confirmPasswordRules"
                                label="Confirm Password"
                                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showConfirmPassword ? 'text' : 'password'"
                                counter
                                minlength="6"
                                hint="At least 6 characters"
                                persistent-hint
                                @click:append="showConfirmPassword = !showConfirmPassword"
                                :class="{ 'is-invalid': errors.confirmPassword }"
                                :error-messages="errors.confirmPassword"
                        />

                        <v-checkbox
                                v-model="form.checkbox"
                                label="I agree to the terms and conditions"
                                :rules="checkboxRules"
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
                                @click.prevent="submitSignUp"
                        >
                            Sign Up
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
        name: "SignUp",
        data () {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                errors: [],
                valid: false,
                showPassword: false,
                showConfirmPassword: false,
                checkbox: false,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length > 2) || 'Name must be at least 3 characters'
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length > 5) || 'Password must be at least 6 characters'
                ],
                confirmPasswordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length > 5) || 'Password must be at least 6 characters'
                    // v => (v && this.password === this.confirmPassword) || 'Password must be at least 8 characters'
                    // (password === confirmPassword) || 'The confirmation password you entered do not match with password!'
                ],
                checkboxRules: [
                    v => !!v || 'You must agree to continue!'
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
                signUp: 'auth/signUp'
            }),

            submitSignUp () {
                if (this.$refs.form.validate()) {

                    this.signUp(this.form)
                        .then(() => {
                            this.$toasted.show('Signed Up Successfully!', {
                                // duration: 3000,
                                type: 'success',
                            })
                            this.$router.replace({
                                name: 'Profile',
                            })
                        })
                        .catch((e) => {
                            // console.log(e.response.data.errors.email)

                            this.errors=e.response.data.errors;

                            this.$toasted.show('Please fill out the form properly!', {
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