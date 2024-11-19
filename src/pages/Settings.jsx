import { useState } from "react";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import styles from "../styles/Settings.module.css";
function Settings() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [username, setUsername] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);

  function handleUpdateUsername(e) {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        // Profile updated!
        console.log("username update");
        setUsername("");

        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  }
  function handleUpdateEmail(e) {
    e.preventDefault();
    updateEmail(auth.currentUser, email)
      .then(() => {
        // Email updated!
        console.log("email updated");
        setEmail("");
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  }
  return (
    <div>
      <h2 className={styles.settings}>Settings</h2>
      <form action="" className={styles.UpdateForm}>
        <div className={styles.username}>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleUpdateUsername}>Update Username 😎</button>
        </div>
        <div className={styles.email}>
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleUpdateEmail}>Update Email 📨</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
