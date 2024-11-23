import { useState } from "react";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import styles from "../styles/Settings.module.css";
import Spinner from "../components/Spinner";

function Settings() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [username, setUsername] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  function handleUpdateUsername(e) {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);

    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        // Profile updated!
        setSuccessMessage("Username Updated");
        setUsername(user.displayName);
        setIsLoading(false);

        // ...
      })
      .catch((error) => {
        setErrorMessage(error);

        setIsLoading(false);
      });
  }
  function handleUpdateEmail(e) {
    setSuccessMessage(null);

    setIsLoading(true);

    e.preventDefault();
    updateEmail(auth.currentUser, email)
      .then(() => {
        // Email updated!
        setEmail(user.email);
        setSuccessMessage("Username Updated");
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error);
        setIsLoading(false);
      });
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.settings}>Settings</h2>
      <form action="" className={styles.UpdateForm}>
        <p className={styles.error}>{errorMessage}</p>
        <p className={styles.success}>{successMessage}</p>
        <div className={styles.username}>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
          />
          <button onClick={handleUpdateUsername}>
            {!isLoading ? "Update Username 😎" : <Spinner />}
          </button>
        </div>
        <div className={styles.email}>
          <label>Email:</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
          />
          <button onClick={handleUpdateEmail}>
            {!isLoading ? "Update Email 📨" : <Spinner />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
