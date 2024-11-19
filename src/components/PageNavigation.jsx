import { NavLink } from "react-router-dom";
import styles from "../styles/PageNavigation.module.css";

function PageNavigation() {
  return (
    <ul className={styles.links}>
      <li>
        <NavLink to="learn" className={styles.link}>
          🥸 Learn
        </NavLink>
      </li>
      <li>
        <NavLink to="mod" className={styles.link}>
          💀 MOD
        </NavLink>
      </li>
      <li>
        <NavLink to="dictionary" className={styles.link}>
          📖 Dictionary
        </NavLink>
      </li>
      <li>
        <NavLink to="settings" className={styles.link}>
          ⚙️ Settings
        </NavLink>
      </li>
    </ul>
  );
}

export default PageNavigation;
