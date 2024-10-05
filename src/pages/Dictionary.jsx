import React, { useContext, useState, useEffect } from "react";

import WordList from "../components/WordList";
import ExpandedWord from "../components/ExpandedWord";
import SavedWords from "../components/SavedWords";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase.config";
import DictionaryContext from "../contexts/DictionaryContext";

function Dictionary() {
  const {
    allWords,
    filteredWords,
    setFilteredWords,
    savedWords,
    setSavedWords,
    loading,
  } = useContext(DictionaryContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [getMeaning, setGetMeaning] = useState(false);
  const [inEnglish, setInEnglish] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!inEnglish) {
      const newFilteredWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredWords(newFilteredWords);
    } else {
      const newFilteredWords = allWords.filter((word) =>
        word.meanings.some((meaning) =>
          meaning.translation.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredWords(newFilteredWords);
    }
    console.log("Hi");
  }, [searchQuery, allWords, setFilteredWords, inEnglish]);

  async function handleSave(word) {
    const savedWordsRef = await setDoc(doc(db, "user-faves", user.uid), {
      words: [...savedWords, word],
    });
    setSavedWords([...savedWords, word]);
  }

  async function handleRemoveWord(indexPoint) {
    const updatedWords = savedWords.filter((_, i) => i !== indexPoint);
    setSavedWords(updatedWords);
    // Update the Firestore document with the new array
    const docRef = doc(db, "user-faves", user.uid);
    await updateDoc(docRef, {
      words: updatedWords,
    });
  }

  useEffect(() => {
    async function getSavedWords() {
      try {
        const docRef = doc(db, "user-faves", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSavedWords(docSnap.data().words);
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    if (user) {
      getSavedWords();
    }
  }, [user, setSavedWords]);

  function expandWord(word) {
    setGetMeaning(true);
    setSelectedWord(word);
  }

  return (
    <div>
      <label htmlFor="">In Nyanja</label>
      <input
        type="checkbox"
        name=""
        id=""
        onChange={() => setInEnglish(!inEnglish)}
      />
      <label htmlFor="">Search for words</label>
      <input
        type="text"
        value={searchQuery}
        onFocus={() => setGetMeaning(false)}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {!getMeaning ? (
        <WordList filteredWords={filteredWords} expandWord={expandWord} />
      ) : (
        <ExpandedWord
          handleSave={handleSave}
          selectedWord={selectedWord}
          setGetMeaning={setGetMeaning}
          userID={user.uid}
        />
      )}

      <SavedWords
        onHandleExpand={expandWord}
        savedWords={savedWords}
        handleRemoveWord={handleRemoveWord}
      />
    </div>
  );
}

export default Dictionary;
