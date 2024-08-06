import { getAuth } from "firebase/auth";
import Authentication from "../components/Authentication";
import Dashboard from "./Dashboard";

function Homepage() {
  const auth = getAuth();
  const user = auth.currentUser;
  return <div>{user == null ? <Authentication /> : <Dashboard />}</div>;
}

export default Homepage;
