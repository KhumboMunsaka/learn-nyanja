import { NavLink } from "react-router-dom";
import styles from "../styles/Authentication.module.css";
function Authentication() {
  return (
    <div className={styles.welcomeScreen}>
      <h1>Welcome to the Learn Nyanja Platorm</h1>
      <ul className={styles.navbar}>
        <NavLink to="/signup">
          <li>Sign Up ✍️</li>
        </NavLink>
        <NavLink to="/login">
          <li>Login 👤</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Authentication;
