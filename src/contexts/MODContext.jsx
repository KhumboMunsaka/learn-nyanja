import { createContext, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const ModContext = createContext();
const currentDate = new Date()
  .toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  .replace(/,/g, "");

export const ModProvider = ({ children }) => {
  const [memeOfTheDay, setMemeOfTheDay] = useState(null);
  const [translationText, setTranslationText] = useState(null);

  useEffect(() => {
    const fetchMemeData = async () => {
      try {
        // Fetch the image URL from Firebase Storage
        const storage = getStorage();
        const fileRef = ref(storage, `mods/meme_of_the_day${currentDate}`);
        const imageUrl = await getDownloadURL(fileRef);
        setMemeOfTheDay(imageUrl);

        // Fetch the translation text from Firestore
        const db = getFirestore();
        const modsCollection = collection(db, "mods");
        const q = query(modsCollection, where("memeDate", "==", currentDate));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const { translation } = doc.data();
            setTranslationText(translation);
          });
        } else {
          console.log("No matching document for the current date");
        }
      } catch (error) {
        console.error("Error fetching meme data:", error);
      }
    };

    fetchMemeData();
  }, []);

  return (
    <ModContext.Provider value={{ memeOfTheDay, translationText }}>
      {children}
    </ModContext.Provider>
  );
};

export default ModContext;
