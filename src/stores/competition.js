import {defineStore} from 'pinia'
import {collection, getDocs, getFirestore} from "firebase/firestore"

export const useCompetitionStore = defineStore('competition', {
    state: () => ({data: []}),
    actions: {
        setData(data) {
            this.data = data
        },
        async fetchData() {
            let docs = await getDocs(collection(getFirestore(), "competitions"))
            this.data = await Promise.all(docs.docs.map((doc) => {
                return {
                    id: doc.id,
                    title: doc.get('title'),
                    place: doc.get('place'),
                    startDate: doc.get('startDate'),
                    endDate: doc.get('endDate')
                }
            }))
        }
    }
})
