import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";
import { useAuth } from "../firebase/auth";
import { deleteUser, getAuth, signOut } from "firebase/auth";
import useUpdateProfile from "../hooks/UpdateProfileLogic";
import styles from "../styles/Dashboard.module.css";
import UpdateProfile from "./UpdateProfile";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
function Dashboard() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const { isLoading } = useAuth();
  const { username, setUsername, isSubmitting, setSelectedFile, handleSubmit } =
    useUpdateProfile();
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("you have signed out");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };
  function handleDelete() {
    const auth = getAuth();
    const user = auth.currentUser;

    // Prompt the user to re-enter their password (example for email/password authentication)
    const password = prompt(
      "Please confirm your password to delete your account:"
    );
    if (!password) {
      console.log("Password is required for deletion");
      return;
    }

    // Create credentials for reauthentication
    const credential = EmailAuthProvider.credential(user.email, password);

    // Reauthenticate user
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // Proceed with account deletion
        deleteUser(user)
          .then(() => {
            console.log("Account deleted successfully.");
            navigate("/"); // Navigate to home or any other page
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      })
      .catch((error) => {
        console.error("Reauthentication failed:", error);
        alert("Reauthentication failed. Please try again.");
      });
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    //Render form to update information in case there is not username
    <main className={styles.container}>
      {user?.displayName != null ? (
        <div className={styles.dashboardContainer}>
          <div className={styles.userDetails}>
            <p className={styles.displayName}>Welcome {user.displayName}</p>
            <button onClick={handleSignOut} className={styles.logOut}>
              Log Out 💨
            </button>{" "}
            <button onClick={handleDelete} className={styles.deleteButton}>
              Delete Account 🗑️
            </button>
          </div>
          <section className={styles.dashboard}>
            <PageNavigation className={styles.navbar} />
            <div className={styles.mainContent}>
              <Outlet />
            </div>
          </section>
        </div>
      ) : (
        <>
          <UpdateProfile />
        </>
      )}
    </main>
  );
}

export default Dashboard;
