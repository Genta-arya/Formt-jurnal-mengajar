import { axiosInstance } from "./axiosInstance";

export const createJurnal = async (data) => {
  try {
    const response = await axiosInstance.post("/journal/create", {
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
