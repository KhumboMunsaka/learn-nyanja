import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

function ExpandedWord({ selectedWord, handleSave, setGetMeaning }) {
  const [isAlreadySaved, setIsAlreadySaved] = useState(true);

  useEffect(() => {
    async function findSavedWords() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user || !selectedWord) return;

      const docRef = doc(db, "user-faves", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const savedWords = docSnap.data().words;
        // Check if the selected word is in the savedWords array
        const wordExists = savedWords.some(
          (word) => word.word === selectedWord.word
        );
        setIsAlreadySaved(wordExists);
      } else {
        console.log("No such document!");
      }
    }

    findSavedWords();
  }, [selectedWord]);

  return (
    <div>
      {selectedWord?.word}
      {selectedWord?.meanings.map((meaning, index) => (
        <p key={index}>
          {index + 1}. {meaning.translation}
        </p>
      ))}
      {!isAlreadySaved && (
        <button onClick={() => handleSave(selectedWord)}>Save This Word</button>
      )}
      <button onClick={() => setGetMeaning(false)}>Back</button>
    </div>
  );
}

export default ExpandedWord;
