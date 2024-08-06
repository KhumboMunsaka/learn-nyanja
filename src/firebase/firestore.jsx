const NyanjaToEnglishCollection = "Nyanja to English";

import { getDownloadURL } from "firebase/storage";
import { db } from "./firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export async function getWords() {
  const getWords = query(collection(db, NyanjaToEnglishCollection));
  const querySnapshot = getDocs(getWords);
  let allWords = [];
  for (const documentSnapshot of querySnapshot.docs) {
    const word = documentSnapshot.data();
    await allWords.push({
      ...word,
      id: documentSnapshot.id,
    });
  }
}
