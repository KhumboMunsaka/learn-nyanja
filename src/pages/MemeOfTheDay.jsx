import { useContext } from "react";
import ModContext from "../contexts/MODContext";
import styles from "../styles/MemeOfTheDay.module.css";

function MemeOfTheDay() {
  const { memeOfTheDay, translationText } = useContext(ModContext);

  return (
    <div className={styles.container}>
      <h3>Meme Of The Day</h3>
      {memeOfTheDay ? (
        <div>
          <img src={memeOfTheDay} alt="Meme Of The Day" />
          {translationText ? (
            <p
              dangerouslySetInnerHTML={{ __html: translationText }}
              className={styles.translation}
            />
          ) : (
            <p>No translation available.</p>
          )}
        </div>
      ) : (
        <p>There is no meme of the day...yet :(</p>
      )}
    </div>
  );
}

export default MemeOfTheDay;
