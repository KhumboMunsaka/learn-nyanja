function ExpandedWord({ selectedWord, handleSave, setGetMeaning }) {
  return (
    <div>
      {selectedWord?.word}
      {selectedWord?.meanings.map((meaning, index) => (
        <p key={index}>
          {" "}
          {index + 1}. {meaning.translation}
        </p>
      ))}
      <button onClick={() => handleSave(selectedWord)}>Save This Word</button>
      <button onClick={() => setGetMeaning(false)}>Back</button>
    </div>
  );
}

export default ExpandedWord;
