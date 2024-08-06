import { NavLink } from "react-router-dom";

function Authentication() {
  return (
    <div>
      <>
        Welcome to the Homepage!
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Login</NavLink>
      </>
    </div>
  );
}

export default Authentication;
