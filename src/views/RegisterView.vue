<template>
  <div class="container">
    <h5>Register page</h5>
    <q-input v-model="name" class="input" label="Name" type="text" outlined></q-input>
    <q-input v-model="email" class="input" label="E-mail" type="email" outlined></q-input>
    <q-input v-model="password" class="input" label="Password" type="password" outlined></q-input>
    <q-toggle v-model="admin" label="Are you administrator?" />

    <q-btn class="button" @click="register" color="primary" label="Register" />
    <a href="/login">Already have an account?</a>
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
import {createUserWithEmailAndPassword,getAuth} from "firebase/auth"
import {setDoc, doc, collection, getFirestore} from "firebase/firestore"
import {useQuasar} from "quasar";
import {useRouter} from "vue-router/dist/vue-router";
import {useUserStore} from "../stores/user";
import {getErrorByCode} from "../utils/firebaseErrors";
export default {
  name: "RegisterView",

  watch: {
    admin(value) {
      console.log(value)
      if(!this.email.endsWith('gymscore.com') && value === true) {
        this.admin = false;
        this.$q.notify({message: "Only employees from GymScore can be an administrator", color: 'red'})
      }
    },
    email(value) {
      if(!value.endsWith('gymscore.com') && this.admin === true) {
        this.admin = false;
        this.$q.notify({message: "Only employees from GymScore can be an administrator", color: 'red'})
      }
    }
  },
  setup() {
    const email = ref("")
    const password = ref("")
    const name = ref("")
    const admin = ref(false)
    const $q = useQuasar()
    const $router = useRouter()
    const userStore = useUserStore()

    const register = async () => {
      try {
        let result = await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        await setDoc(doc(collection(getFirestore(), "users"), result.user.uid), {
          fullName: name.value,
          email: email.value,
          role: admin.value === true ? 'admin' : 'judge'
        })
        userStore.setUser(result.user)
        $q.notify({message: "You successfully registered", closeBtn: true, color:'success', position: 'bottom-right'})
        await $router.push("/")
      } catch (e) {
        $q.notify({message: getErrorByCode(e.code), color: "negative", position: "bottom-right"})
        console.error(e.code) //todo
      }

    }

    return {email, password, name, admin, register}
  }
}
</script>
