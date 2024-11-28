import styles from "../styles/ExpandedSection.module.css";

function ExpandedSection({
  lessons,
  section,
  fetchLessonContent,
  expandedLesson,
  lessonContent,
  fetchExercises,
  exercises,
}) {
  return (
    <div className={styles.container}>
      {lessons[section].map((lesson) => (
        <div key={lesson.id} className={styles.lessonItem}>
          <button
            onClick={() => fetchLessonContent(section, lesson.id)}
            className={styles.lessonButton}
          >
            {lesson.title}
          </button>
          <button
            onClick={() => fetchExercises(section, lesson.id)}
            className={styles.exerciseButton}
          >
            View Exercises
          </button>
          {/* Display Lesson Content */}
          {expandedLesson === lesson.id && lessonContent[lesson.id] && (
            <div className={styles.lessonContent}>
              <h3>{lessonContent[lesson.id].title}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: lessonContent[lesson.id].text,
                }}
                className={styles.richTextContent}
              ></div>
              {exercises[lesson.id] && exercises[lesson.id].length > 0 ? (
                <div className={styles.exercises}>
                  <h4>Exercises:</h4>
                  {exercises[lesson.id].map((exercise) => (
                    <div key={exercise.id} className={styles.exerciseItem}>
                      <p>{exercise.question}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExpandedSection;
