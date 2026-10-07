
import { postRequest, putRequest } from "./apiService";
import { endpoints } from "./endPoints";

export const uploadImage = async ({ data }) => {
  if (!data) {
    console.error("No image data provided for upload.");
    return null;
  }

  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("User ID not found in localStorage.");
    return null;
  }

  const formData = new FormData();
  formData.append("image", data);

  try {
    const res = await putRequest({
      endpoint: endpoints.uploadImage(userId),
      data: formData,
    });

    if (res.data?.[0]?.img) {
      const imageUrl = res.data[0].img;
      return imageUrl;
    } else {
      console.error("Image upload failed.");
      return null;
    }
  } catch (err) {
    console.error("Error during image upload:", err);
    return null;
  }
};

export const uploadInstructionFile = async ({ data }) => {
  console.log("data", data);
  if (!data) {
    console.error("No file data provided for upload.");
    return null;
  }

  const formData = new FormData();
  formData.append("instructionFile", data);

  try {
    const res = await postRequest({
      endpoint: endpoints.uploadInstructionFile,
      data: formData,
    });

    if (res?.data) {
      const fileUrl = res.data?._id;
      return fileUrl;
    } else {
      console.error("File upload failed. No file URL found in the response.");
      return null;
    }
  } catch (err) {
    console.error("Error during instruction file upload:", err);
    return null;
  }
};

export const uploadTestSeriesFile = async ({ data }) => {
  if (!data) {
    console.error("No file data provided for upload.");
    return null;
  }

  const formData = new FormData();
  formData.append("image", data);

  try {
    const res = await putRequest({
      endpoint: endpoints.uploadTestInstructionFile,
      data: formData,
    });

    if (res?.data) {
      const fileUrl = res.data?._id; // Assuming the response contains the file's unique ID.
      return fileUrl;
    } else {
      console.error("File upload failed. No file URL found in the response.");
      return null;
    }
  } catch (err) {
    console.error("Error during test series file upload:", err);
    return null;
  }
};
