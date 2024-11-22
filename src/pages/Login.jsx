import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import styles from "../styles/Login.module.css";
import Spinner from "../components/Spinner";
function Login() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState(false);
  const [resetMessage, setResetMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function HandleSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/dashboard", { replace: true });
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        setIsLoading(false);
      });
  }

  function handleForgotSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetMessage("Password reset email sent!");
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setResetMessage(errorMessage);
        setIsLoading(false);
      });
    setEmail("");
  }
  return (
    <>
      {!resetEmail ? (
        <div className={styles.container}>
          <form onSubmit={HandleSubmit} className={styles.loginForm}>
            <p>{errorMessage}</p>
            <div className={styles.email}>
              <label htmlFor="email">Email address ✉️</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(null);
                }}
              />
            </div>
            <div className={styles.password}>
              <label htmlFor="password">Password 🔐</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Enter Your Password"
              />
            </div>
            <div className={styles.button}>
              <Button>{!isLoading ? "Login 🔓" : <Spinner />}</Button>
            </div>
            <div className={styles.backAndReset}>
              <Button
                onClick={() => setResetEmail(true)}
                className={styles.forgotPassword}
              >
                Forgotten Password? 🤯
              </Button>
              <div>
                <Button onClick={() => navigate(-1)}>Back</Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.resetContainer}>
          <form
            onSubmit={handleForgotSubmit}
            className={styles.resetPasswordForm}
          >
            <h3>Enter Your Email To Reset Your Password</h3>
            <p>{resetMessage}</p>
            <div className={styles.forgotEmail}>
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
            <div className={styles.resetButton}>
              <Button>{!isLoading ? "Reset Password 🔑" : <Spinner />}</Button>
            </div>
          </form>
          <button onClick={() => setResetEmail(false)}>Back</button>
        </div>
      )}
    </>
  );
}

export default Login;
