import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { getAuth } from "firebase/auth";
import Authentication from "../components/Authentication";
import useUpdateProfile from "../hooks/UpdateProfileLogic";
import styles from "../styles/UpdateProfile.module.css";
console.log(styles);
function UpdateProfile() {
  const { username, setUsername, isSubmitting, setSelectedFile, handleSubmit } =
    useUpdateProfile();
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home if not logged in
    }
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      <h3>
        Finish Setting up your profile with a username and profile picture (This
        can be changed later on)
      </h3>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.usernameForm}
          />
        </div>
        <div className={styles["form-group"]}>
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
