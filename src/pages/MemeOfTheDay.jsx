import { useContext } from "react";
import ModContext from "../contexts/MODContext";
import styles from "../styles/MemeOfTheDay.module.css";
function MemeOfTheDay() {
  const { memeOfTheDay, translationText } = useContext(ModContext);

  // Convert translationText to plain text
  const plainText = translationText ? stripHTML(translationText) : "";

  return (
    <div className={styles.container}>
      <h3>Meme Of The Day</h3>
      {memeOfTheDay ? (
        <div>
          <img src={memeOfTheDay} alt="Meme Of The Day" />
          <p>{plainText}</p>
        </div>
      ) : (
        <p>There is no meme of the day...yet :(</p>
      )}
    </div>
  );
}

// Utility function to remove HTML tags
const stripHTML = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

export default MemeOfTheDay;
