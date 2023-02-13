<template>
  <div class="q-pa-md" v-if="competition !== null">
    <GymnasticsTable :data="competition.gymnastics" />
  </div>
  <div v-if="competition == null">
    Loading...
  </div>
</template>

<script>
import {getCompetitionByID} from "../components/api/competition";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import GymnasticsTable from "../components/tables/GymnasticsTable.vue";
import CategoriesTable from "../components/tables/CategoriesTable.vue";

export default {
  name: "Competition",
  components: {
    GymnasticsTable, CategoriesTable
  },
  setup() {
    const competition = ref(null)
    const $router = useRouter()
    const $route = useRoute()
    getCompetitionByID($route.params.id).then(comp => {
      console.log(comp)
      competition.value = comp;
    }).catch((err) => {
      console.error(err)
      $router.push("/")
    })
    return {competition, $router}
  },
}
</script>

<style scoped>

</style>