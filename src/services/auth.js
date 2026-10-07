import api from "./api";
import { showNotification } from "./exportComponents";

export const signUp = async ({ payload, setIsLoading }) => {
  try {
    if (setIsLoading) setIsLoading(true);
    const response = await api.post("/user/signup", payload);

    showNotification({
      type: "success",
      message: "User created successfully",
    });
    return response.data;
  } catch (error) {
    showNotification({
      type: "error",
      message: error.response?.data?.message || error.message,
    });
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

export const login = async ({ payload, setIsLoading, navigate }) => {
  if (setIsLoading) setIsLoading(true);
  showNotification({
    type: "info",
    message: "Loading...",
  });
  try {
    if (setIsLoading) setIsLoading(true);
    const response = await api.post("/admin/login", payload);

    showNotification({
      type: "success",
      message: "Logged in successfully",
    });
    console.log(response?.data);
    localStorage.setItem("userId", response?.data?.data?._id);
    localStorage.setItem("token", response?.data?.accessToken);
    localStorage.setItem("userData", JSON.stringify(response?.data?.data));

    const myToken = localStorage.getItem("token");
    myToken && navigate("/dashboard");
    return response.data;
  } catch (error) {
    showNotification({
      type: "error",
      message: error.response?.data?.message || error.message,
    });
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
