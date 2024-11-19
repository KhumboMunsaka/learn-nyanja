import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { uploadImage } from "../firebase/storage";
import { useAuth } from "../firebase/auth";

function useUpdateProfile() {
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");

  const navigate = useNavigate();
  const { authUser } = useAuth();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home if not logged in
    }
  }, [user, navigate]);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleUsernameChange = (name) => {
    setUsername(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the username is not empty
    if (!username.trim()) {
      console.error("Error: Username cannot be empty.");
      return; // Stop the submission process
    }

    setIsSubmitting(true);
    try {
      const imageURL = selectedFile
        ? await uploadImage(selectedFile, user.uid)
        : null;

      // Update the profile in Firebase
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: imageURL,
      });

      setIsSubmitting(false);
      navigate("/dashboard");
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error updating profile:", error);
      setSelectedFile(null);
    }
  };

  return {
    username,
    setUsername: handleUsernameChange,
    isSubmitting,
    selectedFile,
    setSelectedFile: handleFileChange,
    handleSubmit,
  };
}

export default useUpdateProfile;

//Old logic
// async function handleSubmit(e) {
//     setIsSubmitting(true);
//     e.preventDefault();
//     console.log("This code is being done");
//     try {
//       await uploadImage(selectedFile, user.uid);
//       console.log("The image has dipped");
//       setIsSubmitting(false);
//       navigate("/dashboard");
//       console.log("Going to Dashboard for the image has gone");
//     } catch (err) {
//       setIsSubmitting(false);
//       console.log(err);
//       setSelectedFile(null);
//       console.log("It has failed");
//     }
//   }
