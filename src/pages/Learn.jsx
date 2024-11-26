import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import styles from "../styles/Learn.module.css";

function Learn() {
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState({});
  const [expandedSection, setExpandedSection] = useState("");
  const [expandedLesson, setExpandedLesson] = useState("");
  const [lessonContent, setLessonContent] = useState({});
  const [exercises, setExercises] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all sections
  useEffect(() => {
    async function fetchSections() {
      try {
        const sections = [
          "nouns",
          "adjectives",
          "verbs",
          "verbsextensions",
          "pronouns",
          "conjunctions",
          "questions",
        ];
        setSections(sections);
      } catch (err) {
        console.error("Error fetching sections:", err);
        setError("Failed to load sections. Please try again.");
      }
    }
    fetchSections();
  }, []);

  // Fetch lessons for a section
  const fetchLessons = async (section) => {
    if (lessons[section]) {
      setExpandedSection(section === expandedSection ? "" : section); // Toggle section
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const sublessonsRef = collection(db, "lessons", section, "sublessons");
      const sublessonsSnapshot = await getDocs(sublessonsRef);
      const fetchedLessons = sublessonsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons((prevLessons) => ({
        ...prevLessons,
        [section]: fetchedLessons,
      }));
      setExpandedSection(section);
    } catch (err) {
      console.error("Error fetching lessons:", err);
      setError("Failed to load lessons. Please try again.");
    }
    setIsLoading(false);
  };

  // Fetch lesson content
  const fetchLessonContent = async (section, lessonId) => {
    if (lessonContent[lessonId]) {
      setExpandedLesson(lessonId === expandedLesson ? "" : lessonId); // Toggle lesson
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const lessonDocRef = doc(db, "lessons", section, "sublessons", lessonId);
      const lessonSnapshot = await getDoc(lessonDocRef);
      if (lessonSnapshot.exists()) {
        const data = lessonSnapshot.data();
        setLessonContent((prevContent) => ({
          ...prevContent,
          [lessonId]: data,
        }));
        setExpandedLesson(lessonId);
      } else {
        setError("Lesson not found.");
      }
    } catch (err) {
      console.error("Error fetching lesson content:", err);
      setError("Failed to load lesson content. Please try again.");
    }
    setIsLoading(false);
  };

  // Fetch exercises for a lesson
  const fetchExercises = async (section, lessonId) => {
    if (exercises[lessonId]) return; // Already fetched

    setIsLoading(true);
    setError("");
    try {
      const exercisesRef = collection(
        db,
        "lessons",
        section,
        "sublessons",
        lessonId,
        "exercises"
      );
      const exercisesSnapshot = await getDocs(exercisesRef);
      const fetchedExercises = exercisesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExercises((prevExercises) => ({
        ...prevExercises,
        [lessonId]: fetchedExercises,
      }));
    } catch (err) {
      console.error("Error fetching exercises:", err);
      setError("Failed to load exercises. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Learn Nyanja</h1>

      {/* Display Sections */}
      <div className={styles.sections}>
        {sections.map((section) => (
          <div key={section} className={styles.sectionItem}>
            <button
              onClick={() => fetchLessons(section)}
              className={styles.sectionButton}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>

            {/* Display Lessons */}
            {expandedSection === section && lessons[section] && (
              <div className={styles.lessons}>
                {lessons[section].map((lesson) => (
                  <div key={lesson.id} className={styles.lessonItem}>
                    <button
                      onClick={() => fetchLessonContent(section, lesson.id)}
                      className={styles.lessonButton}
                    >
                      {lesson.title}
                    </button>

                    {/* Display Lesson Content */}
                    {expandedLesson === lesson.id &&
                      lessonContent[lesson.id] && (
                        <div className={styles.lessonContent}>
                          <h3>{lessonContent[lesson.id].title}</h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: lessonContent[lesson.id].text,
                            }}
                            className={styles.richTextContent}
                          ></div>

                          <button
                            onClick={() => fetchExercises(section, lesson.id)}
                            className={styles.exerciseButton}
                          >
                            View Exercises
                          </button>

                          {exercises[lesson.id] && (
                            <div className={styles.exercises}>
                              <h4>Exercises:</h4>
                              {exercises[lesson.id].map((exercise) => (
                                <div
                                  key={exercise.id}
                                  className={styles.exerciseItem}
                                >
                                  <p>{exercise.question}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Loading and Error States */}
      {isLoading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Learn;
