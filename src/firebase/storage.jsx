import {
  ref,
  uploadBytes,
  getDownloadURL as getStorageDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase.config";

export const BUCKET_URL =
  "gs://learn-nyanja-46624.appspot.com/profile-pictures/";
export const profilePicsReference = ref(storage, BUCKET_URL);
export async function uploadImage(image, uid) {
  const bucket = `${BUCKET_URL}/${uid}.jpg`;
  const storageRef = ref(storage, bucket);
  await uploadBytes(storageRef, image);
  return bucket;
}

export async function getDownloadURL(bucket) {
  return await getStorageDownloadURL(ref(storage, bucket));
}
