function SavedWords({ onHandleExpand, savedWords, handleRemoveWord }) {
  return (
    <div>
      <h2>Saved Words 🔒</h2>
      <div>
        {savedWords.map((word, index) => (
          <li key={index} style={{ display: "flex", overflowY: "none" }}>
            <p onClick={() => onHandleExpand(word)}>- {word.word}: </p>
            <p> {word.meanings[0]?.translation} </p>
            <span onClick={() => handleRemoveWord(index)}>remove word</span>
          </li>
        ))}
      </div>
    </div>
  );
}

export default SavedWords;
