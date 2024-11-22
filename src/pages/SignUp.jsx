import { useState } from "react";
import Button from "../components/Button";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import styles from "../styles/SignUp.module.css";
import Spinner from "../components/Spinner";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email == "" || password == "") {
      setError("Please Fill In All The Fields");
      return;
    }
    setIsLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);

        navigate("/update-profile");
      })

      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.container}>
      {error || <Message message={error} />}

      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <h1>Sign Up To Learn Nyanja Platorm! 📝</h1>
        <div>
          <label htmlFor="email">Email address ✉️</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter Your Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password 🔐</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            placeholder="Enter Your Password"
          />
        </div>
        <div className={styles.buttons}>
          <button>{!isLoading ? "Sign Up 📨" : <Spinner />}</button>
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
