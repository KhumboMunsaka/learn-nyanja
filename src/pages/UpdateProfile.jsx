import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { getAuth } from "firebase/auth";
import Authentication from "../components/Authentication";
import useUpdateProfile from "../hooks/UpdateProfileLogic";

function UpdateProfile() {
  const { username, setUsername, isSubmitting, setSelectedFile, handleSubmit } =
    useUpdateProfile();
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  //Check if the user is logged in
  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home if not logged in
    }
  }, [user, navigate]);

  //Go Back if you have perfed

  return (
    <div>
      <>
        <div>
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
        </div>
      </>
    </div>
  );
}

export default UpdateProfile;
