import { createContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

const DictionaryContext = createContext();

export const DictionaryProvider = ({ children }) => {
  const [allWords, setAllWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [savedWords, setSavedWords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(
          collection(db, "Nyanja to English")
        );
        const words = [];
        querySnapshot.forEach((doc) => {
          words.push(doc.data());
        });
        console.log("I called the database");
        setAllWords(words);
        setFilteredWords(words); // Initialize filteredWords with all words
      } catch (error) {
        console.error("Error fetching words:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  return (
    <DictionaryContext.Provider
      value={{
        allWords,
        filteredWords,
        setFilteredWords,
        savedWords,
        setSavedWords,
        loading,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};

export default DictionaryContext;
