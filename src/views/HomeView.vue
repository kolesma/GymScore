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
    const filter = ref('')
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
    return {competitionStore, filter, deleteCompetitions, selected, columns, createDialog, openCompetitions, $router, userStore}
  },

  mounted() {
    this.$q.loading.show()
    this.checkUser()
  },
  methods: {
    async checkUser() {
      if (!this.userStore.loaded) {
        await new Promise(resolve => setTimeout(resolve, 100));
        return this.checkUser();
      } else {
        this.$q.loading.hide()

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
    <div class="q-pa-md" v-if="userStore.user !== null">
      <q-table
          title="Competitions"
          :rows="competitionStore.data"
          :columns="columns"
          :selection="userStore.user.role === 'admin' ? 'multiple' : 'none'"
          row-key="title"
          :pagination="{rowsPerPage: 10}"
          :filter="filter"
          v-model:selected="selected"
          @row-click="openCompetitions"
      >
        <template v-slot:top>

          <q-space/>
          <div class="buttons">

            <q-input dense debounce="300" outlined color="primary" v-model="filter">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
            <q-btn v-if="userStore.user.role === 'admin'" color="primary" text-color="black" icon="add" @click="createDialog = true"/>
            <q-btn v-if="selected.length > 0 && userStore.user.role === 'admin'" color="secondary" icon="delete" @click="deleteCompetitions"/>
          </div>
        </template>
      </q-table>
    </div>
    <div class="q-pa-md" v-if="userStore.loaded === false">
      <Loading />
    </div>
    <CreateDialog :open="createDialog" @close="createDialog = false"/>
  </main>
</template>


<style>
.buttons {
  display: flex;
  height: 38px;
}

.buttons > * {
  margin: 0 4px
}
</style>