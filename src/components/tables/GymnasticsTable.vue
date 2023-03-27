<template>
  <q-table
      title="Gymnastics"
      :rows="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :pagination="{rowsPerPage: 10}"
      v-model:selected="selected"
      :selection="userStore.user.role === 'admin' ? 'multiple' : 'none'"
      @row-click="openGymnastic"
  >
    <template v-slot:top>

      <div class="competition-name">
        {{name}}
      </div>
      <q-space/>
      <div class="buttons"  v-if="userStore.user.role === 'admin'" >
        <q-input dense debounce="300" outlined color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
        <q-btn icon="system_update_alt" class="export-icon" text-color="black"  color="primary" @click="report" label="Export"/>

        <q-btn color="primary" text-color="black" icon="add" @click="createDialog = true"/>
        <q-btn v-if="selected.length > 0 && userStore.user.role === 'admin'" color="red" icon="delete" @click="deleteGymnastics"/>
      </div>
    </template>
  </q-table>
  <CreateGymnasticsDialog :open="createDialog" @close="createDialog = false" @update="update"/>
</template>

<script>
import AddGrade from "../dialogs/AddGrade.vue";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {ref} from "vue"
import CreateGymnasticsDialog from "../dialogs/CreateGymnasticsDialog.vue";
import {getSubjects} from "../api/subject";
import {exportFile, useQuasar} from "quasar";
import {deleteGymnasticByID} from "../api/competition";
import {useUserStore} from "../../stores/user";

export default {
  name: "GymnasticsTable",
  props: {
    data: Array,
    name: String,
  },
  components: {
    AddGrade,
    CreateGymnasticsDialog
  },
  setup(props, {emit}) {
    const filter = ref('')
    const columns = ref([
      {
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left'
      }, {
        name: 'year',
        label: 'Year',
        field: 'year',
        align: 'left'
      }, {
        name: 'club',
        label: 'Club',
        field: 'club',
        align: 'left'
      },
      // {
      //   name: 'ball',
      //   label: 'Ball',
      //   field: 'ball',
      //   format: (val, row) => row.scores[0].a + row.scores[0].e + row.scores[0].d
      // },
      {
        name: 'total',
        label: 'Total',
        field: 'total',
        sortable: true
      }
    ])
    const $router = useRouter()

    const userStore = useUserStore()
    const $route = useRoute()
    const competitionId = $route.params.id

    const createDialog = ref(false)

    const report = async () => {
      function wrapCsvValue(val, formatFn, row) {
        let formatted = formatFn !== void 0
            ? formatFn(val, row)
            : val

        formatted = formatted === void 0 || formatted === null
            ? ''
            : String(formatted)

        return `${formatted}`
      }

      const content = [columns.value.map(col => wrapCsvValue(col.label)).join(";")].concat(
          props.data.map(row => columns.value.map(col => wrapCsvValue(
              typeof col.field === 'function'
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
          )).join(';'))
      ).join('\n').replaceAll('.', ',')
      const status = exportFile(
          props.name + '.csv',
          content,
          'text/csv'
      )
      console.log(content)
    }

    const openGymnastic = function (event, row) {
      $router.push('/competition/' + competitionId + '/' + row.id)
    }

    const update = () => {

      console.log('update')
      emit('update')
    }

    getSubjects().then((subjects) => {
      let cols = subjects.map((subject, index) => {
        return {
          name: subject.name,
          label: subject.name.split('')[0].toUpperCase() + subject.name.substring(1),
          field: subject.name,
          format: (val, row) => +row.scores[index].a + +row.scores[index].e + +row.scores[index].d
        }
      })
      columns.value = [...columns.value.slice(0, columns.value.length - 1), ...cols, columns.value[columns.value.length - 1]];
    })

    const selected = ref([])

    const $q = useQuasar();

    const deleteGymnastics = async () => {
      try {
        $q.loading.show()
        await Promise.all(selected.value.map(gymn => deleteGymnasticByID(competitionId, gymn.id)))
        $q.notify({message: "Gymnastics were deleted!", color: 'green'})
        update();
      } catch (e) {
        console.log(e.message)
        $q.notify({message: "There was an error. Please try again later", color: 'red'})
      }
    }

    return {columns, filter, openGymnastic, userStore, deleteGymnastics, selected, createDialog, update, report}
  },
}
</script>

<style scoped>
.export-icon {
  margin-left: 6px;
}

.competition-name {
  font-size: 20px;
  margin-left: 10px
}
</style>