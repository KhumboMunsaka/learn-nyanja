import Authentication from "../components/Authentication";
import Dashboard from "./Dashboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/Homepage.module.css";
function Homepage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  //To Check if there is a user and set them up
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate("/dashboard");
      } else {
        setUser(null);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <div className={styles.container}>
      {user == null ? <Authentication /> : <Dashboard />}
    </div>
  );
}

export default Homepage;
