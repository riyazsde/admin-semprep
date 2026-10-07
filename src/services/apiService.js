import api from "./api";
import { showNotification } from "./exportComponents";

export const getRequest = async ({ endpoint, params = {}, setIsLoading,hideMsg=false }) => {
  if (setIsLoading) setIsLoading(true);
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    if (error.status === 401 && !hideMsg) {
      showNotification({
        type: "error",
        message:
          error.response?.data?.message ||
          "You are not authorized to access this page",
      });
      return error;
    }
    if (error.status === 403  && !hideMsg) {
      showNotification({
        type: "error",
        message:
          error.response?.data?.message ||
          "You are not authorized to access this page",
      });
      return error;
    }
    if (error.status === 404 && !hideMsg) {
      showNotification({
        type: "error",
        message:
          error.response?.data?.message ||
          "You are not authorized to access this page",
      });
      return error;
    }
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

export const postRequest = async ({
  endpoint,
  data = {},
  params = {},
  setIsLoading,
  
}) => {
  if (setIsLoading) setIsLoading(true);
  const isFormData = data instanceof FormData;
  try {
    const response = await api.post(endpoint, data, {
      params,
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });
    showNotification({ type: "success", message: response.data.message });

    return response?.data;
  } catch (error) {
    console.error("Error during POST request:", error);

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    showNotification({ type: "error", message: errorMessage });
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

export const putRequest = async ({ endpoint, data = {}, setIsLoading }) => {
  if (setIsLoading) setIsLoading(true);

  const isFormData = data instanceof FormData;

  try {
    const response = await api.put(endpoint, data, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });
    showNotification({ type: "success", message: response.data.message });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

export const deleteRequest = async ({
  endpoint,
  params = {},
  setIsLoading,
}) => {
  if (setIsLoading) setIsLoading(true);
  try {
    const response = await api.delete(endpoint, { params });
    showNotification({ type: "success", message: response.data.message });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    showNotification({ type: "error", message: error.response.data.message });
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};


