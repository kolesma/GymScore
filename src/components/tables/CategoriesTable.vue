<template>
  <q-table
      title="Categories"
      :rows="data"
      grid
      :columns="columns"
      row-key="name"
  />
</template>

<script>
export default {
  name: "CategoriesTable",
  props: {
    data: Array
  },
  setup() {
    const columns = [
      {
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left'
      },
    ]

    return {columns}
  }
}
</script>

<style scoped>

</style>