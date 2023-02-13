<template>
  <q-table
      title="Gymnastics"
      :rows="data"
      :columns="columns"
      row-key="name"
      @row-click="open = true"
  />
<!--  <AddGrade :open="open" @close="open = false"/>-->
</template>

<script>
import AddGrade from "../dialogs/AddGrade.vue";
import {ref} from "vue"

export default {
  name: "GymnasticsTable",
  props: {
    data: Array
  },
  components: {
    AddGrade
  },
  setup() {
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
        format: (val, row) => val.total
      }, {
        name: 'floor',
        label: 'Floor',
        field: 'floor',
        format: (val, row) => val.total
      }, {
        name: 'total',
        label: 'Total',
        field: 'total',
      }
    ]

    const open = ref(false)


    return {columns, open}
  }
}
</script>

<style scoped>

</style>