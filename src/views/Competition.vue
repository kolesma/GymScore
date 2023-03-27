<template>
  <div class="q-pa-md" v-if="competition !== null">
    <GymnasticsTable :name="competition.title" :data="competition.gymnastics" @update="updateCompetition" />
  </div>
</template>

<script>
import {getCompetitionByID, getGymnasticByID} from "../components/api/competition";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import GymnasticsTable from "../components/tables/GymnasticsTable.vue";
import CategoriesTable from "../components/tables/CategoriesTable.vue";
import {useQuasar} from "quasar";
import {collection, getDocs, getFirestore, orderBy, query} from "firebase/firestore";

export default {
  name: "Competition",
  components: {
    GymnasticsTable, CategoriesTable
  },
  watch: {
    competition() {
      this.$q.loading.hide()
    }
  },
  mounted() {
    this.$q.loading.show()
  },
  setup() {
    const competition = ref(null)
    const $router = useRouter()
    const $route = useRoute()
    const $q = useQuasar()
    const updateCompetition = () => {
      getCompetitionByID($route.params.id).then(async comp => {
        console.log('fetched')
        let result = await Promise.all(comp.gymnastics.map(gymn => getGymnasticByID(comp.id ,gymn.id)))
       console.log('fetched details')
        competition.value = {...comp, gymnastics: result};
        $q.loading.hide()
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