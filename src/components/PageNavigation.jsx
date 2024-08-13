import { NavLink } from "react-router-dom";

function PageNavigation() {
  return (
    <ul>
      <li>
        <NavLink to="learn"> 🥸 Learn</NavLink>
      </li>
      <li>
        <NavLink to="mod"> 💀 MOD</NavLink>
      </li>
      <li>
        <NavLink to="dictionary"> 📖 Dictionary</NavLink>
      </li>
      <li>
        <NavLink to="settings"> ⚙️ Settings</NavLink>
      </li>
    </ul>
  );
}

export default PageNavigation;
