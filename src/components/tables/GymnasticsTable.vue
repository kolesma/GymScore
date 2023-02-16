<template>
  <q-table
      title="Gymnastics"
      :rows="data"
      :columns="columns"
      row-key="name"
      @row-click="openGymnastic"
  >
    <template v-slot:top>
      <q-btn color="primary" label="Add gymnastic" @click="createDialog = true"/>
      <q-space/>
      <q-input borderless dense debounce="300" color="primary" v-model="filter">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
    </template>
  </q-table>
  <CreateGymnasticsDialog :open="createDialog" @close="createDialog = false" @update="update" />
</template>

<script>
import AddGrade from "../dialogs/AddGrade.vue";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {ref} from "vue"
import CreateGymnasticsDialog from "../dialogs/CreateGymnasticsDialog.vue";

export default {
  name: "GymnasticsTable",
  props: {
    data: Array
  },
  components: {
    AddGrade,
    CreateGymnasticsDialog
  },
  setup(props, {emit}) {
    const columns = [
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
      }, {
        name: 'ball',
        label: 'Ball',
        field: 'ball',
        // format: (val, row) => val.total || 0
      }, {
        name: 'floor',
        label: 'Floor',
        field: 'floor',
        // format: (val, row) => val.total || 0
      }, {
        name: 'total',
        label: 'Total',
        field: 'total',
      }
    ]
    const $router = useRouter()
    const $route = useRoute()
    const competitionId = $route.params.id

    const createDialog = ref(false)

    const openGymnastic = function(event, row) {
      $router.push('/competition/' + competitionId + '/' + row.id)
    }

    const update = () => {
      emit('update')
    }
    return {columns, openGymnastic, createDialog, update}
  }
}
</script>

<style scoped>

</style>