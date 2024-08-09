function SavedWords({ savedWords }) {
  return (
    <div>
      <h2>Saved Words 🔒</h2>
      <div>
        {savedWords.map((word, index) => (
          <li key={index} style={{ display: "flex", overflowY: "none" }}>
            <p>- {word.word}: </p>
            <p> {word.meanings[0]?.translation} </p>
          </li>
        ))}
      </div>
    </div>
  );
}

export default SavedWords;
