<template>
  <div class="container">
    <h4>Register page</h4>
    <q-input v-model="name" class="input" label="Name" type="text" outlined></q-input>
    <q-input v-model="email" class="input" label="E-mail" type="email" outlined></q-input>
    <q-input v-model="password" class="input" label="Password" type="password" outlined></q-input>

    <q-btn class="button" @click="register" color="primary" label="Register" />
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
export default {
  name: "RegisterView",
  setup() {
    const email = ref("user@mail.com")
    const password = ref("password")
    const name = ref("Adam Driver")

    const register = async () => {
      let result = await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      console.log(result)
    }

    return {email, password, name, register}
  }
}
</script>
