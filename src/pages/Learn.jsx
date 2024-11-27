import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import styles from "../styles/Learn.module.css";
import ExpandedSection from "../components/ExpandedSection";
import Exercise from "../components/Exercise";
function Learn() {
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState({});
  const [expandedSection, setExpandedSection] = useState("");
  const [expandedLesson, setExpandedLesson] = useState("");
  const [lessonContent, setLessonContent] = useState({});
  const [exercises, setExercises] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDoingExercise, setIsDoingExercise] = useState(false);
  const [exercisePath, setExercisePath] = useState("");
  const [hideSections, setHideSections] = useState(false);

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

  const fetchLessons = async (section) => {
    if (lessons[section]) {
      setExpandedSection(section === expandedSection ? "" : section);
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

  const fetchLessonContent = async (section, lessonId) => {
    const togglingOff = lessonId === expandedLesson;
    setHideSections(!togglingOff);
    setExpandedLesson(togglingOff ? "" : lessonId);

    if (lessonContent[lessonId]) {
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
      } else {
        setError("Lesson not found.");
      }
    } catch (err) {
      console.error("Error fetching lesson content:", err);
      setError("Failed to load lesson content. Please try again.");
    }
    setIsLoading(false);
  };

  const fetchExercises = (section, lessonId) => {
    setIsDoingExercise(true);
    setExercisePath(`lessons/${section}/sublessons/${lessonId}/exercises`);
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Learn Nyanja</h1>
        <h3>{`Select a Section You'd like to learn`}</h3>
        {!isDoingExercise ? (
          <div className={styles.sections}>
            {sections
              .filter((section) => !hideSections || section === expandedSection)
              .map((section) => (
                <div key={section} className={styles.sectionItem}>
                  <button
                    onClick={() => fetchLessons(section)}
                    className={styles.sectionButton}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>

                  {expandedSection === section && lessons[section] && (
                    <ExpandedSection
                      lessons={lessons}
                      section={section}
                      fetchLessonContent={fetchLessonContent}
                      expandedLesson={expandedLesson}
                      lessonContent={lessonContent}
                      fetchExercises={fetchExercises}
                      exercises={exercises}
                    />
                  )}
                </div>
              ))}
          </div>
        ) : (
          <Exercise
            exercisesPath={exercisePath}
            isDoingExercise={isDoingExercise}
            setIsDoingExercise={setIsDoingExercise}
          />
        )}

        {isLoading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
}

export default Learn;
