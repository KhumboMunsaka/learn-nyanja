import { useState } from "react";
import Button from "../components/Button";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useAuth } from "../firebase/auth";
import styles from "../styles/SignUp.module.css";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const provider = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("success");
        // ...
        navigate("/update-profile");
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  }

  return (
    <div>
      {error || <Message message={error} />}

      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <div>
          <label htmlFor="email">Email address ✉️</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password 🔐</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div>
          <button>Sign Up 📨</button>
          <Button
            onClick={() => navigate(-1)}
            className={styles.forgotPassword}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
