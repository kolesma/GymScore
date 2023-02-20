<template>
  <div class="q-pa-md" v-if="competition !== null">
    <GymnasticsTable :name="competition.title" :data="competition.gymnastics" @update="updateCompetition" />
  </div>
  <div v-if="competition == null">
    Loading...
  </div>
</template>

<script>
import {getCompetitionByID, getGymnasticByID} from "../components/api/competition";
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
    const updateCompetition = () => {
      getCompetitionByID($route.params.id).then(async comp => {
        let result = []
        for(let gymn of comp.gymnastics) {
          let obj = await getGymnasticByID(comp.id ,gymn.id)
          result.push(obj)
        }
        competition.value = {...comp, gymnastics: result};
      }).catch((err) => {
        console.error(err)
        $router.push("/")
      })
    }

    updateCompetition()
    return {competition, $router, updateCompetition}
  },
}
</script>

<style scoped>

</style>