function WordList({ filteredWords, expandWord }) {
  return (
    <div>
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
    </div>
  );
}

export default WordList;
