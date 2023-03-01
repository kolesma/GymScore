<script>
import {ref} from "vue"
import CreateDialog from "../components/dialogs/CreateDialog.vue";
import {useCompetitionStore} from "../stores/competition";
import {useRouter} from "vue-router/dist/vue-router";
import {useUserStore} from "../stores/user";
import {useQuasar} from "quasar";

export default {
  name: 'HomeView',
  components: {CreateDialog},
  setup() {
    const selected = ref([])
    const createDialog = ref(false)
    const columns = ref([
      {
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
        sortable: true
      }, {
        name: 'endDate',
        label: 'End',
        field: 'endDate',
        sortable: true
      },

    ])
    const competitionStore = useCompetitionStore()

    const $q = useQuasar()

    const deleteCompetitions = async () => {
      try {
        $q.loading.show()
        await Promise.all(selected.value.map(comp => competitionStore.deleteCompetition(comp.id)))
        $q.notify({message: "Competitions were deleted!", color: 'green'})
        $q.loading.hide()

      } catch (e) {
        console.log(e.message)
        $q.notify({message: "There was an error. Please try again later", color: 'red'})
      }

    }
    competitionStore.fetchData()
    const $router = useRouter()
    const openCompetitions = function (event, row) {
      $router.push('/competition/' + row.id)
    }
    const userStore = useUserStore()
    return {competitionStore, deleteCompetitions, selected, columns, createDialog, openCompetitions, $router, userStore}
  },

  mounted() {
    this.checkUser()
  },
  methods: {
    async checkUser() {
      if (!this.userStore.loaded) {
        await new Promise(resolve => setTimeout(resolve, 100));
        return this.checkUser();
      } else {
        if (this.userStore.user === null) {
          this.$router.push("/login")
        }
      }
    }
  }

}
</script>

<template>
  <main>
    <div class="q-pa-md">
      <q-table
          title="Competitions"
          :rows="competitionStore.data"
          :columns="columns"
          selection="multiple"
          row-key="title"
          v-model:selected="selected"
          @row-click="openCompetitions"
      >
        <template v-slot:top>
          <div class="buttons">
            <q-btn color="primary" text-color="black" label="Add competition" @click="createDialog = true"/>
            <q-btn v-if="selected.length > 0" color="red" label="Delete" @click="deleteCompetitions"/>
          </div>
          <q-space/>
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
    <CreateDialog :open="createDialog" @close="createDialog = false"/>
  </main>
</template>


<style>
.buttons {
  display: flex;

}

.buttons > * {
  margin: 0 4px
}
</style>