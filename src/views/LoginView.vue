<script setup>
    import { useForm, useField } from 'vee-validate'
    import { useFirebaseAuth } from 'vuefire'
    import { signInWithEmailAndPassword } from 'firebase/auth'
    import { loginSchema as validationSchema } from '../validation/loginSchema'

    const { handleSubmit } = useForm({ validationSchema })
    const auth = useFirebaseAuth()

    const email = useField('email')
    const password = useField('password')

    const submit = handleSubmit((values)=> {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential)=> {
                console.log(userCredential)
            })
            .catch(error => {
                console.log(error.code)
            })
    })

</script>

<template>
    <v-card
        flat
        max-width="600"
        class="mx-auto my-10"
    >
        <v-card-title
            class="text-h4 font-weight-bold"
            tag="h3"
        >
            Iniciar Sesión
        </v-card-title>
        <v-card-subtitle
            class="text-h5"
        >
            Inicia Sesión con tu cuenta
        </v-card-subtitle>

        <v-form class="mt-5">
            <v-text-field
                type="email"
                label="Email"
                bg-color="blue-grey-lighten-5"
                class="mb-3"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            >
            </v-text-field>

            <v-text-field
                type="password"
                label="Password"
                bg-color="blue-grey-lighten-5"
                class="mb-3"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            >
            </v-text-field>

            <v-btn
                block
                color="pink-accent-3"
                @click="submit"
            >
                Iniciar Sesión
            </v-btn>
        </v-form>
    </v-card>
</template>
