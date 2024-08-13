import { getAuth } from "firebase/auth";
import { useState } from "react";

function Settings() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [username, setUsername] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  return (
    <div>
      <form action="">
        <div>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button>Update Username 😎</button>
        </div>
        <div>
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button>Update Email 📨</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
