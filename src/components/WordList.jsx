import { useRef } from "react";
import styles from "../styles/WordList.module.css";

function WordList({ filteredWords, expandWord }) {
  const listRef = useRef(null);

  const startScrolling = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 50, // Scroll down 50px
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  const stopScrolling = () => {
    // Stop scrolling by clearing the interval (if implemented)
  };

  return (
    <div className={styles.container}>
      <h2>Words 📖</h2>
      <ul
        ref={listRef}
        className={styles.scrollable}
        onMouseEnter={startScrolling}
        onMouseLeave={stopScrolling}
      >
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
