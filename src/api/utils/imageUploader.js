import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebaseConfig";

const imageUploader = async (image, folder) => {
  try {
    const imageRef = ref(storage, `images/${folder}/${v4()}`);
    await uploadBytes(imageRef, image);
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL; // Return the download URL after successful upload
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export default imageUploader;
