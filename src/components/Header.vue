<template>
  <q-toolbar>
    <q-toolbar-title @click="goHome">GymScore</q-toolbar-title>
    <q-btn flat round dense icon="account_circle" v-if="userStore.user !== null">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="logout">
              <q-item-section>Log out</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
    </q-btn>
    <q-btn to="/login" label="Login" color="secondary" v-if="userStore.user === null" />
  </q-toolbar>
</template>

<script>
import {useUserStore} from "../stores/user";
import {useRouter} from "vue-router/dist/vue-router";
import {signOut, getAuth} from "firebase/auth"
export default {
  name: "Header",
  setup() {
    const userStore = useUserStore()
    const $router = useRouter()
    const goHome = () => {
      $router.push("/")
    }
    const logout = () => {
      console.log('log')
      userStore.setUser(null)
      signOut(getAuth())
      $router.push("/login")
    }
    return {userStore, goHome, logout}
  }
}
</script>

<style scoped>

</style>