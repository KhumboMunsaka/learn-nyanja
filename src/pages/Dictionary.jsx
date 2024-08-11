import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import SavedWords from "../components/SavedWords";
import { getAuth } from "firebase/auth";
import Spinner from "../components/Spinner";
import WordList from "../components/WordList";
import ExpandedWord from "../components/ExpandedWord";

function Dictionary() {
  const [allWords, setAllWords] = useState([]); // Store all words here
  const [filteredWords, setFilteredWords] = useState([]); // Store filtered words here
  const [searchQuery, setSearchQuery] = useState("");
  const [savedWords, setSavedWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [getMeaning, setGetMeaning] = useState(false);
  const [loading, isLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  //To get the words for the first time
  useEffect(function () {
    const getWords = async () => {
      try {
        isLoading(true);
        const querySnapshot = await getDocs(
          collection(db, "Nyanja to English")
        );
        const words = [];
        querySnapshot.forEach((doc) => {
          words.push(doc.data());
        });
        setAllWords(words); // Store all words
        setFilteredWords(words); // Initially set filteredWords to all words
        isLoading(false);
      } catch (error) {
        console.error("Error fetching documents: ", error);
        isLoading(false);
      }
    };
    isLoading(false);

    getWords();
  }, []);
  // Filter words whenever searchQuery changes
  useEffect(() => {
    const newFilteredWords = allWords.filter((word) =>
      word.word.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredWords(newFilteredWords);
  }, [searchQuery, allWords]);

  async function handleSave(word) {
    const savedWordsRef = await setDoc(doc(db, "user-faves", user.uid), {
      words: [...savedWords, word],
    });
    setSavedWords([...savedWords, word]);
  }

  function expandWord(word) {
    setGetMeaning(true);
    setSelectedWord(word);
  }
  return (
    <div>
      <label htmlFor="">search for words</label>
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
        />
      )}

      <SavedWords onHandleExpand={expandWord} />
    </div>
  );
}

export default Dictionary;
