import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

function ExpandedWord({ selectedWord, handleSave, setGetMeaning }) {
  const [isAlreadySaved, setIsAlreadySaved] = useState(true);
  const [audioURL, setAudioURL] = useState(null);
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

      // Clear previous audio element if it exists
      const existingAudio = document.querySelector("audio[data-word]");
      if (existingAudio) {
        existingAudio.remove();
      }
      // Create a reference to the file to download
      const storage = getStorage();
      const fileName = `${selectedWord.word}.webm`; // Match the filename used during upload
      const audioRef = ref(storage, `audios/${fileName}`);

      // Get the download URL
      getDownloadURL(audioRef)
        .then((url) => {
          // const audio = document.createElement("audio");
          // audio.src = url;
          // audio.controls = true;
          // document.body.appendChild(audio);
          // console.log(audio);
          setAudioURL(url);
        })
        .catch((error) => {
          console.error("Error fetching audio:", error.code);
        });
    }

    // Clear audio URL when component unmounts or selectedWord changes
    findSavedWords();
    return () => {
      setAudioURL(null);
    };
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
      {audioURL && <audio src={audioURL} controls />}
      <button onClick={() => setGetMeaning(false)}>Back</button>
    </div>
  );
}

export default ExpandedWord;
