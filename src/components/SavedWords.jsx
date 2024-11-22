import styles from "../styles/SavedWords.module.css";

function SavedWords({ onHandleExpand, savedWords, handleRemoveWord }) {
  return (
    <div className={styles.container}>
      <h2>Saved Words 🔒</h2>
      <div>
        {savedWords.map((word, index) => (
          <li
            key={index}
            style={{ display: "flex", overflowY: "none" }}
            className={styles.word}
          >
            <div className={styles.savedWord}>
              <div className={styles.wordText}>
                <h4 onClick={() => onHandleExpand(word)}>- {word.word}: </h4>
                <p> {word.meanings[0]?.translation} </p>
              </div>
              <span onClick={() => handleRemoveWord(index)}>
                Remove word 🗑️
              </span>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default SavedWords;
