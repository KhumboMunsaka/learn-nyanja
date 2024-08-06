import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();

// Create a context with a default value
const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

// Custom hook to manage Firebase authentication state
function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  const authStateChanged = (user) => {
    setIsLoading(true); // Start loading state when auth state changes
    if (!user) {
      setAuthUser(null);
    } else {
      setAuthUser({ uid: user.uid, email: user.email });
    }
    setIsLoading(false); // End loading state once processing is done
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return { authUser, isLoading };
}

// Context provider component
export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();

  return (
    <AuthUserContext.Provider value={(auth, provider)}>
      {children}
    </AuthUserContext.Provider>
  );
}

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthUserContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthUserProvider");
  return context;
}
