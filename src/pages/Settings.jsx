import { useState } from "react";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";

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
      <form action="">
        <div>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleUpdateUsername}>Update Username 😎</button>
        </div>
        <div>
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleUpdateEmail}>Update Email 📨</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
