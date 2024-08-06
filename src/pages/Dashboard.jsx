import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";
import { useAuth } from "../firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import useUpdateProfile from "../hooks/UpdateProfileLogic";
import Button from "../components/Button";

function Dashboard() {
  const { isLoading } = useAuth();
  const { username, setUsername, isSubmitting, setSelectedFile, handleSubmit } =
    useUpdateProfile();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/"); // Redirect to home if not logged in
    }
  }, [isLoading, user, navigate]);

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
    <section>
      {user.displayName != null ? (
        <>
          <p>Welcome {user.displayName}</p>
          <PageNavigation />
          <Outlet />
          <button onClick={handleSignOut}>Sign Out</button>
        </>
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
    </section>
  );
}

export default Dashboard;
