const NyanjaToEnglishCollection = "Nyanja to English";

import { getDownloadURL } from "firebase/storage";
import { db } from "./firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export function addWord() {}
