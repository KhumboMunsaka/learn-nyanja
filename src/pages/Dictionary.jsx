import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import SavedWords from "../components/SavedWords";

function Dictionary() {
  const [allWords, setAllWords] = useState([]); // Store all words here
  const [filteredWords, setFilteredWords] = useState([]); // Store filtered words here
  const [searchQuery, setSearchQuery] = useState("");
  const [savedWords, setSavedWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [getMeaning, setGetMeaning] = useState(false);
  const getWords = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Nyanja to English"));
      const words = [];
      querySnapshot.forEach((doc) => {
        words.push(doc.data());
      });
      setAllWords(words); // Store all words
      setFilteredWords(words); // Initially set filteredWords to all words
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    // Filter words whenever searchQuery changes
    const newFilteredWords = allWords.filter((word) =>
      word.word.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredWords(newFilteredWords);
  }, [searchQuery, allWords]);

  function handleSave(word) {
    setSavedWords([...savedWords, word]);
  }
  function expandWord(word) {
    setGetMeaning(true);
    setSelectedWord(word);
  }
  return (
    <>
      <label htmlFor="">search for words</label>
      <input
        type="text"
        value={searchQuery}
        onFocus={() => setGetMeaning(false)}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={getWords}>Get Words</button>
      {!getMeaning ? (
        <div>
          <div>
            <h2>Words</h2>
            <ul style={{ height: "150px", overflowY: "scroll" }}>
              {filteredWords.map((word, index) => (
                <li key={index} onClick={() => expandWord(word)}>
                  {" "}
                  - {word.word}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          {selectedWord?.word}
          {selectedWord?.meanings.map((meaning, index) => (
            <p key={index}>
              {" "}
              {index + 1}. {meaning.translation}
            </p>
          ))}
          <button onClick={() => handleSave(selectedWord)}>
            Save This Word
          </button>
          <button onClick={() => setGetMeaning(false)}>Back</button>
        </div>
      )}

      <SavedWords savedWords={savedWords} />
    </>
  );
}

export default Dictionary;
