import { createContext, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const ModContext = createContext();
const currentDate = new Date().toDateString();

export const ModProvider = ({ children }) => {
  const [memeOfTheDay, setMemeOfTheDay] = useState(null);

  useEffect(() => {
    const storage = getStorage();
    const fileRef = ref(storage, `mods/meme_of_the_day${currentDate}`);

    getDownloadURL(fileRef)
      .then((url) => {
        setMemeOfTheDay(url); // Save the URL in state
        console.log("Meme of the Day URL:", url); // Log the URL
      })
      .catch((error) => {
        console.log("Error fetching meme of the day:");
      });
  }, []);

  return (
    <ModContext.Provider value={{ memeOfTheDay }}>
      {children}
    </ModContext.Provider>
  );
};

export default ModContext;
