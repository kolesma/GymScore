<template>
  <div class="container">
    <h5>Login page</h5>
    <q-input v-model="email" class="input" label="E-mail" type="email" outlined></q-input>
    <q-input v-model="password" class="input" label="Password" type="password" outlined></q-input>

    <q-btn :loading="loading" class="button" @click="login" color="primary" label="Login" />
    <a href="/register">Create new account</a>
  </div>
</template>

<style lang="scss">
.container {
  border-radius: 5px;
  box-shadow: 0 0 12px #777;

  background: white;
  text-align: center;
  width: 320px;
  margin: 70px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h4 {
  margin: 5px 0
}
.input {
  margin: 5px 0;
}
.button  {
  margin: 10px 0 5px
}
</style>
<script>
import {ref} from 'vue'
import {signInWithEmailAndPassword,getAuth} from "firebase/auth"
import {useUserStore} from "../stores/user";
import {useQuasar} from "quasar";
import { useRouter } from 'vue-router';
import {getErrorByCode} from "../utils/firebaseErrors";

export default {
  name: "LoginView",
  setup() {
    const userStore = useUserStore()
    const email = ref("user@mail.com")
    const password = ref("password")
    const loading = ref(false)
    const $q = useQuasar()
    const $router = useRouter()

    const login = async () => {
      loading.value = true
      try {
        let result = await signInWithEmailAndPassword(getAuth(), email.value, password.value)
        userStore.setUser(result.user)
        $q.notify({message: "You successfully logged in", closeBtn: true, color:'success', position: 'bottom-right'})
        await $router.push("/")
      } catch (e) {
        $q.notify({message: getErrorByCode(e.code), color:'red', position: 'bottom-right'})
      }

      loading.value = false
    }

    return {email, password, login, loading}
  }
}
</script>
