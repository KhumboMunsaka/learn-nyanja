import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(
    function () {
      if (!user) navigate("/");
    },
    [user, navigate]
  );
  return user ? children : null;
}

export default ProtectedRoute;
