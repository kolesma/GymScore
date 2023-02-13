<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">Create competition</div>
      </q-card-section>

      <q-card-section class="q-pt-none card">
        <q-input dense outlined v-model="title" type="text" label="Title"></q-input>
        <q-btn icon="event" color="primary" class="date">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dates" range>
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="OK" color="primary" flat v-close-popup />
              </div>            </q-date>
          </q-popup-proxy>
          Select dates
        </q-btn>
        <div class="dates">
          <div>
            Start Date: {{dates.from}}
          </div>
          <div>
            End Date: {{dates.to}}
          </div>
        </div>
        <q-input class="place" dense outlined v-model="place" type="text" label="Place"></q-input>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Create" @click="create" color="primary" v-close-popup/>
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
import {addDoc, doc, collection, getFirestore} from "firebase/firestore"
import {useCompetitionStore} from "../stores/competition";
export default {
  name: "CreateDialog",
  props: {open: Boolean},
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

    const dates = ref({from: "", to: ""})
    const title = ref("")
    const place = ref("")

    const competitionStore = useCompetitionStore()


    return {isOpen, place, dates, title, competitionStore}
  },
  methods: {
    async create() {
      let competition = {
        title: this.title,
        place: this.place,
        startDate: this.dates.from,
        endDate: this.dates.to
      }
      let result = await addDoc(collection(getFirestore(), "competitions"), competition);
      await this.competitionStore.fetchData()
      console.log(result)
    }
  }
}
</script>