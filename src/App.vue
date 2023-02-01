<template>
  <q-layout view="hhh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <Header @toggle="toggleLeftDrawer" />
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
      <!-- drawer content -->
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
body {
  background: #eee;
}

</style>
<script>
import {ref} from 'vue'
import Header from "./components/Header.vue";
import {onAuthStateChanged, getAuth} from "firebase/auth"
import {useUserStore} from "./stores/user";
export default{
  name:"App",
  components: {Header},
  setup () {
    const userStore = useUserStore()
    const leftDrawerOpen = ref(false)
    onAuthStateChanged(getAuth(), (user) => {
      userStore.setUser(user)
    })

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>