import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', ()=> {
    const auth = useFirebaseAuth()
    const authUser = ref({})
    const errorMsg = ref('')
    const errorCodes = {
        'auth/user-not-found' : 'Usuario no encontrado',
        'auth/wrong-password' : 'El password es incorrecto',
        'auth/invalid-credential' : 'Credenciales invalidas'
    }

    const login = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=> {
                const user = userCredential.user
                authUser.value = user

            })
            .catch(error => {
                errorMsg.value = errorCodes[error.code]
            })
    }

    const hasError = computed(()=> {
        return errorMsg.value
    })

    return {
        login,
        hasError,
        errorMsg
    }
})