/**
 * Fetch competition from firebase
 * @param id ID of doc
 * @returns {Promise<{id: string, title: string}>}
 */
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";

export const getCompetitionByID = async (id) => {
    let data = await getDoc(doc(collection(getFirestore(), 'competitions'), id))
    if (data.exists()) {
        let gymnasticsDocs = await getDocs(collection(getFirestore(), "competitions", id, "gymnastics"))
        let gymnastics = gymnasticsDocs.docs.map(e => ({...e.data(), id: e.id}))
        console.log(gymnastics)
        let categoriesDocs = await getDocs(collection(getFirestore(), "subjects"))
        return {...data.data(), id: data.id, gymnastics, categories: categoriesDocs.docs.map(e => e.data())}
    } else {
        throw new Error("not found")
    }
}
export const getGymnasticByID = async (compId, gymnId) => {
    let data = await getDoc(doc(collection(getFirestore(), 'competitions', compId, "gymnastics"), gymnId))
    if (data.exists()) {
        let subjects = await getDocs(collection(getFirestore(), "subjects"))
        let grades = await Promise.all(subjects.docs.map(async e => {
            let gradeDoc = await getDoc(doc(collection(getFirestore(), 'competitions', compId, "gymnastics", gymnId, "scores"), e.id));
            if (!gradeDoc.exists()) {
                return null;
            }
            return {...gradeDoc.data(), id: gradeDoc.id, title:e.get('name') }
        }))
        console.log(grades.filter(e => e !== null))
        return {...data.data(), id: data.id, scores: grades.filter(e => e !== null)};
    } else {
        throw new Error("not found")
    }
}