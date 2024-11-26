import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";
import { useAuth } from "../firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import useUpdateProfile from "../hooks/UpdateProfileLogic";
import Button from "../components/Button";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebase.config";
import styles from "../styles/Dashboard.module.css";
import UpdateProfile from "./UpdateProfile";

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
