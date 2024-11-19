import styles from "../styles/WordList.module.css";

function WordList({ filteredWords, expandWord }) {
  return (
    <div className={styles.container}>
      <h2>Words</h2>
      <ul style={{ minHeight: "10rem", overflowY: "scroll" }}>
        {filteredWords.map((word, index) => (
          <li
            key={index}
            onClick={() => expandWord(word)}
            className={styles.meanings}
          >
            - {word.word}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordList;
