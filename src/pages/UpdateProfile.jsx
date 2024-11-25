import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/UpdateProfile.module.css";
import { getAuth, updateProfile } from "firebase/auth";
import Spinner from "../components/Spinner";

function UpdateProfile() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home if not logged in
    }
  }, [user, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        setIsLoading(false);
        setMessage("Username Updated");
        navigate("/dashboard");
      })
      .catch((error) => {
        setMessage(error);
        setIsLoading(false);
      });
  }
  console.log(user);
  console.log(username);
  return (
    <div className={styles.container}>
      <h1>Set up your username. (This can be change later on)</h1>
      <form action="" onSubmit={handleSubmit}>
        <h4>{message}</h4>
        <label>Set Username</label>
        <input
          placeholder="Enter Your Username"
          onChange={(e) => {
            setUsername(e.target.value);
            setMessage(null);
          }}
        />
        <button>{!isLoading ? "Set Username" : <Spinner />}</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
