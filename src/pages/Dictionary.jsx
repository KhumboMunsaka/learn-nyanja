import { useContext, useState, useEffect } from "react";

import WordList from "../components/WordList";
import ExpandedWord from "../components/ExpandedWord";
import SavedWords from "../components/SavedWords";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase.config";
import DictionaryContext from "../contexts/DictionaryContext";
import styles from "../styles/Dictionary.module.css";
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
    <div className={styles.container}>
      <div className={styles.targetLanguage}>
        <label htmlFor="">In Nyanja?</label>
        <input
          type="checkbox"
          name=""
          id=""
          className={styles.checkbox}
          onChange={() => setInEnglish(!inEnglish)}
        />
      </div>
      <label htmlFor="" className={styles.informUser}>
        {searchQuery == "" ? (
          <p>Search the Dictionary For The Word You Want To Know</p>
        ) : (
          <>
            {!inEnglish ? (
              <p>
                You are searching for the meaning of {searchQuery} in English
              </p>
            ) : (
              <p>
                <p>
                  You are searching for the meaning of {searchQuery} in Nyanja
                </p>
              </p>
            )}
          </>
        )}
      </label>
      <input
        type="text"
        value={searchQuery}
        onFocus={() => setGetMeaning(false)}
        placeholder="Search"
        className={styles.searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <section className={styles.wordList}>
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
      </section>
    </div>
  );
}

export default Dictionary;
