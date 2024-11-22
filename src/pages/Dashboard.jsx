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

function Dashboard() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const { isLoading } = useAuth();
  const { username, setUsername, isSubmitting, setSelectedFile, handleSubmit } =
    useUpdateProfile();
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  //Retrieve Profile Picture
  useEffect(() => {
    if (user && user.photoURL) {
      const photoRef = ref(storage, user.photoURL);
      getDownloadURL(photoRef)
        .then((url) => {
          setProfilePicUrl(url);
        })
        .catch((error) => {
          console.error("Error fetching profile picture URL", error);
        });
    }
  }, [user]);

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
            {profilePicUrl && (
              <img
                src={profilePicUrl}
                alt="profile picture"
                style={{ width: "50px", height: "auto", borderRadius: "360%" }}
              />
            )}
            <button onClick={handleSignOut}>Log Out 💨</button>
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
          <h3>
            Finish Setting up profile with your username and profile picture
            (This can be changed later on)
          </h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Set Up Your Profile Picture:</label>
              <input
                label="Image"
                placeholder="Choose image"
                accept="image/png,image/jpeg"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>

            <div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </>
      )}
    </main>
  );
}

export default Dashboard;
