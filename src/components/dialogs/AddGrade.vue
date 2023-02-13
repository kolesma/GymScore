<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">Add new grades</div>
      </q-card-section>

      <q-card-section class="q-pt-none card">
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Create" @click="add" color="primary" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px
}

.date {
  margin-top: 10px;
}

.dates {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.dates > * {
  width: 50%;
  text-align: center;
}

.place {
  margin-top: 10px;
}
</style>

<script>
import {computed, ref} from "vue";

export default {
  name: "AddGrade",
  props: ['open'],
  setup(props, {emit}) {
    const isOpen = computed({
          get() {
            return props.open
          },
          set(newValue) {
            emit('close', newValue)
          }
        }
    )


    return {isOpen}
  },
  methods: {
    add() {
      console.log('add')
    }
  }
}
</script>