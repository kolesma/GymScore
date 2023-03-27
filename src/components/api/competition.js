/**
 * Fetch competition from firebase
 * @param id ID of doc
 * @returns {Promise<{id: string, title: string}>}
 */
import {
    collection, deleteDoc, doc, getDoc, query, onSnapshot, orderBy, getDocs, getFirestore
} from "firebase/firestore";

export const getCompetitionByID = async (id) => {
    let data = await getDoc(doc(collection(getFirestore(), 'competitions'), id))
    let categoriesDocs = await getDocs(collection(getFirestore(), "subjects"))
    console.log('subjects and comp fetched')
    if (data.exists()) {
        let gymnasticsDocs = await getDocs(collection(getFirestore(), "competitions", id, "gymnastics"))
        console.log('gymns fetched')
        let gymnastics = gymnasticsDocs.docs.map(e => ({...e.data(), id: e.id}))
        return {...data.data(), id: data.id, gymnastics, categories: categoriesDocs.docs.map(e => e.data())}
    } else {
        throw new Error("Not found")
    }
}
export const getGymnasticByID = async (compId, gymnId) => {
    let data = await getDoc(doc(collection(getFirestore(), 'competitions', compId, "gymnastics"), gymnId))
    let subjects = await getDocs(query(collection(getFirestore(), "subjects"), orderBy('name')))
    if (data.exists()) {
        let grades = await Promise.all(subjects.docs.map(async e => {
            let gradeDoc = await getDoc(doc(collection(getFirestore(), 'competitions', compId, "gymnastics", gymnId, "scores"), e.id));
            if (!gradeDoc.exists()) {
                return null;
            }
            return {...gradeDoc.data(), id: gradeDoc.id, title: e.get('name')}
        }))
        return {...data.data(), id: data.id, scores: grades.filter(e => e !== null)};
    } else {
        throw new Error("Not found")
    }
}

export const deleteGymnasticByID = async (comp, id) => {
    await deleteDoc(doc(collection(getFirestore(), "competitions", comp, "gymnastics"), id))
}


export const subscribeGymnastic = async (compId, gymnId, callback) => {
    onSnapshot(doc(collection(getFirestore(), 'competitions', compId, "gymnastics"), gymnId), async (data) => {
        let subjects = await getDocs(query(collection(getFirestore(), "subjects"), orderBy('name')))
        let grades = await Promise.all(subjects.docs.map(async e => {
            let gradeDoc = await getDoc(doc(collection(getFirestore(), 'competitions', compId, "gymnastics", gymnId, "scores"), e.id));
            if (!gradeDoc.exists()) {
                return null;
            }
            return {...gradeDoc.data(), id: gradeDoc.id, title: e.get('name')}
        }))

        callback({...data.data(), id: data.id, scores: grades.filter(e => e !== null)});
    })

}