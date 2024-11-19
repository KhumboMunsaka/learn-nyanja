import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
function Login() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState(false);
  const [resetMessage, setResetMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function HandleSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // ...
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  }

  function handleForgotSubmit(e) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetMessage("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setResetMessage(errorMessage);
        // ..
      });
    setEmail("");
  }
  return (
    <>
      {!resetEmail ? (
        <div>
          <form onSubmit={HandleSubmit} className={styles.loginForm}>
            <p>{errorMessage}</p>
            <div>
              <label htmlFor="email">Email address ✉️</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Your Email"
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
              <Button>Login 🔓</Button>
            </div>
            <div className={styles.backAndReset}>
              <Button
                onClick={() => setResetEmail(true)}
                className={styles.forgotPassword}
              >
                Forgotten Password? 🤯
              </Button>
              <Button onClick={() => navigate(-1)}>Back</Button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleForgotSubmit} className={styles.loginForm}>
            <p>{resetMessage}</p>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Button>Reset Password</Button>
            </div>
          </form>
          <button onClick={() => setResetEmail(false)}>Back</button>
        </div>
      )}
    </>
  );
}

export default Login;
