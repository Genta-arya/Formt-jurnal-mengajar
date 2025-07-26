import { axiosInstance } from "./axiosInstance";

export const createJurnal = async (data) => {
  try {
    const response = await axiosInstance.post("/jurnal/create", {
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
