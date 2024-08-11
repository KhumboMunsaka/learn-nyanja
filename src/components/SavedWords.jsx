import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function SavedWords({ onHandleExpand }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const [savedWords, setSavedWords] = useState([]);

  const docRef = doc(db, "user-faves", user.uid);

  async function handleRemoveWord(indexPoint) {
    const updatedWords = savedWords.filter((_, i) => i !== indexPoint);
    setSavedWords(updatedWords);
    // Update the Firestore document with the new array
    const docRef = doc(db, "user-faves", user.uid);
    await updateDoc(docRef, {
      words: updatedWords,
    });
  }
  // To get the saved words
  useEffect(() => {
    async function getSavedWords() {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSavedWords(docSnap.data().words); // Assuming words are stored as an array in the document
        }
      } catch (err) {
        console.log(err.message);
        console.log("No such document!");
      }
    }

    if (user) {
      getSavedWords();
    }
  }, [user]); // Only run when `user` changes (e.g., on login)

  return (
    <div>
      <h2>Saved Words 🔒</h2>
      <div>
        {savedWords.map((word, index) => (
          <li key={index} style={{ display: "flex", overflowY: "none" }}>
            <p onClick={() => onHandleExpand(word)}>- {word.word}: </p>
            <p> {word.meanings[0]?.translation} </p>
            <span onClick={() => handleRemoveWord(index)}>remove word</span>
          </li>
        ))}
      </div>
    </div>
  );
}

export default SavedWords;
