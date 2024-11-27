import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import styles from "../styles/Exercise.module.css";

function Exercise({ exercisesPath, setIsDoingExercise, isDoingExercise }) {
  const [exercises, setExercises] = useState([]);
  const [feedback, setFeedback] = useState({}); // Feedback for specific questions
  const [answeredQuestions, setAnsweredQuestions] = useState({}); // Track answered questions
  const [active, setIsActive] = useState(false);
  async function GetExercise() {
    setIsActive(true);
    try {
      const querySnapshot = await getDocs(collection(db, exercisesPath));
      const fetchedExercises = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExercises(fetchedExercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  }

  function handleAnswer(selectedIndex, correctIndex, questionId) {
    const isCorrect = selectedIndex === correctIndex;
    setFeedback((prev) => ({
      ...prev,
      [questionId]: isCorrect
        ? { message: "Correct Answer!", type: "success" }
        : { message: "Wrong Answer. Try Again.", type: "error" },
    }));

    setAnsweredQuestions((prev) => ({
      ...prev,
      [questionId]: selectedIndex,
    }));
  }

  return (
    <div className={styles.exerciseContainer}>
      <h2>Exercises</h2>

      {exercises.map((exercise) => (
        <div key={exercise.id} className={styles.exerciseCard}>
          {exercise.questions?.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className={`${styles.question} ${
                answeredQuestions[questionIndex] !== undefined
                  ? styles.answered
                  : ""
              }`}
            >
              <h3>{question.question}</h3>
              {question.options && (
                <>
                  {feedback[questionIndex] && (
                    <div
                      className={
                        feedback[questionIndex].type === "success"
                          ? styles.successFeedback
                          : styles.errorFeedback
                      }
                    >
                      {feedback[questionIndex].message}
                    </div>
                  )}
                  <ul className={styles.options}>
                    {question.options.map((option, optionIndex) => (
                      <li
                        key={optionIndex}
                        onClick={() =>
                          handleAnswer(
                            optionIndex,
                            question.correctOption,
                            questionIndex
                          )
                        }
                        className={`${styles.option} ${
                          answeredQuestions[questionIndex] === optionIndex
                            ? styles.selected
                            : ""
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
      <div className={styles.buttons}>
        {active ? null : (
          <button onClick={GetExercise} className={styles.backButton}>
            Start Quiz
          </button>
        )}

        <button
          onClick={() => setIsDoingExercise(false)}
          className={styles.backButton}
        >
          Back to Lessons
        </button>
      </div>
    </div>
  );
}

export default Exercise;
