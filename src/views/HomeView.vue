<script>
import {ref} from "vue"
import CreateDialog from "../components/CreateDialog.vue";
import {useCompetitionStore} from "../stores/competition";
import {useRouter} from "vue-router/dist/vue-router";
export default  {
  name: 'HomeView',
  components: {CreateDialog},
  setup() {

    const createDialog = ref(false)
    const columns = ref([
      {
        name: 'id',
        label: 'ID',
        field: 'id',
        align: 'left',

      }, {
        name: 'title',
        label: 'Title',
        field: 'title',
        align: 'left'
      }, {
        name: 'place',
        label: 'Place',
        field: 'place',
        align: 'left'
      }, {
        name: 'startDate',
        label: 'Start',
        field: 'startDate',
      }, {
        name: 'endDate',
        label: 'End',
        field: 'endDate',
      },

    ])

    const competitionStore = useCompetitionStore()
    competitionStore.fetchData()
    const $router = useRouter()
    const openCompetitions = function(event, row) {
      $router.push('/competition/' + row.id)
    }
    return {competitionStore, columns,createDialog, openCompetitions}
  },

}
</script>

<template>
  <main>
    <div class="q-pa-md">
      <q-table
          title="Competitions"
          :rows="competitionStore.data"
          :columns="columns"
          row-key="name"
          @row-click="openCompetitions"
      >
        <template v-slot:top>
          <q-btn color="primary" label="Add competition" @click="createDialog = true"/>
          <q-space/>
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
    <CreateDialog :open="createDialog" @close="createDialog = false" />
  </main>
</template>
