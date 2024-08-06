import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase.config";

const BUCKET_URL = "gs://learn-nyanja-46624.appspot.com/profile-pictures";
export async function uploadImage(image, uid) {
  const bucket = `${BUCKET_URL}/${uid}.jpg`;
  const storageRef = ref(storage, bucket);
  await uploadBytes(storageRef, image);
  return bucket;
}
