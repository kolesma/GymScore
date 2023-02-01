<template>
  <q-toolbar>
    <q-btn dense flat round icon="menu" @click="toggleDrawer" />
<!--    <q-avatar>-->
<!--      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
<!--    </q-avatar>-->

    <q-toolbar-title>Quasar Framework</q-toolbar-title>

    <q-btn flat round dense icon="account_circle" v-if="userStore.user !== null" />
    <q-btn to="/login" label="Login" color="secondary" v-if="userStore.user === null" />
  </q-toolbar>
</template>

<script>
import {useUserStore} from "../stores/user";

export default {
  name: "Header",
  methods: {
    toggleDrawer() {
      this.$emit('toggle')
    }
  },
  setup() {
    const userStore = useUserStore()

    return {userStore}
  }
}
</script>

<style scoped>

</style>