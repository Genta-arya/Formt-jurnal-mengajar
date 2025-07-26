import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/metadata");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UPLOAD_URL = "https://cloud.mystorages.my.id/uploads.php";

export const uploadGambar = async (data) => {
  try {
    const response = await axios.post(UPLOAD_URL, data, {
      headers: {
        genta: "Genta@456",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
