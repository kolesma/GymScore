/**
 * Fetch competition from firebase
 * @param id ID of doc
 * @returns {Promise<{id: string, title: string}>}
 */
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";

export const getCompetitionByID = async (id) => {
    let data = await getDoc(doc(collection(getFirestore(), 'competitions'), id))
    if (data.exists()) {
        let gymnastics = [{
            name: "Kira", year: 1999, club: 'Arsenal', total: 26, ball: {
                difficulty: 6, execution: 9, total: 15
            }, floor: {
                difficulty: 7, execution: 4, total: 11
            }
        }] //todo fetch from firebase

        let categoriesDocs = await getDocs(collection(getFirestore(), "subjects"))
        return {...data.data(), id: data.id, gymnastics, categories: categoriesDocs.docs.map(e => e.data())}
    } else {
        throw new Error("not found")
    }
}