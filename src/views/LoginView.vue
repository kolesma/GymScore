<template>
<input name="email" v-model="email"/>
  <input name="password" v-model="password" type="password"/>
  <button @click="login">Sent</button>
</template>

<style>

</style>
<script>

import {
  signInWithEmailAndPassword,
    getAuth
} from "firebase/auth"
import {
 getApp
} from "firebase/app"

export default {
  name: "LoginView",
  data:()=>({email:"",password:""}),
  methods:{
    async login(){
      console.log(this.email)
      let user= await  signInWithEmailAndPassword(getAuth(),this.email, this.password)
      console.log(user)
    }
  }
}
</script>
